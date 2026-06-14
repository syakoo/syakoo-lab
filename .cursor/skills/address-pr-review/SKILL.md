---
name: address-pr-review
description: >-
  Triage GitHub PR review feedback (top-level, inline, threads); implement agreed items;
  escalate disagreements or questions. Includes lint/test checks, per-thread replies with
  commit SHA, and a chat summary. Use when fixing review feedback on an open PR—not for
  greenfield implementation only.
---

# Address PR review

Start from review state (Approve / Request changes / Comment) and **every thread**. Implement what you agree with; do not guess on ambiguous items. **No drive-by refactors** outside the feedback.

`babysit` may cover merge readiness broadly (CI, conflicts, long polling). This skill is **one review iteration**: replies and necessary code changes.

## When to use

- Reviewer requested changes or left comments you must address
- You need to clear inline threads without missing any

Do **not** use when:

- No PR or no review yet (normal implementation)
- `gh` is unavailable and the user will not paste URL + feedback
- PR is in another repo—confirm branch and remote with the user

## Prerequisites

- Shell is at the **repo root** (or `gh` resolves the repo correctly)
- `gh auth status` succeeds

## Steps

1. **Identify the PR** by number or URL: `gh pr view <N> --json number,title,headRefName,url,state`.
2. **Match local branch** to PR head; use `gh pr checkout <N>` if needed (per user policy).
3. **Collect all comments:**
   - Top-level / review bodies: `gh pr view <N> --comments`
   - Inline: `gh api repos/{owner}/{repo}/pulls/<N>/comments`
   - Review threads: `gh api repos/{owner}/{repo}/pulls/<N>/reviews` and related comment APIs; use the web UI if needed
   - Treat **bot reviews** like human feedback (fix or document why not)
   - Skip threads already addressed in a prior commit or reply unless new feedback was added
4. **Decide whether this run should act** (run-level gate, before any edits):

   | Situation | Action |
   |-----------|--------|
   | One or more open threads need **Fix** | Proceed to step 5 |
   | Only **Reply only** threads remain | Reply on GitHub; no commit unless a reply is missing |
   | All feedback already addressed / resolved | Post one PR comment that nothing further is needed; **stop** |
   | Trigger comment only, no open feedback | Post one PR comment that no open feedback was found; **stop** |
   | Mixed or unclear whether changes are required | **Needs input** — ask on the PR or stop; do not guess |

   Do **not** push an empty or no-op commit.

5. **Classify each open thread:**

   | Class | Action |
   |-------|--------|
   | Fix | Change code or docs |
   | Reply only | Explain; no commit if no change needed |
   | Defer | Out of scope—link Issue/PR and one line why |
   | Needs input | Do not guess—ask the user |

6. **Implement** with minimal diff per item. No unrelated formatting or renames.
7. **Post-change checks**
   - `git diff` / `git status` for stray files and debug leftovers (same spirit as `self-review`)
   - Run repo scripts (`pnpm lint`, `pnpm typecheck`, `pnpm test`, etc.) unless the user defers heavy/env-dependent runs
8. **Commit and `git push`**. No force-push by default. Skip this step when step 4 says stop with no code changes.
9. **Record SHAs:** `git rev-parse HEAD` (full and short). If multiple commits, map feedback → SHA.
10. **Reply on GitHub** for each thread with what changed and the **commit SHA** (same SHA on multiple threads is fine). Reply-only threads need no SHA.
   - Inline reply example: `POST .../pulls/comments/{comment_id}/replies` via `gh api`
   - PR comment: `gh pr comment <N> --body "..."`
11. **`gh pr checks <N>`** or Checks tab; summarize failures in replies if relevant.
12. Post the **chat summary** below (may mirror GitHub replies).

## GitHub reply template

One reply per feedback item. Always include **commit SHA** when code changed.

```markdown
Addressed in commit `abc1234`.

- Change: <file and one-line summary>
```

Multiple commits:

```markdown
`<sha1>` for <item A>; `<sha2>` for <item B>.
```

For reply-only or blocked items, explain without a SHA.

## Chat summary

```markdown
## PR review response summary

- **PR:** #<number> <short title>
- **Branch:** `<headRefName>`
- **Reply commit(s):** `<full-sha>`

### Addressed

- `<file>` — <what you did> — **SHA:** `<sha>`

### Reply only / no code

- <thread summary> — replied on GitHub / draft only

### Deferred

- <item> — <Issue/PR link>

### Checks run

- e.g. `pnpm lint`, `pnpm typecheck`, `pnpm test` / skipped and why

### CI

- Green / failed — job and summary / not checked

### No action needed

- <why nothing to do — e.g. all threads resolved, no open feedback>

### Next steps

- Re-request review, open threads, resolve, merge
```

## Notes

- Resolve **merge conflicts** only when intent is clear and tests are feasible; otherwise stop and ask.
- **Resolve thread** may be user-only depending on permissions.
- Do not leak secrets in comments or commits.
- Prioritize **lint passing** and **staying within feedback scope** (same as `self-review`).
