# Project standards enforcement inventory

Each project rule is owned by exactly one enforcement mechanism. Prefer fixing violations over weakening checks.

| Enforcement | Where it runs | How to fix |
|---------------|---------------|------------|
| **Lint** (Biome) | `pnpm lint`, CI `lint` job | `pnpm lint:fix` or follow the diagnostic |
| **Architecture** (custom) | `pnpm check:architecture`, CI `lint` job | Import through slice barrels; respect FSD layer direction |
| **Type check** (TypeScript) | `pnpm type-check`, CI `type-check` job | Fix types reported by `tsc` |
| **Cursor rule/skill** | Agent sessions | Follow linked rule or skill during implementation/review |
| **Advisory** | Human review, PR checklist | No automated failure; document rationale in PR when deviating |

## Coding and module design

| Rule | Owner | Mechanism |
|------|-------|-----------|
| kebab-case file and directory names | Lint | `style/useFilenamingConvention` in `biome.jsonc` (overrides for Next.js `[param]` routes) |
| `import type` for type-only imports | Lint | `style/useImportType` |
| No default exports (except allowed paths) | Lint | `style/noDefaultExport` + overrides in `biome.jsonc` |
| Prefer `type` over `interface` for object types | Lint | `style/useConsistentTypeDefinitions` |
| No unused imports or variables | Lint | `correctness/noUnusedImports`, `correctness/noUnusedVariables` |
| React hooks at top level | Lint | `correctness/useHookAtTopLevel` |
| Sorted Tailwind classes (`cn`, `cva`) | Lint | `nursery/useSortedClasses` |
| No leaked conditional render (`&&` with numbers/strings) | Lint | `nursery/noLeakedRender` |
| Deep modules (small API, substantial internals) | Advisory | `deepen-modules` skill; design reviews |
| Design it twice for new API shapes | Advisory | `design-it-twice` skill |

## Feature-Sliced Design (FSD)

| Rule | Owner | Mechanism |
|------|-------|-----------|
| Layer dependency direction (downward only) | Architecture | `scripts/check-architecture.ts` |
| Slice public API via `index.ts` / `index.server.ts` / `index.client.ts` | Architecture | `scripts/check-architecture.ts` |
| `index.ts` re-exports only (no component bodies) | Cursor | `.cursor/rules/coding-standards.mdc` |
| `features/<domain>/` is organizational (no domain `index.ts`) | Cursor | `project-structure` skill |
| No business logic in `shared/` | Cursor | `project-structure` skill |
| `entities/` has no UI | Cursor | `project-structure` skill |
| Readers in `entities`; cross-cutting UI in `features` | Cursor | `project-structure` skill |

### FSD layer order (higher → lower)

`app` → `widgets` → `features` → `entities` → `contents` → `shared`

A file may import only from layers **below** its own (higher rank number in `check-architecture.ts`), or from paths inside its own slice.

## Components and styling

| Rule | Owner | Mechanism |
|------|-------|-----------|
| Component file layout (`*.tsx`, `*.css.ts`, `*.stories.tsx`) | Cursor | `coding-guide` skill |
| Icons under `design-system/icons` | Cursor | `coding-guide` skill |
| Layout, text, links from `design-system` primitives | Cursor | `coding-guide` skill |
| Tailwind tokens from `@theme` in `globals.css` (no arbitrary color literals in `className`) | Advisory | Human review; token definitions live in `globals.css` |
| Stories cover existing UI patterns | Advisory | Storybook review |

## Workflow and hygiene

| Rule | Owner | Mechanism |
|------|-------|-----------|
| AI-led flow (plan → 🚀 → implement → PR) | Cursor | `ai-workflow` rule |
| PR body: Problem, Solution, Impact and risks | Cursor | `create-pull-request` skill |
| PR review checklist (FSD, hygiene, tests) | Cursor | `review-pull-request` skill |
| Pre-push self-review (debug leftovers, TODO/FIXME) | Cursor | `self-review` skill |
| No `console` in app code (scripts exempt) | Lint | `suspicious/noConsole` (warn; `scripts/` override off) |
| No `debugger` | Lint | `suspicious/noDebugger` |
| Tests for behavior changes | Advisory | `review-pull-request` / `self-review` skills |
| Codify lessons after trial-and-error | Cursor | `continuous-improvement` rule → `suggest-improvement` skill |

## Conflicts and exceptions

- **Biome vs Cursor**: If a Cursor skill asks for something Biome forbids (e.g. default export in `page.tsx`), the Biome override in `biome.jsonc` wins. Skills must not contradict active lint rules.
- **Design-system deep paths**: Components live at `shared/design-system/ui/<name>/<name>.tsx` without a root barrel. Importing these paths is intentional; public-API architecture checks apply to `widgets`, `features`, and `entities` slices only.
- **Next.js App Router**: `page.tsx`, `layout.tsx`, `[id]/` segments, and `sitemap.ts` are exempt from `noDefaultExport` and kebab-case filename rules where framework conventions require it.

## Local commands

```bash
pnpm lint              # Biome format + lint
pnpm lint:fix          # Auto-fix safe Biome issues
pnpm check:architecture # FSD layer + public API checks
pnpm type-check        # TypeScript --noEmit
```

CI runs `pnpm lint` (includes architecture check), `pnpm type-check`, tests, and build on every pull request.
