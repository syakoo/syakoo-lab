---
name: coding-guide
description: >-
  Project coding conventions and architecture constraints. Use when implementing,
  creating, or modifying components and modules (e.g. "create a component",
  "implement this feature").
---

# Coding guide

## Directory layout and dependencies

Follow the `project-structure` skill.

## Module design

Prefer **deep modules**: a small public surface with substantial work hidden inside. Callers should not need to know implementation details.

- Public access to a slice stays on **`index.ts` only** (see `project-structure`)
- Keep re-exports in the slice public-API barrel (`index.ts` / `index.server.ts` / `index.client.ts`) only. Do not add intermediate re-export-only files inside a slice (e.g. a `types.ts` that merely re-exports another module)—import from the original source directly, including downward into `contents/`
- When choosing a new or redesigned API shape, follow `design-it-twice`
- For a dedicated pass to hunt shallow structure across the codebase, follow `deepen-modules` (not during feature or bug-fix work)

## Comments

Comments are knowledge in the codebase. Treat them carefully:

- **Do not invert dependencies.** A module must not teach its callers how to use it (or restate conventions that live in a skill). Put that in the public API, docs, or the canonical skill — comments link, they do not become the source of truth (see `single-source-of-truth`)
- **Comments rot.** They are not type-checked or linted. Prefer none over a stale explanation; when you write one, expect to maintain it
- **Why only when surprising.** Skip ordinary design choices (those belong in the commit message). Comment when the code does something a reader would reasonably assume is wrong or unnecessary — "why not the obvious way?"

## Component rules

### File layout

```
post-list/
├── post-list.tsx           # Component implementation
├── post-list.module.css    # Styles (when needed)
├── post-list.stories.tsx   # Stories
└── post-list.test.ts       # Tests (when needed)
```

- Directory and file names: **kebab-case**
- External access to a slice: **`index.ts` (Public API) only**
- `index.ts`: re-exports only—no component bodies
- Styles: **CSS Modules** (`*.module.css`)
- Stories should cover existing UI patterns

### Tests

- **Vitest**, colocated next to the unit under test
- File name: `*.test.ts` / `*.test.tsx`

### Design system

- Icons: define under `design-system/icons` and import from there
- Layout, text, links: use `design-system` primitives
- Colors and sizes: **Tailwind design tokens** from `@theme` in `globals.css`—no hard-coded values

```tsx
// Good
<div className="bg-background-primary text-text-primary" />

// Bad
<div className="bg-[#15212c] text-[#babec3ee]" />
```
