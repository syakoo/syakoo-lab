/**
 * The AI maintainer's only authority: decide what happens next to a PR.
 *
 * Pure function: no I/O, no LLM. Every merge condition lives here and nowhere
 * else (see the `single-source-of-truth` rule). Claude can only subtract from
 * what this allows; it can never widen it.
 *
 * Design: docs/specs/20261113-ai-maintainer/design.md
 */

export const OWNER = "syakoo";
export const RENOVATE_GROUP_BRANCH = "renovate/minor-and-patch-updates";
export const MAX_FIX_ATTEMPTS = 2;
export const MAX_REVIEW_RUNS_PER_DISPATCH = 2;
export const MAX_REVIEWS_PER_ROUND = 3;
export const REVIEW_MISSING_MINUTES = 15;
export const REVIEW_CHECK_PREFIX = "Claude Review";

const PROTECTED_DIRS = [".github/", ".claude/", ".githooks/"];
const FAILED_CONCLUSIONS = new Set([
  "failure",
  "cancelled",
  "timed_out",
  "startup_failure",
  "action_required",
]);

/**
 * @typedef {{ name: string, status: string, conclusion: string | null }} Check
 * @typedef {{ must: number, should: number }} ReviewCounts
 * @typedef {{ review: number, ci: number, update: number, reviewRun: number }} Attempts
 *
 * @typedef {object} Snapshot
 * @property {"open" | "merged" | "closed"} prState
 * @property {string} author login, with or without the `[bot]` suffix
 * @property {boolean} isFork
 * @property {boolean} draft
 * @property {string} branch
 * @property {string[]} labels
 * @property {string[]} files every changed path
 * @property {string} mergeState GraphQL `mergeStateStatus`
 * @property {Check[]} checks check runs for the head sha
 * @property {ReviewCounts | null} review review of the head sha, from a trusted author
 * @property {{ verdict: "ok" | "human" } | null} triage triage verdict for the head sha
 * @property {Attempts} attempts per PR; reset only by an owner `@claude` comment
 * @property {number | null} minutesSinceReviewDispatch null if never dispatched this round
 * @property {number} reviewCount reviews created in the current round
 * @property {boolean} switchOn `vars.AI_MAINTAINER_MERGE == 'on'`
 *
 * @typedef {object} Decision
 * @property {"ignore" | "wait" | "review" | "triage" | "merge" | "human"} kind
 * @property {string} reason
 * @property {"review" | "ci" | "update"} [triageKind]
 * @property {boolean} [label] false: write the status comment only, no `needs-human` label
 */

/** @returns {string} */
function normalizeLogin(login) {
  return String(login).replace(/\[bot\]$/, "");
}

/** @returns {boolean} */
export function isProtectedPath(path) {
  return (
    PROTECTED_DIRS.some((dir) => path.startsWith(dir)) ||
    path === "CLAUDE.md" ||
    path.endsWith("/CLAUDE.md")
  );
}

/** @returns {Decision} */
function human(reason, label = true) {
  return { kind: "human", reason, label };
}

/**
 * @param {Snapshot} s
 * @returns {Decision}
 */
export function decide(s) {
  // 1. Not ours to touch.
  if (s.prState !== "open")
    return { kind: "ignore", reason: `PR is ${s.prState}` };
  if (s.draft) return { kind: "ignore", reason: "draft" };
  if (s.isFork) return { kind: "ignore", reason: "fork" };

  // 2. Hard conditions. Impact is not here: it only limits merging (rule 8).
  const author = normalizeLogin(s.author);
  const isOwner = author === OWNER;
  const isRenovate = author === "renovate";
  if (!isOwner && !isRenovate)
    return human(`author ${s.author} is not the owner or Renovate`);
  const protectedFile = s.files.find(isProtectedPath);
  if (protectedFile)
    return human(`changes a protected path (${protectedFile})`);

  const failed = s.checks.filter(
    (c) =>
      c.status === "completed" && FAILED_CONCLUSIONS.has(c.conclusion ?? ""),
  );
  const pending = s.checks.some((c) => c.status !== "completed");

  // 3. Failed checks.
  const reviewFailed = failed.some((c) =>
    c.name.startsWith(REVIEW_CHECK_PREFIX),
  );
  if (reviewFailed) return human("review run failed");
  const ciRed = failed.length > 0;

  // 6 (checked early so a "human" verdict is not retried). Triage asked for a human.
  if (s.triage?.verdict === "human")
    return human("triage needs a human decision");

  // 5 for red CI: open work, not waiting for other checks.
  if (ciRed)
    return triageOrHuman(
      s,
      "ci",
      `CI failed (${failed.map((c) => c.name).join(", ")})`,
    );

  // 4. Pending checks, then a missing review.
  if (pending) return { kind: "wait", reason: "checks are running" };
  if (!s.review) {
    if (
      s.minutesSinceReviewDispatch !== null &&
      s.minutesSinceReviewDispatch < REVIEW_MISSING_MINUTES
    ) {
      return { kind: "wait", reason: "review was requested" };
    }
    const canDispatch =
      s.switchOn &&
      s.attempts.reviewRun < MAX_REVIEW_RUNS_PER_DISPATCH &&
      s.reviewCount < MAX_REVIEWS_PER_ROUND;
    if (canDispatch)
      return { kind: "review", reason: "no review for this commit" };
    if (!s.switchOn) return human("no review, and the switch is off", false);
    return human("review missing");
  }

  // 5. Open review findings.
  const shouldOpen = s.review.should > 0 && s.triage?.verdict !== "ok";
  if (s.review.must > 0 || shouldOpen) {
    return triageOrHuman(
      s,
      "review",
      `review has ${s.review.must} must, ${s.review.should} should`,
    );
  }

  // 7. Branch state.
  if (s.mergeState === "DIRTY" || s.mergeState === "BEHIND") {
    if (s.switchOn && s.attempts.update < 1) {
      return {
        kind: "triage",
        triageKind: "update",
        reason: `branch is ${s.mergeState}`,
      };
    }
    return human(
      s.switchOn
        ? `branch is ${s.mergeState} and was already updated`
        : `branch is ${s.mergeState}, and the switch is off`,
      s.switchOn,
    );
  }
  if (s.mergeState !== "CLEAN")
    return { kind: "wait", reason: `merge state is ${s.mergeState}` };

  // 8. Impact.
  if (isRenovate) {
    if (s.branch !== RENOVATE_GROUP_BRANCH)
      return human("major update: summary only");
  } else {
    const semver = s.labels.filter((l) => l.startsWith("semver:"));
    if (semver.length !== 1 || semver[0] !== "semver:patch")
      return human("semver:minor needs the owner");
  }
  if (!s.switchOn) return human("would merge, but the switch is off", false);
  return { kind: "merge", reason: "all conditions hold" };
}

/**
 * @param {Snapshot} s
 * @param {"review" | "ci"} kind
 * @param {string} why
 * @returns {Decision}
 */
function triageOrHuman(s, kind, why) {
  if (!s.switchOn) return human(`${why}; the switch is off`, false);
  if (s.attempts[kind] >= MAX_FIX_ATTEMPTS) {
    return human(
      `${why}; fix attempts used (${s.attempts[kind]}/${MAX_FIX_ATTEMPTS})`,
    );
  }
  return { kind: "triage", triageKind: kind, reason: why };
}
