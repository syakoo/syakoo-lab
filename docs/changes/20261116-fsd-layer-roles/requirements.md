# Re-define FSD layer roles

- Date: 2026-11-16
- Status: agreed
- Issue: #411

## Why

Today a module's layer depends on who happens to reuse it. `features/` holds only noun-bound or domain-agnostic code (a creation card, the writing reader, MDX infrastructure, OG images), and the skill says `entities/` has "no UI". A new module has no obvious home, and the AI sessions that work in this repo place it by guesswork.

The need: one question that decides the layer, **does the module know why an operation happens (a use case)?** After this change, the skill answers "where does this go?" the same way every time, and the code already follows it.

## As-is

| Area | Today |
| --- | --- |
| `project-structure` skill | `entities/`: shared models, **no UI**. `features/`: cross-widget reusable capabilities and UI pieces, laid out as `features/<domain>/<name>/`. |
| `features/creation/creation-card` | A creation's own card UI. Imports `entities/creation` and `shared` only. Used by `widgets/creation-list` and `widgets/related-creations`. |
| `features/writing/writing-mdx` | `readWritingById`, the TOC resolver, three body plugins. Used by `widgets/writing-detail`. |
| `features/mdx/{content-resolver,mermaid,twitter}` | Client-side MDX runtime and two hooks. No domain code. Used by `widgets/writing-detail` and `widgets/creation-detail`. |
| `entities/mdx-content` | Server-side MDX serializer and the mermaid plugin. Domain-agnostic, used by the creation and writing entities and `features/*`. |
| `features/creation/og-image` | `creationOgImagePath` (pure path helper) and a build-time generator that reads `contents/arts` and `contents/games`. Used by `pages/creations/[id]` and `scripts/generate-og-images.ts`. |
| `entities/page-title` | `formatPageTitle` only: a pure formatter (`"<title> - <site name>"`) over `shared/config/site`. No model, rule, or UI. Used by six `pages/` files. |
| Tooling | `scripts/check-architecture.ts` assumes `features/<domain>/<name>` slices. `enforcement-inventory` has the rows "`entities/` has no UI" and "`features/<domain>/` organizational layout". |

## Goal

- The `project-structure` skill defines the layers by the use-case question:
  - `entities/`: the nouns. Models, rules, readers, **the noun's own UI**, and basic data operations (R and plain CUD) that do not know why they are called.
  - `features/`: user actions or scenarios (UI, validation, state for one intent) built on entities. Created only when the same action is needed in a second widget.
  - `widgets/`: unchanged. Composes entities and features.
  - `shared/`: domain-agnostic infrastructure.
- `entities/page-title` is not a noun, so it moves to `shared/page-meta`.
- The modules above sit in the layer that definition gives them.
- The site behaves exactly as before.

## Out of scope

- Any user-visible or behavior change (routes, rendered pages, OG images, MDX output).
- Moving `WritingTab` / `useGetWritingListType`. They stay in `widgets/writing-list`; they are the first `features` candidate once a second widget needs them.
- Changing `contents/`, `pages/`, or the widgets' structure beyond updated imports.
- Changing the FSD layer-direction or public-API checks in `scripts/check-architecture.ts`, unless a move needs it (design decides).
- Qualities (speed, privacy, accessibility, cost) are not a concern for this change.

## Use cases

| ID | Actor | What they get |
| --- | --- | --- |
| UC1 | Developer or AI session | Reads the skill and decides the layer of a new module by one question, with the rule of thumb (R and plain CUD → `entities`; operations that carry a use case → `features`; domain-agnostic → `shared`). |
| UC2 | Developer or AI session | Finds a noun's UI (creation card), reader, and derived helpers (OG image path, writing reader and plugins) in its `entities/` slice. |
| UC3 | Developer or AI session | Finds domain-agnostic MDX infrastructure (serializer, resolver, mermaid, twitter) in one place under `shared/`. |
| UC4 | Developer or AI session | Sees the project's indexed standards (`enforcement-inventory`) match the new roles. |
| UC5 | Site visitor | Sees no difference. |

## Error handling

- **E1 (common): checks fail after a move.** `pnpm lint` (includes the architecture check), `pnpm type-check`, or `pnpm test` fails. The slice is not committed until it passes; no partial move is left on the branch.
- **E2 (common): rendering differs.** Storybook VRT shows a diff, or the generated OG images or the built pages differ from before. The cause is a defect in the move and is fixed; a baseline is never updated to hide it.

## Acceptance examples

Skill and index

1. When someone asks the `project-structure` skill where a noun's UI goes, then it says `entities/<noun>/ui` and no longer says "entities: no UI".
2. When someone asks where a reader or a plain create/update/delete operation goes, then the skill says `entities`; for an operation that carries a use case (for example "filter writings by type") it says `features`.
3. When the skill describes `features/`, then it states the second-widget condition and that no slice exists yet.
4. The `enforcement-inventory` rows "`entities/` has no UI" and "`features/<domain>/` organizational layout" are updated to the new wording, as links to the skill only (single source of truth).

Moves

5. After the change, `CreationCard` is exported from `entities/creation`, and `widgets/creation-list` and `widgets/related-creations` import it from there.
6. After the change, `readWritingById`, the TOC resolver, and the writing body plugins live in `entities/writing` (server-only exports behind `index.server.ts`), and `widgets/writing-detail` imports them from there.
7. After the change, the MDX serializer, content resolver, and the mermaid and twitter hooks live under `shared/`, and no file under `entities/` or `features/` defines them.
8. After the change, `creationOgImagePath` and the OG generator live in `entities/creation`; `pages/creations/[id]` and `scripts/generate-og-images.ts` import them from there.
9. After the change, `src/features/` contains no slice, and `WritingTab` / `useGetWritingListType` are still in `widgets/writing-list`.
9a. After the change, `formatPageTitle` is in `shared/page-meta` and no `entities/page-title` slice exists; the six pages import it from there.

No behavior change

10. When `pnpm lint`, `pnpm type-check`, and `pnpm test` run on the branch, then all pass (E1).
11. When Storybook VRT runs, then no baseline changes, including the creation card stories (E2).
12. When OG images are generated, then the output files are byte-identical to `main`'s (E2).
13. When the site is built, then every page renders the same as on `main`.

Must not happen

14. No shim, re-export, or copy is left at an old path.
15. `entities/` does not import from `features/` or `widgets/`; `shared/` imports nothing from `entities/`, `features/`, `widgets/`, or `contents/`.

## Decisions and open questions

Decided (proposed by Claude; confirm in review):

| Decision | Reason |
| --- | --- |
| `entities/mdx-content` moves to `shared` together with `features/mdx` (one `shared/mdx`) | Both are domain-agnostic MDX infrastructure. Leaving one in `entities` contradicts the new definition, and `entities/writing` then depends on `shared` instead of a sibling entity. |
| `og-image` moves to `entities/creation` | It is a derived view of the noun with no use case. A pure path helper plus a build-time reader sit next to `creationPaths` and the creation reader. |
| All of `writing-mdx` (reader, TOC, plugins) moves to `entities/writing` | Writing-specific, no use case behind it. `readWritingById` sits next to `readWritingHeads`. |
| Keep the `features` layer in the skill and the architecture check, with no slices | Nothing uses it yet; removing it would be redone the moment `WritingTab` is reused. |
| Pure refactor; checked by lint, type-check, tests, VRT, and OG image output | The issue asks for placement, not behavior. |

Open:

- Whether `check-architecture.ts` needs changes for the moves (for example slice-depth assumptions once `features/` is empty). Design decides after reading the script.
