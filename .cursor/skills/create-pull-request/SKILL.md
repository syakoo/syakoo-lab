---
name: create-pull-request
description: >-
  Create a PR aligned with the AI-led workflow: summary, design (when relevant),
  impact and risks. Use when creating a pull request, opening a PR, pushing for review,
  or completing implementation of an issue.
---

# Create pull request

## Workflow

1. Confirm the target issue and approved implementation plan.
2. Ensure **Must fix** from **`self-review`** is `None`. Needs confirmation need not be empty: fix what you judge necessary, or list “not necessary” reasons under **Impact and risks**. If Must fix remains, return to the implement ↔ self-review loop.
3. Read `git diff` and changed files.
4. Draft title and body in the format below.
5. Run `gh pr create` with **exactly one** semver label: `semver:major`, `semver:minor`, or
   `semver:patch` (CI requires it; merge auto-bumps and releases from that label).

## Title

One short line that states intent. No prefix required.

## Body format

````markdown
## Problem

(What this PR solves. Include `Closes #XX` or `Refs #XX`.)

## Solution

(Approach and main changes as bullets.)

## Design

<!-- Only for greenfield or design changes -->

```mermaid
(structure or flow diagram)
```

## Impact and risks

(State "None" if there are none.)
````

## Rules

- **Problem** and **Solution** are required.
- **Design** only when introducing or changing architecture; omit the section if N/A.
- **Impact and risks** is required even when the answer is "None".
- List under **Impact and risks** any self-review **Needs confirmation** items left unfixed, with a short “not necessary because …” reason (also Tailwind tokens, missing tests, Storybook when intentional).
- Attach exactly one **`semver:*` label** when opening the PR (`major` = breaking, `minor` = feature, `patch` = fix/docs/chore).
- Do not guess intent—ask a human when unclear.
