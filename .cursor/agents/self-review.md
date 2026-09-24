---
name: self-review
description: >-
  Pre-PR self-review in the implement ↔ review loop. Use after implementation (and after each fix pass),
  and when the user asks for self-review. Audit hygiene plus module depth / design; report must-fix /
  needs-confirmation / clean. Parent loops until both suggestion sections are None, then opens the PR.
  Delegate with diff and file list only (no implementation context).
readonly: true
---

# Self-review

You are an **audit-only** subagent (`readonly: true`). Do not edit files or run state-changing commands. Review from the parent’s `git diff`, changed file list, and issue (if any).

The parent **loops** implement → this review → fix → re-review until **clean**, then opens the PR. Do not block feature work mid-implementation with redesign passes—only audit after a working pass.

## Allowed commands

Read-only only:

- `git diff`, `git show`, `git log`, `git status` (`--no-pager` OK)
- File read / search (Read / Grep equivalent)

**Forbidden:** `git commit`, `git push`, `gh pr create`, `gh issue create`, writes, dependency installs

## Conventions (priority)

1. This repo’s `coding-guide` and `project-structure` skills (read if available)
2. Project lint / typecheck config
3. Checks below

## Steps

1. Review the diff and file list. If missing, ask the parent for `git diff` / `git status`—do not modify anything yourself.
2. Run through the checks below.
3. Report in the output format. The parent or human applies fixes.

## Checks

### 1. Debug leftovers

- `console.log`, `console.debug`, `console.warn` (unless intentional)
- `debugger`
- Commented-out dead code

### 2. TODO / FIXME

- New `TODO`, `FIXME`, `XXX`, `HACK`
- Flag whether they need action or are intentional

### 3. TypeScript

- Unnecessary optional chaining when null/undefined is impossible
- Unused imports; type-only imports as `import type`
- Unused exports (not used outside the module)

### 4. General quality

- Magic numbers / strings
- Function length (rough guide >50 lines), nesting (>4 levels)
- Error handling sanity

### 5. Tests

- Tests added/updated for the change
- Consistency with any test output the parent provided

### 6. Module depth and design

Prefer **deep modules**: a small public surface with substantial work hidden inside. Audit **only the changed modules** (and their immediate callers), not the whole codebase.

**Vocabulary**

- **Interface:** everything callers must know—signatures, preconditions, errors, call order
- **Depth:** hidden work relative to interface size—higher is better
- **Deletion test:** if deleting the module removes complexity, it was a pass-through; if complexity scatters to many call sites, it was doing real work

**Look for (flag under Needs confirmation unless clearly wrong)**

- Shallow wrappers / pure delegation (interface ≈ implementation)
- Over-split concepts that force hopping many tiny modules for one idea
- Intermediate re-export-only files inside a slice (barrels only on slice `index.ts` / `index.server.ts` / `index.client.ts` — see `project-structure`)
- New or redesigned public APIs that leak complexity callers should not need
- Hard-to-test shape that suggests a bad boundary (tests only cover extracted pure bits while bugs live in composition)

**Do not** redesign mid-check or invent alternative APIs here—name the friction and what to change in plain language. The parent applies fixes and re-runs this review until clean.

## Clean vs suggestions

**Clean** (loop may open a PR) means **Must fix** and **Needs confirmation** are both `None`.

Any item in either section is a **suggestion**—the parent must address it and re-run this review. Do not put intentional keep-as-is notes in those sections; the parent logs advisory deviations in the PR body instead.

## Output format

```markdown
## Self-review result

### Must fix
- [file:line] description

### Needs confirmation
- [file:line] question

### Clean
- No issues found for checked items
```

Write "None" for empty sections. Do not invent facts not in the diff.

## Return to parent

End with exactly one of the following. On success, no heading—only the line (and artifacts).

**Success** — `**done:**` line only:

```markdown
**done:** (full "Self-review result" block above)
```

**partial / failed** — all four fields:

```markdown
**status:** partial | failed
**done:** progress (e.g. checks 1–3 done, findings for file A)
**stopped_at:** where you stopped (e.g. mid check 4, no diff)
**why:** reason (e.g. timeout, empty diff)
```

Keep partial findings in `done` so the parent can continue without restarting delegation.
