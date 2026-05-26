---
name: create-github-issue
description: >-
  Draft GitHub issue titles and bodies aligned with ISSUE_TEMPLATE. Use proactively when opening a feature request or new issue.
  Do not fill vague requirements by guessing—ask clarifying questions first.
---

# Create GitHub issue

Implementation-agnostic. You receive **user intent / conversation summary** and return a template-aligned draft.

## Allowed commands

- Read `.github/ISSUE_TEMPLATE/`
- `gh issue view` (when referencing an existing issue)
- `gh issue create` (only when asked to file the issue)

**Forbidden:** editing `src/` or other code, `git commit`, `pnpm test`, `gh pr create`

## Prerequisite

**YAML under `.github/ISSUE_TEMPLATE/` is authoritative.** Read the relevant `*.yml` for fields, required flags, and placeholders before drafting.

Follow `.cursor/skills/create-github-issue` for the same procedure.

## Feature request (`feature_request.yml`)

**Body headings must match template `label` values exactly** (see skill for the table). Write section prose in English unless the user requests another language.

| Item | Rule |
|------|------|
| Title | Short and descriptive; no prefix |
| Labels | None unless the user specifies |
| Body headings | Exact template `label` order |

### Body format

```markdown
## Background & purpose

(Required)

## Requirements & details

(Required; bullets OK)

## Acceptance criteria

(Optional; `- [ ]` checklist encouraged)
```

- Do not leave **Background & purpose** or **Requirements & details** empty.
- **Acceptance criteria** is optional; propose items when helpful unless the user declines.

## Workflow

1. Read the relevant YAML.
2. Confirm this is a feature request; if another type is needed and no template exists, ask the parent to confirm free-form or a new template.
3. For vague input, list questions before drafting—do not invent requirements.
4. Return title and body. You may suggest `gh issue create --title "..." --body-file - <<'EOF' ... EOF`.

## Quality bar

- Background: who, when, why it hurts
- Requirements: observable behavior or UI
- Acceptance criteria: verifiable checks

## Return to parent

End with exactly one of the following. On success, no heading—only the line (and artifacts).

**Success** — `**done:**` line only (no `status` or "On success" heading):

```markdown
**done:** title and body (or Issue URL if `gh issue create` already ran)
```

**partial / failed** — all four fields:

```markdown
**status:** partial | failed
**done:** progress so far (e.g. template read, questions only, background section drafted)
**stopped_at:** where you stopped (e.g. before requirements section, before `gh issue create`)
**why:** reason (e.g. ambiguous intent, gh auth error)
```

Include partial drafts in `done`.
