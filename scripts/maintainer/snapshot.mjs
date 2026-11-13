/**
 * Turn raw PR data into the `snapshot` that `decide()` reads.
 *
 * Everything here is pure (parsing and picking); `run.mjs` does the `gh` calls.
 * Only comments from trusted authors count: a marker written by anyone else is
 * data, not a signal. A marker also counts only as the first line of a comment.
 *
 * Design: docs/specs/20261113-ai-maintainer/design.md
 */

import { OWNER } from "./decide.mjs";

export const TRUSTED_AUTHORS = [OWNER, "claude[bot]", "github-actions[bot]"];

/**
 * @typedef {{ author: string, body: string, createdAt: string }} Comment
 */

const ZERO_ATTEMPTS = { review: 0, ci: 0, update: 0, reviewRun: 0 };

/** @returns {boolean} */
export function isTrusted(author) {
  return TRUSTED_AUTHORS.includes(author);
}

/**
 * Parse `<!-- name key=value ... -->` from the first line only.
 * @param {string} body
 * @param {string} name
 * @returns {Record<string, string> | null}
 */
export function parseMarker(body, name) {
  const firstLine = String(body).split("\n", 1)[0].trim();
  const m = firstLine.match(/^<!--\s*([\w:-]+)((?:\s+[\w-]+=\S+)*)\s*-->$/);
  if (!m || m[1] !== name) return null;
  /** @type {Record<string, string>} */
  const attrs = {};
  for (const pair of m[2].trim().split(/\s+/).filter(Boolean)) {
    const i = pair.indexOf("=");
    attrs[pair.slice(0, i)] = pair.slice(i + 1);
  }
  return attrs;
}

/** @param {Comment[]} comments */
function newestFirst(comments) {
  return [...comments].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/**
 * @param {string} body
 * @param {"must" | "should"} severity
 * @returns {number}
 */
function countRow(body, severity) {
  const m = body.match(
    new RegExp(`^\\|\\s*${severity}\\s*\\|\\s*(\\d+)\\s*\\|`, "m"),
  );
  return m ? Number(m[1]) : 0;
}

/**
 * Newest trusted review comment for `sha`; null if none.
 * @param {Comment[]} comments
 * @param {string} sha
 */
export function pickReview(comments, sha) {
  const c = newestFirst(comments).find(
    (x) => isTrusted(x.author) && parseMarker(x.body, "review-pr")?.sha === sha,
  );
  return c
    ? { must: countRow(c.body, "must"), should: countRow(c.body, "should") }
    : null;
}

/**
 * Newest trusted triage verdict for `sha`; null if none.
 * @param {Comment[]} comments
 * @param {string} sha
 * @returns {{ verdict: "ok" | "human" } | null}
 */
export function pickTriage(comments, sha) {
  for (const c of newestFirst(comments)) {
    if (!isTrusted(c.author)) continue;
    const m = parseMarker(c.body, "ai-maintainer:triage");
    if (m?.sha === sha && (m.verdict === "ok" || m.verdict === "human")) {
      return { verdict: m.verdict };
    }
  }
  return null;
}

/**
 * The status comment's hidden state: `<!-- ai-maintainer:state {json} -->`.
 * @param {Comment[]} comments
 * @returns {{ comment: Comment, state: any } | null}
 */
export function pickState(comments) {
  for (const c of newestFirst(comments)) {
    if (c.author !== "github-actions[bot]") continue;
    const m = String(c.body)
      .split("\n", 1)[0]
      .match(/^<!-- ai-maintainer:state (\{.*\}) -->$/);
    if (!m) continue;
    try {
      return { comment: c, state: JSON.parse(m[1]) };
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Time of the newest owner comment that mentions `@claude`.
 * @param {Comment[]} comments
 * @returns {string | null}
 */
export function pickOwnerMentionAt(comments) {
  const c = newestFirst(comments).find(
    (x) => x.author === OWNER && x.body.includes("@claude"),
  );
  return c ? c.createdAt : null;
}

/**
 * Reviews of the current round: markers newer than the owner's last `@claude`.
 * @param {Comment[]} comments
 * @param {string | null} ownerMentionAt
 */
export function countRoundReviews(comments, ownerMentionAt) {
  return comments.filter(
    (c) =>
      isTrusted(c.author) &&
      parseMarker(c.body, "review-pr") !== null &&
      (ownerMentionAt === null || c.createdAt > ownerMentionAt),
  ).length;
}

/**
 * Attempts belong to the PR. Only a new round (an owner `@claude` comment newer
 * than the state's `roundAt`) resets them.
 * @param {any} state
 * @param {string | null} ownerMentionAt
 */
export function resolveRound(state, ownerMentionAt, now) {
  const newRound =
    !state || (ownerMentionAt !== null && ownerMentionAt > state.roundAt);
  if (newRound) {
    return {
      attempts: { ...ZERO_ATTEMPTS },
      roundAt: now,
      reviewDispatchedAt: null,
    };
  }
  return {
    attempts: { ...ZERO_ATTEMPTS, ...state.attempts },
    roundAt: state.roundAt,
    reviewDispatchedAt: state.reviewDispatchedAt ?? null,
  };
}

/** `renovate[bot]` (REST) and `renovate` (GraphQL) are the same author. */
export function normalizeAuthor(login) {
  return login === "renovate" ? "renovate[bot]" : login;
}

/**
 * @param {object} raw
 * @param {{ state: string, merged: boolean, draft: boolean, author: string, branch: string, headSha: string, isFork: boolean, labels: string[], mergeState: string }} raw.pr
 * @param {Comment[]} raw.comments
 * @param {{ name: string, status: string, conclusion: string | null }[]} raw.checks
 * @param {string[]} raw.files
 * @param {boolean} raw.switchOn
 * @param {string} raw.now ISO time
 * @returns {{ snapshot: import("./decide.mjs").Snapshot, round: ReturnType<typeof resolveRound> }}
 */
export function buildSnapshot({ pr, comments, checks, files, switchOn, now }) {
  const ownerMentionAt = pickOwnerMentionAt(comments);
  const round = resolveRound(
    pickState(comments)?.state ?? null,
    ownerMentionAt,
    now,
  );
  const minutesSinceReviewDispatch = round.reviewDispatchedAt
    ? (Date.parse(now) - Date.parse(round.reviewDispatchedAt)) / 60000
    : null;
  return {
    round,
    snapshot: {
      prState: pr.merged ? "merged" : pr.state === "open" ? "open" : "closed",
      author: normalizeAuthor(pr.author),
      isFork: pr.isFork,
      draft: pr.draft,
      branch: pr.branch,
      labels: pr.labels,
      files,
      mergeState: pr.mergeState,
      checks,
      review: pickReview(comments, pr.headSha),
      triage: pickTriage(comments, pr.headSha),
      attempts: round.attempts,
      minutesSinceReviewDispatch,
      reviewCount: countRoundReviews(comments, ownerMentionAt),
      switchOn,
    },
  };
}
