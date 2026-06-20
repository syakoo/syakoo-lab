# Enforcement inventory

Maps each standard to its enforcement owner. **Rule definitions live only in the linked artifact**—this file is an index, not a second copy.

## Machine checks

| Owner | Command | Definition |
|-------|---------|------------|
| Biome | `pnpm lint` | `biome.jsonc` |
| Architecture | `pnpm lint` (includes `pnpm check:architecture`) | `scripts/check-architecture.ts` |
| TypeScript | `pnpm type-check` | `tsconfig.json` |

## Project standards

| Key rule | Owner | Defined in |
|----------|-------|------------|
| kebab-case filenames | Lint | `biome.jsonc` → `useFilenamingConvention` |
| `import type`, no default export, sorted Tailwind classes, etc. | Lint | `biome.jsonc` |
| FSD layer direction | Architecture | `project-structure` skill |
| Slice public API (`index.ts` / `index.server.ts` / `index.client.ts`) | Architecture | `project-structure` skill |
| `index.ts` re-exports only | Agent | `project-structure` skill |
| `features/<domain>/` organizational layout | Agent | `project-structure` skill |
| No business logic in `shared/` | Agent | `project-structure` skill |
| `entities/` has no UI | Agent | `project-structure` skill |
| Component layout, design-system usage | Agent | `coding-guide` skill |
| Tailwind tokens (no arbitrary colors in `className`) | Advisory | `coding-guide` skill |
| Deep modules | Advisory | `deepen-modules` skill |
| Design it twice for new APIs | Advisory | `design-it-twice` skill |
| AI workflow (plan → implement → PR) | Agent | `ai-workflow` rule |
| PR body format | Agent | `create-pull-request` skill |
| PR review checklist | Agent | `review-pull-request` skill |
| Pre-push self-review | Agent | `self-review` skill |
| Codify lessons after trial-and-error | Agent | `continuous-improvement` rule |
| Single source of truth (no duplicated definitions) | Agent | `single-source-of-truth` rule |

## Config-only exceptions

| Case | Handled in |
|------|------------|
| Next.js App Router default exports and dynamic routes | `biome.jsonc` overrides (`src/app/**`) |
| Design-system deep import paths (no slice barrel) | `scripts/check-architecture.ts` (checks `widgets` / `features` / `entities` only) |
