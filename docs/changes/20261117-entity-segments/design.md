# Design: Align entity segments with FSD vocabulary

- Date: 2026-11-17
- Status: implemented
- Requirements: none (waived by the owner; the problem and idea are in the issue)
- Issue: #413

## Approach

A move-and-retarget refactor, like #412. No module gets new logic.

- `models/` → `model/`: types, kinds, and pure rules/conversions only (including paths and the OG image path, which are pure string derivations).
- New `repository/`: readers and plain data operations (`read-*`, `to-creation-summary`). Named `repository` instead of FSD `api` because the data comes from `contents/`, not over HTTP.
- `helpers/` is removed. Paths move to `model/`; `entities/writing/helpers/mdx-plugins` becomes the purpose-named segment `mdx-plugins/`. No `lib/` is created.
- The OG generator (`generate-creation-og-images`, `read-creation-thumbnail-paths`) leaves `entities/` and moves to `scripts/og-images/`. It is build-only Node code, so no slice barrel should carry it. `scripts/generate-og-images.ts` imports it directly; the app and Storybook never load it.
- `project-structure` skill: define each segment; `check-architecture.ts`: recognize the new segment names.

## Diff from as-is

```mermaid
flowchart LR
  subgraph asis["as-is"]
    direction TB
    S1["scripts/generate-og-images"]
    C1["entities/creation/index.server"]
    C2["entities/creation/models (types + readers + og-image)"]
    C3["entities/creation/helpers (paths)"]
    W1["entities/writing/models (types + readers + toc)"]
    W2["entities/writing/helpers (paths + mdx-plugins)"]
    SB1[".storybook/preview.ts mocks"]
    S1 --> C1 --> C2
    C1 --> C3
  end
  subgraph tobe["to-be"]
    direction TB
    S2["scripts/generate-og-images"]
    O2["scripts/og-images (generator + thumbnail paths)"]
    C4["entities/creation/model (types, paths, og path)"]
    C5["entities/creation/repository (readers)"]
    W3["entities/writing/model (types, toc, head, paths)"]
    W4["entities/writing/repository (readers)"]
    W5["entities/writing/mdx-plugins"]
    SB2[".storybook/preview.ts mocks (paths + OG mocks dropped)"]
    S2 --> O2 --> C4
    C5 --> C4
    W4 --> W3
    W4 --> W5
  end
  classDef removed stroke:#d32f2f,stroke-width:3px
  classDef added stroke:#2e7d32,stroke-width:3px
  classDef changed stroke:#f9a825,stroke-width:3px
  class C2,C3,W1,W2 removed
  class O2,C4,C5,W3,W4,W5 added
  class S2,SB2 changed
```

### File moves (`git mv`)

| From | To |
|------|----|
| `entities/creation/models/creation.ts`, `creation.mocks.ts`, `creation-type/` | `entities/creation/model/` |
| `entities/creation/helpers/paths/`, `helpers/og-image/creation-og-image-path.ts` | `entities/creation/model/paths/`, `model/og-image/` |
| `entities/creation/models/creation-reader/*` | `entities/creation/repository/` |
| `entities/creation/models/og-image/*` (generator, thumbnail paths, `__mocks__`) | `scripts/og-images/` |
| `entities/writing/models/{writing.ts,writing.mocks.ts,writing-type,writing-toc}`, `writing-reader/head-resolver.ts` | `entities/writing/model/` |
| `entities/writing/helpers/paths/` | `entities/writing/model/paths/` |
| `entities/writing/models/writing-reader/read-*.ts` | `entities/writing/repository/` |
| `entities/writing/helpers/mdx-plugins/` | `entities/writing/mdx-plugins/` |
| `shared/mdx/{models,helpers}` and `shared/mdx/*/helpers` | Out of scope (left as is; see Decision 6) |

Changed: `entities/*/index*.ts` re-export paths, `.storybook/preview.ts` mock paths (the two OG mocks and `read-creation-thumbnail-paths` mock go away), `scripts/check-architecture.ts` (`isInternalSegment`: `ui`, `model`, `repository`, `mdx-plugins`; reject `models` / `helpers`), `project-structure` skill (segment table), `package.json` `build:og-images` only if the path changes.

## Acceptance trace

No requirements document, so the checks come from the issue's wants.

| Want | Satisfied by | Check |
|------|--------------|-------|
| `models/` → `model/`, pure only | moves above | `pnpm lint` (architecture check fails on `models/` imports) |
| Readers in `repository/` | moves above | architecture check; `pnpm type-check` |
| `helpers/` gone | moves above | architecture check rejects `helpers` |
| OG generator off the reader barrel | `scripts/og-images/` | `pnpm build:og-images` still produces images; `index.server.ts` has no `sharp`/`glob` |
| Storybook needs no OG/Node workaround | mocks dropped | `pnpm test` (Storybook tests), Storybook build |
| Skill says what goes where | `project-structure` rewrite | review |
| No behavior change | pure moves | `pnpm test`, VRT shows no diff |

## Decisions

1. **`repository/` over `api/`.** `api` suggests HTTP; the entity layer's role says readers and plain data operations. Rejected: `api` (fidelity to FSD, but misleading here).
2. **OG generator in `scripts/og-images/`.** It is only run at build time, so it is not a noun's reusable capability; keeping it in a slice always risks being barrel-loaded. Rejected: an `og-image/` segment with its own entry such as `index.og-image.ts` (still a Node-only module inside a slice, needs a new barrel rule and check).
3. **Paths and OG path live in `model/`.** They are pure conversions of the noun's id. Rejected: `lib/` (name says nothing about purpose).
4. **No `lib/` and no `helpers/`.** `mdx-plugins/` is named for what it holds. Add `lib/` later only when a real generic utility appears.
5. **Mocks stay in `model/`** (`*.mocks.ts`), unchanged.
6. **`shared/mdx` is out of scope; this change covers `entities/writing` and `entities/creation` only.** `shared/` is not a slice layer and `check-architecture.ts` does not check it; entities use `shared/mdx` only through its barrels, so its internal segment names do not affect them. The `project-structure` skill states that `shared/` is outside the segment convention. Cost: `shared/mdx` keeps `models/` and `helpers/` for now; a later PR can rename them. Rejected: renaming in this change (widens the diff without a check to back it).

## Slices

1. Entities: rename `models`→`model`, add `repository/`, move paths, retarget imports and barrels (creation and writing together, since both share the skill/check change).
2. Move OG generator to `scripts/og-images/`; drop the Storybook mocks it needed; verify `build:og-images`.
3. Move `mdx-plugins/`; remove `helpers/`.
4. Update `check-architecture.ts` and the `project-structure` skill (state that `shared/` is outside the segment convention; `enforcement-inventory` only if a row changes).

## Open questions

None.

## Applied rules

`sdf`, `ai-workflow`, `single-source-of-truth` rules; `project-structure` and `coding-guide` skills; `scripts/check-architecture.ts`. No rule found for naming segments beyond the skill's table (rewritten here).
