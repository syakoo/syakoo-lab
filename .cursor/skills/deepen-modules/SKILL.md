---
name: deepen-modules
description: >-
  Explore the codebase for chances to turn shallow modules into deep modules per
  A Philosophy of Software Design. Use when improving architecture, finding refactoring
  opportunities, looking for shallow modules, or the user mentions "deepen".
---

# Deepen modules

Find places where **more work can hide behind a smaller interface** and propose improvements.

Core idea: module value is the gap between interface and implementation. **Deep modules** (small API, substantial internals) are easier to use and change. **Shallow modules** (API complexity ≈ implementation complexity) add cost.

## Vocabulary (use consistently)

- **Module:** anything with interface + implementation—function, class, package, file; any granularity
- **Interface:** everything callers must know—signatures, preconditions, errors, call order
- **Implementation:** code behind the interface
- **Depth:** ratio of hidden work to interface size—higher is better
- **Deletion test:** imagine deleting the module. If complexity vanishes, it was a pass-through. If it scatters to N call sites, it was doing real work

## When to use

- Hunting structural improvement opportunities
- Turning vague "this feels redundant" into words
- Tests are hard to write (often signals shallow modules)

Do **not** use during feature work or bug fixes (make it work first), or for diff review (use `self-review`).

## Steps

### 1. Explore

Walk the codebase and note **friction** by reading code—not only heuristics:

- Understanding one concept requires hopping many small modules → possibly over-split
- Interface complexity ≈ implementation → wrappers, pure delegation, getter/setter piles
- Tests only cover extracted pure functions while bugs live in composition → lost locality
- Tightly coupled cluster with mutual internal dependencies → redraw boundaries
- Untested or hard-to-test modules → bad interface shape

Apply the **deletion test** on each candidate.

### 2. Present candidates

Numbered list; each entry includes:

- **Target file/module**
- **Friction:** what hurts today
- **Proposal:** what to change (plain language—no concrete API yet)
- **Benefit:** testability, locality, simpler callers

**Do not propose concrete interfaces here.** Ask which candidate to deepen.

### 3. Deepen the chosen candidate

For the user’s pick, refine design in dialogue:

- New interface shape
- What moves inside the boundary
- Test survival vs rewrite
- Can it ship in tiny commits?

For multiple interface options, hand off to `design-it-twice`.

## Notes

- **"No candidates" is valid.**
- **Splitting is not always better**—merging into a deeper module is often the win.
- **Stop at design**—implementation is a separate step.
- **Do not skip the deletion test.**
