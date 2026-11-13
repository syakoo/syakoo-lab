#!/usr/bin/env node
/**
 * CLI for the maintainer workflow: snapshot -> decide -> act.
 * The only file that writes (labels, comments, merge). It has no push path.
 *
 * Usage: node scripts/maintainer/run.mjs <pr> [--dry-run]
 * Env: GH_TOKEN, GITHUB_REPOSITORY, AI_MAINTAINER_MERGE,
 *      MERGED_FILE (optional: the PR number is appended after a merge, for the release job)
 *      TRIAGE_FILE (optional: `{pr, kind, sha, branch}` JSON is written when decide returns `triage`)
 */

import { execFileSync } from "node:child_process";
import { appendFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { decide } from "./decide.mjs";
import { buildSnapshot, pickState } from "./snapshot.mjs";

const NEEDS_HUMAN = "needs-human";

/** @returns {string} */
function gh(...args) {
  return execFileSync("gh", args, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
}

/** @returns {any} */
function api(path, ...extra) {
  return JSON.parse(gh("api", "--paginate", "--slurp", path, ...extra)).flat();
}

const MERGE_STATE_QUERY = `query($owner:String!,$name:String!,$n:Int!){repository(owner:$owner,name:$name){pullRequest(number:$n){mergeStateStatus}}}`;

function fetchRaw(repo, n) {
  const [owner, name] = repo.split("/");
  const pr = JSON.parse(gh("api", `repos/${repo}/pulls/${n}`));
  const mergeState = JSON.parse(
    gh(
      "api",
      "graphql",
      "-f",
      `query=${MERGE_STATE_QUERY}`,
      "-F",
      `owner=${owner}`,
      "-F",
      `name=${name}`,
      "-F",
      `n=${n}`,
    ),
  ).data.repository.pullRequest.mergeStateStatus;
  const comments = api(`repos/${repo}/issues/${n}/comments`).map((c) => ({
    id: c.id,
    author: c.user.login,
    body: c.body ?? "",
    createdAt: c.created_at,
  }));
  const files = api(`repos/${repo}/pulls/${n}/files`).map((f) => f.filename);
  const runs = JSON.parse(
    gh(
      "api",
      "--paginate",
      "--slurp",
      `repos/${repo}/commits/${pr.head.sha}/check-runs?per_page=100`,
    ),
  ).flatMap((page) => page.check_runs);
  return {
    pr: {
      state: pr.state,
      merged: pr.merged,
      draft: pr.draft,
      author: pr.user.login,
      branch: pr.head.ref,
      headSha: pr.head.sha,
      isFork: pr.head.repo?.full_name !== repo,
      base: pr.base.ref,
      labels: pr.labels.map((l) => l.name),
      mergeState,
    },
    comments,
    files,
    checks: runs.map((r) => ({
      name: r.name,
      status: r.status,
      conclusion: r.conclusion,
    })),
  };
}

function statusBody(decision, state) {
  return [
    `<!-- ai-maintainer:state ${JSON.stringify(state).replaceAll("<", "\\u003c").replaceAll(">", "\\u003e")} -->`,
    `**AI maintainer:** ${decision.kind}`,
    "",
    // Check names are chosen by the PR author: no mentions, no comment breaks.
    `Reason: ${decision.reason.replaceAll("@", "@\u200b")}`,
    `Head: \`${state.sha.slice(0, 7)}\``,
    `Attempts: ${JSON.stringify(state.attempts)}`,
  ].join("\n");
}

function main() {
  const [prArg, ...flags] = process.argv.slice(2);
  const n = Number(prArg);
  if (!Number.isInteger(n) || n <= 0)
    throw new Error("usage: run.mjs <pr number> [--dry-run]");
  const dryRun = flags.includes("--dry-run");
  const repo = process.env.GITHUB_REPOSITORY;
  if (!repo) throw new Error("GITHUB_REPOSITORY is required");
  const now = new Date().toISOString();

  const raw = fetchRaw(repo, n);
  const { snapshot, round } = buildSnapshot({
    ...raw,
    switchOn: process.env.AI_MAINTAINER_MERGE === "on",
    now,
  });
  const decision = decide(snapshot);
  const prior = pickState(raw.comments);
  const state = {
    sha: raw.pr.headSha,
    decision: decision.kind,
    reason: decision.reason,
    switchOn: snapshot.switchOn,
    roundAt: round.roundAt,
    attempts: round.attempts,
    reviewDispatchedAt: round.reviewDispatchedAt,
  };
  if (decision.kind === "review") {
    state.attempts = {
      ...state.attempts,
      reviewRun: state.attempts.reviewRun + 1,
    };
    state.reviewDispatchedAt = now;
  }

  if (decision.kind === "triage") {
    // Count the attempt before the run starts, so a crashed triage still counts.
    const kind = decision.triageKind;
    state.attempts = { ...state.attempts, [kind]: state.attempts[kind] + 1 };
  }

  console.log(JSON.stringify({ pr: n, decision, state }, null, 2));
  if (decision.kind === "ignore" || dryRun) return;

  for (const action of plan({ n, repo, decision, raw, prior, state })) {
    execute(action);
  }
}

/**
 * Turn a decision into the list of writes to perform. Pure: `execute` does the I/O.
 * @returns {Action[]}
 */
export function plan({ n, repo, decision, raw, prior, state }) {
  /** @type {Action[]} */
  const actions = [];
  // A new head clears a previous "needs-human".
  const hasLabel = raw.pr.labels.includes(NEEDS_HUMAN);
  const newHead = prior?.state.sha !== raw.pr.headSha;
  if (hasLabel && (newHead || decision.kind !== "human")) {
    actions.push({ type: "removeLabel", n, repo });
  }
  if (
    decision.kind === "human" &&
    decision.label !== false &&
    !(hasLabel && !newHead)
  ) {
    actions.push({ type: "addLabel", n, repo });
  }

  // Edit the status comment only when something changed, so it does not notify again.
  const changed =
    !prior ||
    prior.state.decision !== state.decision ||
    prior.state.reason !== state.reason ||
    prior.state.sha !== state.sha ||
    prior.state.switchOn !== state.switchOn ||
    JSON.stringify(prior.state.attempts) !== JSON.stringify(state.attempts);
  if (changed && decision.kind !== "wait") {
    const body = statusBody(decision, state);
    actions.push(
      prior
        ? { type: "patchComment", repo, id: prior.comment.id, body }
        : { type: "postComment", repo, n, body },
    );
  }

  if (decision.kind === "triage") {
    actions.push({
      type: "writeTriage",
      payload: {
        pr: n,
        kind: decision.triageKind,
        sha: raw.pr.headSha,
        branch: raw.pr.branch,
      },
    });
  }
  if (decision.kind === "review") {
    actions.push({ type: "dispatchReview", n });
  } else if (decision.kind === "merge") {
    actions.push({ type: "merge", n, repo, sha: raw.pr.headSha });
  }
  return actions;
}

/**
 * @typedef {{ type: "removeLabel" | "addLabel", n: number, repo: string }
 *   | { type: "patchComment", repo: string, id: number, body: string }
 *   | { type: "postComment", repo: string, n: number, body: string }
 *   | { type: "writeTriage", payload: object }
 *   | { type: "dispatchReview", n: number }
 *   | { type: "merge", n: number, repo: string, sha: string }} Action
 */

/** @param {Action} a */
function execute(a) {
  switch (a.type) {
    case "removeLabel":
      gh(
        "api",
        "-X",
        "DELETE",
        `repos/${a.repo}/issues/${a.n}/labels/${NEEDS_HUMAN}`,
      );
      break;
    case "addLabel":
      gh(
        "api",
        "-X",
        "POST",
        `repos/${a.repo}/issues/${a.n}/labels`,
        "-f",
        `labels[]=${NEEDS_HUMAN}`,
      );
      break;
    case "patchComment":
      gh(
        "api",
        "-X",
        "PATCH",
        `repos/${a.repo}/issues/comments/${a.id}`,
        "-f",
        `body=${a.body}`,
      );
      break;
    case "postComment":
      gh(
        "api",
        "-X",
        "POST",
        `repos/${a.repo}/issues/${a.n}/comments`,
        "-f",
        `body=${a.body}`,
      );
      break;
    case "writeTriage":
      if (process.env.TRIAGE_FILE)
        writeFileSync(process.env.TRIAGE_FILE, JSON.stringify(a.payload));
      break;
    case "dispatchReview":
      gh("workflow", "run", "claude-review.yml", "-f", `pr=${a.n}`);
      break;
    case "merge":
      gh(
        "pr",
        "merge",
        String(a.n),
        "-R",
        a.repo,
        "--merge",
        "--match-head-commit",
        a.sha,
      );
      if (process.env.MERGED_FILE)
        appendFileSync(process.env.MERGED_FILE, `${a.n}\n`);
      break;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
