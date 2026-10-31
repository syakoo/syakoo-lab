---
description: Implement an agreed design slice by slice, commit per slice, review the result in a fresh context against the requirements and the design, then open a pull request. Use after a design document is agreed, or when the user says "let's implement this" or asks to resume an implementation.
license: MIT
metadata:
    github-path: sdf-implement
    github-ref: refs/tags/v0.1.2
    github-repo: https://github.com/syakoo/sdf-skills
    github-tree-sha: a5557d99bb3ba22a388583404ddf84b04e732880
name: sdf-implement
---
# Implement

Build what the design says, in the order it says, and prove it matches before asking the user to review.

The user reviews and merges the pull request. Do not merge.

## Flow

1. **Read the input.** Read `requirements.md` and `design.md` (see Output of the other sdf skills for where). If the design is not `agreed`, stop and ask the user.
2. **Find where you are.** Read the Slices in the design and the git log of the branch. A slice is done when its commit exists. Start from the first slice without one. This is also how you resume after a compact or in a new session.
3. **Find the project's rules.** Look in the project's `CLAUDE.md`, its rules directory (such as `.claude/rules/`), and the list of available skills for: branch and commit conventions, how to run format, lint, typecheck and tests, and how the project reviews changes. Pick only what is relevant and read it. If a project rule conflicts with this skill, the project wins. If the current branch belongs to unrelated work, cut a new one as the project says.
4. **Run each slice: build, verify, commit.** One slice is one commit. End the commit subject with the slice number in parentheses, such as `(Slice 5)`, after whatever format the project requires, so the log shows progress and step 2 can find it. If the project's subject length rule leaves no room, put it in the body. Run the project's checks before each commit.
5. **When the design does not hold, follow the table below.**
6. **Review in a fresh context** (below), fix what it finds, and review again until it is clean.
7. **Mark the documents, then open the pull request.** Just before opening it, set the status of `design.md` and `requirements.md` to `implemented` and commit that, so the change merges with the code. Updating after the merge would need another pull request. The description links the requirements and the design, lists every deviation from the design, and states the result for each acceptance example. If the user asks for changes in review, the status stays as it is.

## Keeping the context small

Implementation is long. Make it safe to drop the context at any point.

- Progress lives in git (one commit per slice) and in the design, not in your memory.
- After each slice commit, if the context is heavy, tell the user this is a cheap moment to run `/compact` or start a new session. You cannot run it yourself. Resuming is step 2.

## When the design does not hold

Judge by what the reviewer agreed: boundaries, data shape, decisions, and acceptance examples.

| Deviation | Example | What to do |
| --- | --- | --- |
| Small | None of the agreed things change: an internal function split, a detail value | Go on. Mention it in the pull request |
| The design changes | A boundary, the data shape, or a decision must change | **Stop.** Do not push through. Show what turned out different, with evidence, give options with a recommended default, and ask. After agreement, fix the design and go on |
| The requirements do not hold | An acceptance example cannot be satisfied, or a premise was wrong | Go back to the requirements. Fix them with the user, then the design |

- Keep finished slices. Redo from the slice that broke.
- Record every change to the design at its end under "Changes during implementation": date, what differed, what changed.
- When unsure between small and design-changing, treat it as design-changing.

## Review

Run it in a subagent with a fresh context. A reviewer who did not write the code sees what its author does not. This is required, and it also keeps the diff out of your own context.

The review has two parts. Both are reported together, with the same levels.

**Part 1: against the requirements and the design.** Always do this; no project procedure knows about it.

- The diff stays within the design's diff from the as-is, with no change outside it, and boundaries have the designed shape.
- Every acceptance example, including what must **not** happen, has its test and passes. Run the project's checks to confirm.

**Part 2: general review of the diff.** If the project has its own review procedure (rules, or a skill for reviewing changes before a pull request), follow it, including its aspects and levels. Only when it has none, use the default below.

Default aspects, each grounded in the diff and limited to touched lines and their immediate context:

- Leftover debug or temporary code, including commented-out code
- New TODO, FIXME, or suppressions (lint or type-check disables, broad escape-hatch types) without a stated reason
- Types and imports: unused imports, constructs the types or control flow already make redundant
- Structure in the diff: magic values, a block that grew unusually long, swallowed errors
- Tests: behavior or public interface changes without added or updated tests; summary of the project's checks that were run

Out of scope for the default: refactors, design debates, and what the formatter or linter already catches (one line saying so is enough).

**Levels.** Report each finding as one of:

- **Must fix** — fix before the pull request
- **Needs clarification** — a point for the user to decide
- **OK** — nothing found; say what was checked

**How to run it.** Pass the reviewer only the requirements, the design, the scope as a command (the diff against the base branch), the aspects above or the project's procedure, and the output format. Do not pass your intent or the conversation. If the user stated a fact the reviewer cannot learn from the repo, pass that one fact. The reviewer reads and runs checks but does not edit, and returns only the report: scope, checks run, then the findings by level with `path:line` and a one-line summary, empty levels omitted.

Fix must-fix items, ask the user about needs-clarification items, then run the review again. If subagents are unavailable, do the review yourself and say so in the report.
