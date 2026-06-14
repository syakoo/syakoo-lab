---
name: propose-feature-issue
description: >-
  Discover UX improvements and new features through structured questions,
  explore a named area (e.g. home page) to propose concrete ideas, draft a
  template-aligned GitHub issue with Proposed approach, and file when intent is
  clear or wait for human review. Use when the user says "improve my home page",
  brainstorms features, asks for UX suggestions, or turns a vague idea into an
  actionable issue for the AI-led workflow.
---

# Propose feature / UX issue

Turn a vague idea—or an AI-discovered improvement—into a **reviewable GitHub issue** that fits the AI-led workflow (`ai-workflow.mdc`): issue → plan review → implement → PR.

This skill owns **discovery and drafting**. Issue formatting follows `create-github-issue`. Implementation follows `implement-issue` after the issue exists and a plan is approved.

## When to use

| Situation | Use this skill |
|-----------|----------------|
| User has a rough UX or feature idea | Yes |
| User names an area but not what to change (e.g. "improve my home page") | Yes — explore that area and propose ideas |
| User asks AI to suggest improvements | Yes — explore and propose options |
| User already gave a complete spec and only wants filing | Use `create-github-issue` instead |
| Issue exists; ready to implement | Use `implement-issue` |

## Example: "I want to improve my home page"

1. **Explore** — Read `src/app/page.tsx`, related widgets (e.g. `src/widgets/home`), Storybook if present, and open issues for that area.
2. **Propose** — Present **1–3 concrete improvements** with trade-offs (not a generic "make it better").
3. **Confirm** — User picks one (or refines). Ask discovery questions only for gaps (priority, out of scope).
4. **Draft & file** — Write the issue (all four sections including **Proposed approach**). File when clear; otherwise show draft first.

Do not implement in the same turn unless the user asks.

## Human checkpoints

1. **After discovery questions** — confirm problem and scope before drafting when anything material is still unknown.
2. **After draft** — if intent, scope, and acceptance criteria are **fully clear**, you may run `gh issue create` without waiting. Otherwise present the draft and wait for approval.
3. **After issue is filed** — `implement-issue` proposes a plan; wait for approval before coding.

The user may always ask to review the draft before filing, even when you would auto-create.

## Phase 1 — Discovery questions

Ask only what is still unknown. Group questions; avoid a long interrogation when the user already answered.

### Core (almost always)

1. **Problem** — What pain or opportunity? Who is affected?
2. **Current vs desired** — What happens today? What should happen instead?
3. **Type** — UX polish on an existing flow, or a new capability?
4. **Scope** — Must-have for v1 vs nice-to-have / out of scope?
5. **Verification** — How will we know it works? (UI state, Storybook, tests, manual steps)

### UX-focused (when relevant)

6. **Context** — Which page, component, or user journey?
7. **Friction** — Extra steps, confusion, missing feedback, accessibility, mobile?
8. **Reference** — Any pattern elsewhere in the app or a product to emulate?

### Feature-focused (when relevant)

9. **Trigger** — What starts the feature? What is the happy path?
10. **Edge cases** — Empty state, errors, permissions, offline?
11. **Dependencies** — APIs, content, or other issues blocking this?

### Prioritization (optional)

12. **Urgency** — Blocker, soon, or backlog?
13. **Trade-offs** — Speed vs polish, breadth vs depth?

For **exploratory requests** (user named an area or asked for ideas): briefly state what you observed, propose options, and ask the user to pick or redirect before drafting.

Skip discovery questions that the chosen option already answers.

## Phase 2 — Explore

| Trigger | Action |
|---------|--------|
| User describes a specific change | Follow their description; explore code only to ground **Proposed approach** |
| User names an area without a specific change (e.g. "improve my home page") | Map area → routes/components; skim UI code and Storybook; check `gh issue list --search "<keyword>" --limit 10`; propose **1–3 options** with trade-offs |
| User asks for ideas with no area | Same as above, starting from main entry points (`src/app/`, primary widgets) |

Let the user pick (or combine) before drafting. Do not invent requirements they did not accept.

## Phase 3 — Draft the issue

Read `.github/ISSUE_TEMPLATE/*.yml` and follow `create-github-issue` for headings and quality bar.

### Required sections

Template fields (headings must match `label` values in `.github/ISSUE_TEMPLATE/`):

```markdown
## Background & purpose

(Who, when, why — user problem and motivation.)

## Requirements & details

(Observable behavior and UI; bullets OK. Separate must-have vs out of scope when useful.)

## Acceptance criteria

(Verifiable `- [ ]` checklist.)

## Proposed approach

(Always include. High-level direction for the later implementation plan — affected layers/slices, UX pattern, risks, alternatives considered. Not a commit-level task list.)
```

Keep **Proposed approach** short. Detailed planning belongs in the `implement-issue` plan comment, after issue approval.

## Phase 4 — Present or file

**When fully clear:** file the issue and return the URL plus a short summary.

**Otherwise**, return:

- **Title** (short, descriptive)
- **Full body** (markdown)
- **Open questions** (if any remain)
- **Suggested next step**: approve to file, or edit sections X/Y

## Phase 5 — File (after approval)

```bash
gh issue create --title "..." --body "$(cat <<'EOF'
...
EOF
)"
```

Return the issue URL. Do not start implementation in the same turn unless the user asks.

## Quality bar

| Section | Good | Avoid |
|---------|------|-------|
| Background | Specific user/job story | "Improve UX" with no scenario |
| Requirements | Testable UI/behavior | Solution disguised as requirement without rationale |
| Acceptance criteria | Checkboxes a reviewer can tick | Subjective "feels better" |
| Proposed approach | Options and constraints | Full code or task breakdown |

## Relationship to other skills

| Skill | Role |
|-------|------|
| `propose-feature-issue` | Discover → draft → human review → file |
| `create-github-issue` | Template formatting when intent is already clear |
| `implement-issue` | Plan → approval → code → PR for an existing issue |

When delegating to the `create-github-issue` subagent, pass a **confirmed summary** (problem, requirements, acceptance criteria), not raw chat logs.
