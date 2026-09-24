---
name: coding-guide
description: >-
  Project coding conventions and architecture constraints. Use when implementing,
  creating, or modifying components and modules (e.g. "create a component",
  "implement this feature"). Prefer design-system Row/Col/Text/Link over raw
  Tailwind layout; update VRT baselines when UI appearance changes.
---

# Coding guide

## Directory layout and dependencies

Follow the `project-structure` skill.

## Module design

Prefer **deep modules**: a small public surface with substantial work hidden inside. Callers should not need to know implementation details.

- Public access to a slice stays on **`index.ts` only** (see `project-structure`)
- Keep re-exports in the slice public-API barrel (`index.ts` / `index.server.ts` / `index.client.ts`) only. Do not add intermediate re-export-only files inside a slice (e.g. a `types.ts` that merely re-exports another module)—import from the original source directly, including downward into `contents/`

During implementation, **make it work first**. Depth and API shape are audited in the **`self-review` loop before opening a PR** (clear Must fix; other notes optional)—not as a separate pass mid-feature.

## Comments

Comments are knowledge in the codebase. Treat them carefully:

- **Do not invert dependencies.** A module must not teach its callers how to use it (or restate conventions that live in a skill). Put that in the public API, docs, or the canonical skill — comments link, they do not become the source of truth (see `single-source-of-truth`)
- **Comments rot.** They are not type-checked or linted. Prefer none over a stale explanation; when you write one, expect to maintain it
- **Why only when surprising.** Skip ordinary design choices (those belong in the commit message). Comment when the code does something a reader would reasonably assume is wrong or unnecessary — "why not the obvious way?"

## Component rules

### Design system first

Before writing layout or chrome, check `shared/design-system/` for an existing primitive. Prefer those over raw Tailwind layout utilities or ad-hoc markup.

- **Layout:** `Row` / `Col` / `Flex` / `FlexItem` (`layout/flex`) — do **not** reach for `className="flex …"` / `flex-col` / `items-center` / `gap-*` when a Flex primitive fits
- **Text:** `Text` / `Span` / heading helpers (`ui/text`)
- **Links:** `Link` (`ui/link`)
- **Icons:** define under `design-system/icons` and import from there
- **Colors and sizes:** Tailwind design tokens from `@theme` in `globals.css` — no hard-coded values in `className`

Decorative wrappers (border, radius, padding-only boxes) may stay as `div` + tokens when Flex does not accept `className` for those concerns.

```tsx
// Good — design-system layout
<Col gap="50">
  <Row align="center" gap="50">
    <img … />
    <Text as="span" size="50">{domain}</Text>
  </Row>
</Col>

// Bad — reinventing Flex with utility classes
<div className="flex flex-col gap-50">
  <div className="flex items-center gap-50">…</div>
</div>

// Good
<div className="bg-background-primary text-text-primary" />

// Bad
<div className="bg-[#15212c] text-[#babec3ee]" />
```

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

### Storybook VRT

Default-on for every story. Opt out with `tags: ["skip-vrt"]` for design-system token galleries, embeds (e.g. CodeSandbox), or other systematically flaky output.

- **UI appearance changes update baselines in the same PR.** Favicon, copy, spacing, layout primitives — if the screenshot would change, update `__snapshots__/vrt/` before merge. Do not leave stale baselines because the diff sits under the failure threshold.
- **No network in a story.** Images, iframes, and fonts must resolve to committed files. Use `shared/test-utils/dummy-asset` for placeholders; never an external CDN
- **No `generateDummy*()` in module-scope `args`.** Story `args` are evaluated at module load, before `preview.beforeEach` reseeds the PRNG, so random values depend on story execution order. Prefer a `StoryFn` (or call `generateDummy*` inside `beforeEach` / `loaders` / CSF3 `render`). CSF3 has no `args: () => ({...})` form
- **Stories that return `null`** (intentional empty canvas): opt out with `tags: ["skip-vrt"]`. Accidental blanks still fail so they are not committed as baselines
- **Never commit a blank baseline by accident.** A uniform-colour PNG for a story that should show UI means the story did not render — fix the story instead of updating the baseline

Baselines target **Linux/Chromium**. macOS renders text differently from CI, so choose the update path by where you run:

| Where | Command | Why |
| --- | --- | --- |
| macOS (local) | `pnpm storybook:test:vrt:update` | Builds/serves Storybook on the host; screenshots run inside the Playwright Linux Docker image so baselines match CI. Requires Docker Desktop or Engine (free for personal use). First run is slow (Storybook build + in-container `pnpm install`; deps are not cached across runs). |
| Cursor Automation / Cloud Agent | `pnpm storybook:test:vrt:update:host` (after `pnpm storybook:build` + serve on `:6006`) | The agent already runs on Linux — no Docker-in-Docker. Nested Docker needs a custom `.cursor/environment.json` setup and is not worth it for VRT alone. |
| Neither available | CI artefact fallback below | — |

Do **not** commit PNGs from `storybook:test:vrt:update:host` on macOS — that is host Chromium, not CI Linux.

The Docker path pins the same Playwright version as the repo, but the jammy image OS/font stack may still differ slightly from CI’s `ubuntu-latest`. After the first Docker-based baseline update, confirm `storybook-test` is green on CI before treating the path as trusted.

**CI artefact fallback:** push, let `storybook-test` fail, download `vrt-diff-<run_id>`, copy `__received_output__/<story-id>-received.png` → `__snapshots__/vrt/<story-id>.png`. Never crop `__diff_output__` (it is a `baseline | diff | received` composite).

### Tests

- **Vitest**, colocated next to the unit under test
- File name: `*.test.ts` / `*.test.tsx`
