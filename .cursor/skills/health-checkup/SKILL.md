---
name: health-checkup
description: >-
  Periodic code health checkup for design drift not caught by CI. Use at version
  bumps or when asked for a code health check / 健康診断 / 健診. Audits logged advisory
  deviations and runs a deepen-modules pass.
---

# Health checkup

Catches what CI cannot: design drift (deep modules, layering, abstractions) that accumulates silently between checkups.

## Review model (context for the checkup)

| Concern | Owner |
|---------|-------|
| Issue intent, acceptance criteria | Human |
| Actual runtime behavior | Human |
| Mechanical quality (structure, types, format, commits) | CI — `enforcement-inventory` rule |
| Design health | This checkup |

The audit only works if drift left a trail: every PR logs intentional advisory deviations under **Impact and risks** (`create-pull-request` skill). An undocumented deviation is the one a checkup cannot find.

## Procedure

Run at each release; keep the interval small (design debt compounds).

1. Read advisory deviations logged in PR **Impact and risks** since the last checkup.
2. Run the `deepen-modules` skill as a structured pass over the areas changed since then.
3. Re-check advisory items in `coding-guide` (Tailwind tokens, Storybook coverage, tests for behavior changes).
4. File issues for what is worth fixing; address small drift in a dedicated PR, separate from features.
