---
name: handle-renovate-prs
description: >-
  Work through the open Renovate dependency PRs in one batch: classify each, check CI,
  investigate and fix red ones, summarize majors, and report what is ready for the owner to
  merge. Use when the owner asks to handle, clear, or triage the accumulated Renovate PRs.
  Never merges.
---

# Handle Renovate PRs

Batch triage for dependency PRs. The owner runs this on request (about weekly) instead of letting
the maintainer gate spend AI usage on each Renovate push. **Do not merge. Do not label.** The owner
decides; report what is ready.

## Steps

1. **List** open PRs: `gh pr list --author "app/renovate" --json number,title,headRefName,mergeStateStatus,statusCheckRollup`.
   Stop with "nothing to do" if there are none.
2. **Classify** by head branch:

   | Branch | Kind | Handling |
   |--------|------|----------|
   | `renovate/minor-and-patch-updates` | Group (minor, patch) | Step 3 |
   | any other `renovate/*` | Individual update, treat as major | Step 4 |

3. **Group PR**: read `gh pr checks <N>` and the diff (`gh pr diff <N>`; lockfile noise can be skipped).
   - Green: report as ready, with the notable bumps (anything touching build, test, or lint tooling).
   - Red: find the cause from the failing log (`gh run view <run> --log-failed`). Fix it only when the fix is small
     and clearly caused by the update. Check out the branch, change the minimum, run `pnpm lint`,
     `pnpm type-check`, `pnpm test`, then push (no force-push). Otherwise report the cause and stop.
4. **Major PRs**: for each, summarize from the release notes in the PR body: breaking changes, what
   this repo uses of the package, and a verdict (**safe** / **needs work** / **skip for now**) with one
   line of why. Fix a red one only when the migration is small; otherwise leave it and say what it needs.
   Do not stack several majors in one branch.
5. **Conflicts**: a `DIRTY` or `BEHIND` branch is Renovate's to rebase. Report it; do not merge main in.
6. **Protected paths**: a PR touching `.github/`, `.claude/`, `.githooks/` or `CLAUDE.md` (e.g. an Actions update) is
   always the owner's. Say so.

## Constraints

- Install only through the project's pnpm setup (the build-script allowlist and `minimum-release-age` apply). Do not
  loosen either to make a PR pass.
- No drive-by changes: a fix touches only what the update broke.
- A fix pushed to a Renovate branch can be lost: Renovate may overwrite it when it rebases. Push, then re-check the
  branch before reporting the PR as ready, and tell the owner the fix lives on a Renovate-owned branch.
- Check the `semver:*` label is present before calling a PR ready (CI requires exactly one; Renovate defaults to patch).
  If it is missing or doubled, report the PR as not ready and name the label problem; do not add or remove labels.
- Run only when the owner asks, in their own session. Never from the maintainer gate or other automation.

## Output

```markdown
## Renovate PRs

| PR | Update | CI | Verdict |
|----|--------|----|---------|
| #383 | minor and patch group | green | ready |
| #399 | vite 8 | red | needs work: <why> |

### Ready to merge
- #383 — <notable bumps>

### Needs the owner
- #399 — <what changed, what is left>

### Pushed
- `<sha>` on #<N> — <fix>
```
