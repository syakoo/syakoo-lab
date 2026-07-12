---
name: health-checkup
description: >-
  Design-health checkup for drift CI cannot catch. Always run before opening a PR
  (prefer a fresh subagent / separate context); also used by version-up for a
  release-window audit. Audits advisory deviations and runs a deepen-modules pass.
---

# Health checkup

Catches what CI cannot: design drift (deep modules, layering, abstractions) that accumulates silently.

## Review model (context for the checkup)

| Concern | Owner |
|---------|-------|
| Issue intent, acceptance criteria | Human |
| Actual runtime behavior | Human |
| Mechanical quality (structure, types, format, commits) | CI — `enforcement-inventory` rule |
| Design health | This checkup |

The audit only works if drift left a trail: every PR logs intentional advisory deviations under **Impact and risks** (`create-pull-request` skill). An undocumented deviation is the one a checkup cannot find.

## When to use

- **Before every PR** (required gate in `create-pull-request`). Scope: the branch's changes vs the PR base (usually `main`).
- **Release window** (triggered by `version-up`). Scope: everything merged since the last release.
- When the user asks for a code health check / 健康診断 / 健診.

Prefer running this skill via a **fresh subagent** (Task / clean context) so the checkup is not biased by the implementer's session history. The caller passes only: repo path, scope (PR diff or since-tag), and where to put findings.

## Procedure

1. Determine scope:
   - Pre-PR: `git diff <base>...HEAD` and changed paths.
   - Release: changes / merged PRs since the last release tag (or last version bump).
2. Read advisory deviations already logged for that scope (PR drafts, recent PR **Impact and risks**).
3. Run the `deepen-modules` skill as a structured pass over the scoped areas.
4. Re-check advisory items in `coding-guide` (Tailwind tokens, Storybook coverage, tests for behavior changes).
5. Report findings. For each **actionable** item: file a GitHub issue (`create-github-issue`) or, if tiny and in the current PR's approved scope, fix it in-branch. Give declined / intentional items a one-line rationale for **Impact and risks**.

## Output for the caller

Return a short report the PR author can paste or paraphrase:

- Actionable findings (issue links or in-branch fixes)
- Declined / intentional items (one line each)
- "No actionable findings" when clean
