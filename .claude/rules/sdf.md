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
| Requirements, design | Owner and Claude in a session, or async on GitHub (below) | Owner approval before the next phase |
| Implement | Claude, unattended | Only a design or requirements deviation, per `sdf-implement` |

`@claude implement` on the Draft PR (`.github/workflows/claude.yml`) marks `design.md` `agreed` if it is still `draft`, then runs `sdf-implement` from it. Unattended runs cannot ask: list unresolved **Needs clarification** items under **Impact and risks** in the PR. On a design deviation, stop instead: comment on the PR with what differed and the options, leave it a Draft, and push no further slices.

## Async on GitHub

Requirements and design can run as `@claude` comments instead of a session; the triggers are in the `ai-workflow` rule. This overrides the interactive parts of `sdf-requirements` (one question cluster at a time, review with the user) and its Artifact sketch; the rest of the skill applies unchanged.

- **Why, on the issue.** Ask the `sdf-requirements` why-questions in one comment, each with a proposed default. At most 3 rounds. Pictures on the issue are Mermaid or ASCII only; there is no branch yet, and Artifacts are unavailable unattended.
- **Hand-off to git.** The Draft PR opens here, not when the first question is asked (this overrides "When `sdf-requirements` starts" under State lives in git). On `@claude LGTM` on the issue, cut `claude/<slug>`, commit `requirements.md` (`status: draft`), and open the Draft PR (`Closes #n`). Link it on the issue. HTML sketches go in `sketch/` on that branch.
- **Approvals.** `@claude LGTM` on the PR marks `requirements.md` `agreed` and writes `design.md` (`status: draft`) on the same PR. Approving the design is `@claude implement` (above).
- **Right state only.** Act only when the document status matches the trigger. Otherwise comment why and stop.
- **Say what is next.** End each comment with a `Next:` line naming the trigger that moves on.

## Implement

- Checks before each slice commit: `pnpm lint`, `pnpm type-check`, `pnpm test`; UI changes also follow `coding-guide` → Storybook VRT.
- The fresh-context review (Part 2) reads `coding-guide` and `project-structure` and checks the diff against them, on top of the default aspects.
- When the review is clean, finalize the existing Draft PR with `create-pull-request` (body, then `gh pr ready`); do not open a second one. This overrides `sdf-implement` step 7 ("open the pull request").
