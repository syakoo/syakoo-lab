# sdf workflow

Feature work runs through `sdf-requirements` → `sdf-design` → `sdf-implement`. Those skills defer to the project for the decisions below ("the project wins").

## Documents

- Location: `docs/specs/<YYYYMMDD>-<slug>/` (`requirements.md`, `design.md`, `sketch/`). `<YYYYMMDD>` is the day the work began.
- One folder per piece of work. A change that resembles an earlier one gets a new folder; do not edit the old one.
- Kept after merge, with status `implemented`. The code is the source of truth for current behavior.
- Language: English.

## State lives in git

Sessions may run anywhere (local, Claude Code on the web, `@claude` in Actions), so progress must be recoverable from the branch alone.

- When `sdf-requirements` starts, cut `claude/<slug>` from `origin/main`, commit the draft (`status: draft`), push, and open a **Draft PR** with one `semver:*` label (`create-pull-request`).
- Commit and push each document when it changes status (`draft` → `agreed`).
- Never commit to `main`. Never use `--no-verify`; if a hook times out, raise the shell timeout and retry.
- Commit subjects follow Conventional Commits (`.commitlintrc.json`) and end with the slice number, e.g. `feat(writing): add reading time (Slice 2)`.

## Issues

Optional. Use one as an inbox for an idea; there is no template. The PR number is the index. If an issue exists, the PR says `Closes #n`.

## Phases

| Phase | Who | Stops for |
|-------|-----|-----------|
| Requirements, design | Owner and Claude in a session | Owner approval before the next phase |
| Implement | Claude, unattended | Only a design deviation, per `sdf-implement` |

`@claude implement` on the Draft PR (`.github/workflows/claude.yml`) runs `sdf-implement` from `design.md`. Unattended runs cannot ask: list unresolved **Needs clarification** items under **Impact and risks** in the PR.

## Implement

- Checks before each slice commit: `pnpm lint`, `pnpm type-check`, `pnpm test`; UI changes also follow `coding-guide` → Storybook VRT.
- The fresh-context review (Part 2) reads `coding-guide` and `project-structure` and checks the diff against them, on top of the default aspects.
- When the review is clean, finalize the existing Draft PR with `create-pull-request` (body, then `gh pr ready`); do not open a second one.
