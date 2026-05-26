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

## Component rules

### File layout

```
post-list/
├── post-list.tsx           # Component implementation
├── post-list.css.ts        # Styles (when needed)
└── post-list.stories.tsx   # Stories
```

- Directory and file names: **kebab-case**
- External access to a slice: **`index.ts` (Public API) only**
- `index.ts`: re-exports only—no component bodies
- Stories should cover existing UI patterns

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
