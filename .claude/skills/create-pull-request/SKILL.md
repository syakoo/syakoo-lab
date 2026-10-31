---
name: create-pull-request
description: >-
  Open the Draft PR when an sdf piece of work starts, and finalize its body and
  mark it ready when implementation is reviewed. Use when creating a pull request,
  opening a draft PR, pushing for review, or completing an sdf implementation.
---

# Create pull request

The PR is opened as a **Draft** when `sdf-requirements` starts (see the `sdf` rule) and finalized when `sdf-implement` has a clean review. Never open a second PR for the same work.

## Open the Draft PR

1. Push the branch: `git push -u origin HEAD`.
2. `gh pr create --draft` with the title and a short body (the Problem section below; the rest is added at finalize).
3. Attach exactly one `semver:*` label (CI requires it): `semver:major` = breaking, `semver:minor` = feature, `semver:patch` = fix/docs/chore. Adjust it at finalize if the impact changed.

## Finalize

1. Confirm the fresh-context review has no **Must fix** left.
2. Rewrite the body in the format below with `gh pr edit --body-file -`.
3. `gh pr ready`.

## Title

One short line that states intent. No prefix required.

## Body format

````markdown
## Problem

(What this PR solves. Link `docs/specs/<YYYYMMDD>-<slug>/requirements.md`. Include `Closes #XX` when an issue exists.)

## Solution

(Approach and main changes as bullets. Link `design.md`.)

## Deviations from the design

(Every deviation, including the small ones. "None" if there are none.)

## Acceptance examples

(The result for each acceptance example from the requirements.)

## Impact and risks

(State "None" if there are none.)
````

## Rules

- **Problem**, **Solution**, **Acceptance examples**, and **Impact and risks** are required, even when the answer is "None".
- Under **Impact and risks**, list review **Needs clarification** items left unresolved, each with a short reason (also Tailwind tokens, missing tests, Storybook when intentional).
- Do not guess intent—ask a human when unclear.
