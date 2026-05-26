---
name: create-github-issue
description: >-
  Draft GitHub issue titles and bodies for this repository using
  `.github/ISSUE_TEMPLATE` form definitions. Use when opening or preparing a
  GitHub issue or feature request (e.g. "open an issue", "機能要望").
---

# Create GitHub issue (template-aligned)

## Prerequisite

**Repository YAML templates are the source of truth.** Before drafting, read `*.yml` under `.github/ISSUE_TEMPLATE/` for field names, required fields, and placeholders. Same process when templates are added.

## Section headings

Section headings in issue bodies must **match the template `label` values exactly**. Write prose inside sections in English by default, unless the user explicitly requests another language.

Current labels for feature requests:

| Template field | Heading in body |
|----------------|-----------------|
| `background` | `## Background & purpose` |
| `requirements` | `## Requirements & details` |
| `acceptance_criteria` | `## Acceptance criteria` |

## Current template summary (`feature_request.yml`)

| Item | Rule |
|------|------|
| Title | Short, descriptive; no prefix required |
| Labels | Template has `labels: []`; do not add labels unless the user asks |
| Body | Use the heading order below |

## Body format (feature request)

```markdown
## Background & purpose

(Required. Background and purpose per the template.)

## Requirements & details

(Required. Bullet list is fine; be specific about desired behavior.)

## Acceptance criteria

(Optional. Verifiable done criteria; checklist preferred.)
```

- **Background & purpose** and **Requirements & details** must not be empty.
- **Acceptance criteria** is optional in the template; propose checklist items unless the user says they are not needed.

## Workflow

1. Read the relevant `*.yml` under `.github/ISSUE_TEMPLATE/`.
2. Confirm the intent is a feature request. If another issue type is needed and no template exists, ask whether to add a template or use a free-form issue.
3. Draft title and body in the format above.
4. For vague requests, ask clarifying questions before filling in guesses.

## Creating on GitHub

- **Browser:** Issues → New issue → choose **Feature request** → paste into fields (by section or paragraph).
- **CLI:** `gh issue create --title "..." --body "..."` or `--body-file` for multiline bodies.

## Quality bar

- Background: **who**, **when**, **why** it hurts
- Requirements: observable behavior or UI—not vague "make it better"
- Acceptance criteria: verifiable (`- [ ]` checkboxes work well)
