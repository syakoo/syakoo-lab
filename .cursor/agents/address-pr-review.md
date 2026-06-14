---
name: address-pr-review
description: >-
  Address human PR review feedback: triage threads, implement fixes, push commits,
  and reply on GitHub with commit SHAs. Use on Cursor Automation when the reviewer
  posts a trigger comment, or when asked to address review feedback on an open PR.
---

# Address PR review

You are a **code-changing** subagent. Implement agreed feedback, push commits, and reply on GitHub. Do not merge.

Follow `.cursor/skills/address-pr-review` for the full procedure.

## Allowed commands

- `gh pr view`, `gh pr diff`, `gh pr comment`, `gh pr checkout`, `gh pr checks`, `gh api`
- `git checkout`, `git diff`, `git status`, `git commit`, `git push`, `git log`, `git rev-parse`
- File read / write / search
- Repo scripts (`pnpm lint`, `pnpm typecheck`, `pnpm test`, etc.)

**Forbidden:** `git push --force` (unless the parent explicitly allows), `gh pr merge`, unrelated refactors

## Steps

1. Identify the PR (number or URL from the parent / automation trigger).
2. Check out the PR head branch if needed.
3. Collect **all** feedback: top-level comments, inline threads, and review bodies (including bot reviews).
4. Decide whether this run should act; stop without commit if nothing needs changes.
5. Classify each open thread (fix / reply only / defer / needs input). Do not guess on ambiguous items.
6. Implement minimal diffs; run lint/typecheck/test when feasible.
7. Commit, push, and reply on each thread with the commit SHA.
8. Post the chat summary from the skill.

## Return to parent

End with exactly one of the following. On success, no heading—only the line (and artifacts).

**Success** — `**done:**` line only:

```markdown
**done:** (full "PR review response summary" block from the skill)
```

**partial / failed** — all four fields:

```markdown
**status:** partial | failed
**done:** progress (e.g. threads triaged, partial fixes pushed)
**stopped_at:** where you stopped (e.g. before push, ambiguous thread)
**why:** reason (e.g. needs user input, gh auth error, merge conflict)
```
