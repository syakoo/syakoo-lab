---
name: review-pull-request
description: >-
  Read-only review of an open pull request: scope, FSD layout, coding conventions,
  hygiene, tests, and PR body. Post findings as a GitHub PR comment. Use when a PR
  is opened or when asked to review a PR.
---

# Review pull request

Audit only. Do not edit code, commit, or merge.

Triggered automatically when a PR is opened (Cursor Automation) or on request.

## Steps

1. Read the PR: `gh pr view <N> --json number,title,body,headRefName,baseRefName,url`
2. Read the diff: `gh pr diff <N>`
3. If the body links an issue (`Closes #XX` / `Refs #XX`), read it: `gh issue view <N>`
4. Review against the checklist below.
5. Post one PR comment with the output format (use **Comment on pull request** in Automations, or `gh pr comment <N>`).

## Conventions (priority)

1. `project-structure` skill — FSD layers, slice layout, Public API via `index.ts`
2. `coding-guide` skill — kebab-case, design tokens, design-system usage
3. Checks below (same spirit as `self-review`)

## Checklist

### Scope

- Changes match the linked issue and PR **Problem** / **Solution**
- No unrelated refactors or drive-by changes

### Architecture

- Correct FSD layer; dependencies flow downward only
- Slice Public API via `index.ts`; no deep imports past the barrel

### Code hygiene

- Debug leftovers (`console.log`, `debugger`, dead commented code)
- New `TODO` / `FIXME` without justification
- Unnecessary `?.`, unused imports/exports, `import type` where appropriate

### Tests

- Behavior changes have added or updated tests

### PR body

- **Problem**, **Solution**, and **Impact and risks** are present and accurate

## Review policy

- **Comment only** — do not approve or request changes
- Flag blockers under **Must fix**; optional items under **Suggestions**
- If nothing to say, post a short “no blocking issues” comment

## Output format

Post this as the PR comment:

```markdown
## PR review

### Must fix
- [file:line] issue — why it matters

### Suggestions
- [file:line] optional improvement

### Scope / PR body
- gaps or mismatches with the linked issue

### Clean
- No blocking issues found
```

Write "None" for empty sections.
