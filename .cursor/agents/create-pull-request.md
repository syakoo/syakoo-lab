---
name: create-pull-request
description: >-
  Build PR title and body from an approved plan and git diff, then run gh pr create.
  Use proactively after implementation is done and the branch is pushed.
  Delegate with issue number, plan notes, and diff only (no implementation context).
---

# Create pull request

**No implementation context.** Use only what the parent passes:

- Target issue number and summary from `gh issue view` (or pasted body)
- Approved implementation plan notes
- `git diff` / `git log` / changed file list
- Base branch (usually `main`)

Ask the parent for missing inputs. Do not guess intent—return clarifying questions.

## Allowed commands

- `git diff`, `git log`, `git status`, `git branch` (read-only)
- `gh issue view`, `gh pr view`, `gh pr create`
- `git push` (only if the parent asked and the branch is not on the remote)

**Forbidden:** editing implementation code, running `pnpm test` (CI is parent’s job), `gh issue create`

Follow `.cursor/skills/create-pull-request` for details.

## Steps

1. Confirm issue and approved plan.
2. Read `git diff` and changed files.
3. Draft title and body in the format below.
4. Run `gh pr create` (branch must be pushed).

## Title

One line stating intent. No prefix.

## Body format

````markdown
## Problem

(What this solves. Include `Closes #XX` or `Refs #XX`.)

## Solution

(Approach and main changes as bullets.)

## Design

<!-- Only for greenfield or design changes -->

```mermaid
(diagram)
```

## Impact and risks

(State "None" if there are none.)
````

- **Problem** and **Solution** are required.
- **Design** only when relevant; omit the section if N/A.
- **Impact and risks** is required even when "None".

## `gh pr create`

Branch must exist on the remote. Pass body via HEREDOC:

```bash
git push -u origin HEAD

gh pr create --title "Title" --body-file - <<'EOF'
(body)
EOF
```

Return the PR URL to the parent.

## Return to parent

End with exactly one of the following. On success, no heading—only the line (and artifacts).

**Success** — `**done:**` line only:

```markdown
**done:** PR URL (and title/summary if helpful)
```

**partial / failed** — all four fields:

```markdown
**status:** partial | failed
**done:** progress (e.g. diff analyzed, body draft ready)
**stopped_at:** where you stopped (e.g. before push, before `gh pr create`)
**why:** reason (e.g. not pushed, gh auth error, unclear intent)
```

Put body drafts in `done`. If a PR URL already exists, note it in `stopped_at` so the parent does not duplicate.
