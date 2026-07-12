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
2. Read `git diff` and changed files.
3. **Run `health-checkup`** over this branch vs the PR base (required). Prefer a **fresh subagent** with a clean context; pass only repo path, base ref, and the diff scope. Fold the report into **Impact and risks** (and file issues for actionable items the checkup did not already file).
4. Run `self-review` (or the `self-review` subagent) so mechanical AI-review noise is cleared before the PR is opened.
5. Draft title and body in the format below.
6. Run `gh pr create`.

Do **not** open the PR until steps 3–4 are done (or the user explicitly waives them).

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

(State "None" if there are none. Include health-checkup outcome: issue links, declined items, or "No actionable findings".)
````

## Rules

- **Problem** and **Solution** are required.
- **Design** only when introducing or changing architecture; omit the section if N/A.
- **Impact and risks** is required even when the answer is "None".
- List any intentional **advisory deviation** (deep modules, design-it-twice, Tailwind tokens, missing tests, Storybook) under **Impact and risks** so later checkups can see the trail.
- Record the pre-PR **health-checkup** result under **Impact and risks**.
- Do not guess intent—ask a human when unclear.
