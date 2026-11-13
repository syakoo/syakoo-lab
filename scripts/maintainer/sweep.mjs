#!/usr/bin/env node
/**
 * The 30-minute sweeper: print the open PRs that need a `decide` run.
 * A PR whose last decision is final for its current head sha (and for the
 * switch setting) is skipped, so the sweeper costs nothing on a quiet repo.
 *
 * Usage: node scripts/maintainer/sweep.mjs   (one PR number per line)
 * Env: GH_TOKEN, GITHUB_REPOSITORY, AI_MAINTAINER_MERGE
 *
 * Design: docs/specs/20261113-ai-maintainer/design.md (Security and cost)
 */

import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { pickOwnerMentionAt, pickState } from "./snapshot.mjs";

/**
 * Final: `human` on the same head sha, under the same switch setting, with no
 * owner `@claude` newer than the round. Only a push, the owner, or the switch changes it.
 * @param {{ state: any, headSha: string, ownerMentionAt: string | null, switchOn: boolean }} input
 * @returns {boolean}
 */
export function isFinal({ state, headSha, ownerMentionAt, switchOn }) {
  if (!state) return false;
  if (state.sha !== headSha) return false;
  if (state.decision !== "human") return false;
  if (state.switchOn !== switchOn) return false;
  if (ownerMentionAt !== null && ownerMentionAt > state.roundAt) return false;
  return true;
}

function gh(...args) {
  return execFileSync("gh", args, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
}

function main() {
  const repo = process.env.GITHUB_REPOSITORY;
  if (!repo) throw new Error("GITHUB_REPOSITORY is required");
  const switchOn = process.env.AI_MAINTAINER_MERGE === "on";
  const prs = JSON.parse(
    gh(
      "api",
      "--paginate",
      "--slurp",
      `repos/${repo}/pulls?state=open&per_page=100`,
    ),
  ).flat();
  for (const pr of prs) {
    if (pr.draft || pr.head.repo?.full_name !== repo) continue;
    const comments = JSON.parse(
      gh(
        "api",
        "--paginate",
        "--slurp",
        `repos/${repo}/issues/${pr.number}/comments`,
      ),
    )
      .flat()
      .map((c) => ({
        id: c.id,
        author: c.user.login,
        body: c.body ?? "",
        createdAt: c.created_at,
      }));
    const final = isFinal({
      state: pickState(comments)?.state ?? null,
      headSha: pr.head.sha,
      ownerMentionAt: pickOwnerMentionAt(comments),
      switchOn,
    });
    if (!final) console.log(pr.number);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
