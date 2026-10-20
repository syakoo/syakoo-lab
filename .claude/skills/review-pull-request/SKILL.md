---
name: review-pull-request
description: >-
  Read-only review of an open pull request: scope, FSD layout, coding conventions,
  hygiene, tests, security, and PR body. Post findings as a GitHub PR comment with a
  summary first, an aspect per finding, and a severity per finding. Use when asked to
  review a PR.
---

# Review pull request

Audit only. Do not edit code, commit, or merge.

Runs automatically when a PR is opened (`claude-review.yml`) and again on `@claude review`.

## Steps

1. Read the PR: `gh pr view <N> --json number,title,body,headRefName,baseRefName,url`
2. Read the diff: `gh pr diff <N>`
3. If the body links an issue (`Closes #XX` / `Refs #XX`), read it: `gh issue view <N>`
4. Walk **every aspect** below, one by one. Do not stop at the first finding.
5. Post one PR comment with the output format (`gh pr comment <N>`).
6. Confirm it posted: `gh pr view <N> --comments`. If a tool call was denied and the comment is missing, say so in your final output and stop. A green CI job does not mean the review was posted.

## Conventions (priority)

1. `project-structure` skill — FSD layers, slice layout, Public API via `index.ts`
2. `coding-guide` skill — **design-system first** (Row/Col/Text/Link), kebab-case, design tokens, VRT baselines on UI changes
3. Aspects below (same spirit as `self-review`)

## Aspects (cover all; none may be skipped)

| Aspect | Look for |
|--------|----------|
| **Bug** | Wrong logic, edge cases (empty / null / error paths), races, stale state, broken behavior vs. the issue |
| **Design** | Module depth (shallow wrappers, leaky APIs), naming, duplication, coupling, FSD layer / Public API (`project-structure`), design-system first (`coding-guide`) |
| **Test** | Behavior changes lack tests; weak assertions; UI changes without `__snapshots__/vrt/` updates |
| **Security** | XSS / unsafe HTML, secrets or tokens in code or logs, untrusted input, unsafe workflow triggers or permissions, new dependencies |
| **Performance** | Needless re-renders, heavy client bundles, N+1 or repeated work, large images |
| **A11y / UX** | Semantics, labels, keyboard and focus, contrast, responsive behavior |
| **Hygiene** | `console.log` / `debugger` / dead code, new `TODO` without reason, unused imports/exports, unneeded `?.` |
| **Scope / PR body** | Changes match the linked issue and **Problem** / **Solution**; no drive-by refactors; **Impact and risks** accurate |

For each aspect, either report findings or record "no findings". Judge from the diff **and** the surrounding code it touches.

## Severity

Every finding carries exactly one label.

| Label | Meaning | Blocks merge? |
|-------|---------|---------------|
| `must` | Bug, security issue, broken convention, or missing test that must be fixed | Yes |
| `should` | Strongly recommended; fix unless there is a stated reason not to | No |
| `imo` | Reviewer's opinion or taste; the author decides | No |
| `nit` | Trivial polish (typo, naming, formatting) | No |
| `question` | Intent unclear; needs an answer, not a change | No |

## Review policy

- **Comment only** — do not approve or request changes
- Each finding: severity, aspect, location, **what** (one plain sentence), **why** it matters, and a concrete fix when obvious
- Use short, plain sentences (the reader is not a native English speaker). No idioms
- Order findings by severity: `must` → `should` → `question` → `imo` → `nit`
- If there is nothing to report, say so in the Summary and still show the aspect coverage

## Output format

Post this as the PR comment. **Summary goes first.**

```markdown
## PR review

### Summary
<2–4 plain sentences: what the PR does, overall verdict, and the most important points.>

| Severity | Count |
|----------|-------|
| must | 0 |
| should | 0 |
| question | 0 |
| imo | 0 |
| nit | 0 |

Verdict: **Ready** | **Needs fixes** (any `must`)

### Findings
1. **[must · Bug]** `path/to/file.ts:42` — what is wrong.
   Why: impact. Fix: suggested change.
2. **[imo · Design]** `path/to/file.ts:10` — ...

### Aspect coverage
| Aspect | Result |
|--------|--------|
| Bug | no findings / see #1 |
| Design | ... |
| Test | ... |
| Security | ... |
| Performance | ... |
| A11y / UX | ... |
| Hygiene | ... |
| Scope / PR body | ... |
```

Write "None" under Findings when empty. Keep every aspect row, even with no findings.
