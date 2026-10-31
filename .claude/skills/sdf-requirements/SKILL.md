---
description: 'Co-write a requirements document with the user: dig into the why behind a request, check the as-is system, and agree on the experience, scope, and acceptance examples before any design starts. Use when the user brings a feature request, says "let''s define requirements", or before designing a new feature.'
license: MIT
metadata:
    github-path: sdf-requirements
    github-ref: refs/tags/v0.1.2
    github-repo: https://github.com/syakoo/sdf-skills
    github-tree-sha: 3d147ad62c383c7a5b28657d4dee929334270b7c
name: sdf-requirements
---
# Requirements

Agree on **what the user can do and why**, not how it is built. Design comes after, in a separate step.

The user reviews the result. Do not start design until they approve.

## Flow

1. **Read the as-is first.** Look at the code, screens, and data that the request touches. Questions get concrete once you know what exists. If the request is already covered, say so and ask whether to change or extend it.
2. **Dig into the why.** Ask what problem the request solves and for whom. Surface the need behind the ask. Ask one cluster of questions at a time, and propose a default for each so the user can answer "OK". If the need turns out to be met better, or more cheaply, by something other than the solution the user first named, say so and propose one or two alternatives next to the original, each with its trade-off. The user chooses; record the choice and the reason under Decisions.
3. **Draft the document** (below), choosing artifacts by the conditions in the table.
4. **Review with the user.** Fix the draft from their feedback. Record each decision with its reason.
5. **Save and hand off.** Once approved, save the document (see Output). Design can then start in a fresh session by reading it.

## Document

Always include:

| Section | Content |
| --- | --- |
| Why | The problem and the underlying need, in a few lines |
| Goal | What the system must achieve, stated against the as-is |
| Out of scope | What we will not do, so nobody asks "why isn't X there?" later |
| Experience | What the user can do after this change (use case diagram or short list) |
| Acceptance examples | Concrete cases, including what must **not** happen, written as in "Acceptance examples" below |
| Decisions and open questions | Each decision with its reason; what is still undecided |

Add by condition:

| Condition | Artifact |
| --- | --- |
| The feature has state | State transition diagram |
| It talks to an external system | Data flow diagram per use case |
| It has a UI | UI sketch plus display rules (below) |
| A quality matters here (speed, volume, privacy, failure, accessibility, compatibility, cost) | Qualities (below) |

### Acceptance examples

Write each example as one sentence that shows three things: the **trigger** (when), the **state or condition** it applies in (while, if), and the **result** (then). Plain sentences are fine; no fixed phrasing is required. One example should be checkable by one test.

If the project already has a format for requirements or acceptance criteria (such as EARS or Given/When/Then), look for it in the project's `CLAUDE.md` and existing requirements documents, and use it instead.

After writing them, ask of each example:

- **While it lasts:** what happens as time passes, when the data is fetched again, or when the state changes under it?
- **At the edges:** what happens when the input is shorter, longer, or outside the range; spans the edge of the range; is empty; fails; or is still loading?

Add an example for each answer the user cares about. An answer nobody decided is an open question, not something to leave to the design.

### Qualities

Ask which of these the user cares about for this change: speed and volume, access and privacy, failure and offline behavior, accessibility, supported environments, cost. Write only the ones they care about, each as a number or an acceptance example that one test or check can settle (for example "with 100 items the list shows within 1 second"). Ask for a number behind vague wishes like "fast", or drop them. Note the ones deliberately not a concern in one line under Out of scope.

If the project sets quality standards (a performance budget, an accessibility policy), use them. State the promise, not the technique; caching and indexes belong to design.

### UI sketch and display rules

- **Sketch** is for agreeing on the experience with something concrete. Build it as a throwaway prototype (an Artifact works well). Do not fix layout or fine detail here.
- **Display rules** say it in words: under which condition each element is shown, what each action does, and what each input validates. The sketch shows; the rules state exactly.

## Output

Save to `docs/specs/<YYYYMMDD>-<feature>/requirements.md`. If the project's CLAUDE.md names another location for sdf documents, use that instead. The folder name starts with the date the work began (today, when you create it), so each piece of work gets its own folder: for a change that resembles an earlier one, start a new folder instead of editing the old one. Design later adds `design.md` in the same folder, so the folder is the hand-off between sessions.

Start the file with the date and a status (`draft`, `agreed`, `implemented`). After implementation the code is the source of truth for the current behavior; this file stays as the record of what was agreed and why.

Keep the agreed UI sketch reachable: save its HTML next to the document (`sketch/`) and link the published Artifact URL from the document. The saved HTML lets anyone reopen or republish it; the link is the quick way to look.

## Not here

These belong to design, not requirements: DB schema, API interface, module structure, the diff from the as-is, final UI components.

## Principles

- Write what is needed for the reader to review and agree. Drop sections that do not apply.
- Requirements cover sufficiency of the experience, not a proof that every line is necessary.
- If a state-heavy rule is hard to confirm by reading, say so and propose a stronger check (a formal spec tool or a model check) instead of silently trusting prose.
