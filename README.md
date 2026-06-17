# Syakoo Lab

Personal site and lab for writings, creations, and experiments.

## Development

```bash
pnpm install
pnpm dev
```

## Quality checks

| Command | What it enforces |
|---------|------------------|
| `pnpm lint` | Biome format/lint + FSD architecture (`scripts/check-architecture.ts`) |
| `pnpm lint:fix` | Auto-fix safe Biome issues |
| `pnpm type-check` | TypeScript `--noEmit` |
| `pnpm test` | Unit tests (Vitest) |

CI runs these on every pull request. See [docs/enforcement-inventory.md](docs/enforcement-inventory.md) for the full map from each project rule to its enforcement mechanism (lint, architecture script, Cursor rule/skill, or advisory).

### Fixing violations

- **Biome** — read the diagnostic; run `pnpm lint:fix` when auto-fixable.
- **Architecture** — import through slice barrels; respect layer direction (see `project-structure` skill).
- **Type errors** — fix types at the reported location; do not weaken `tsconfig` to silence errors.

Agent-facing rules live under `.cursor/rules/` and `.cursor/skills/`.
