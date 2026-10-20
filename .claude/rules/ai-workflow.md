# AI-led development workflow

AI drives implementation; humans focus on quality assurance and final decisions.

## Flow

1. **Human/AI**: Open a request as a GitHub Issue (what — background, requirements, acceptance criteria)
2. **Human**: Read the issue. If it needs discussion, comment and ask Claude to revise it (`@claude address`, `create-github-issue`); repeat until settled. Then decide to implement and ask Claude (`@claude implement`)
3. **AI**: Read the issue with `gh issue view` and work out the design and task breakdown (no separate approval step)
4. **AI**: Implement, pass tests
5. **AI**: Loop `self-review` → fix **Must fix** → re-review until Must fix is clear; optionally fix other notes; then open a PR
6. **AI**: Review the PR on request (`review-pull-request`)
7. **Human**: Review behavior, Storybook, etc., and leave feedback
8. **AI**: Address review feedback on request (`address-pr-review`)
9. **Human**: Re-check and merge

```mermaid
flowchart TD
  A["👤🤖 Issue (what)"] --> M["👤 read issue"]
  M -->|"needs discussion"| N["👤 comment + @claude address"]
  N --> O["🤖 revise issue"]
  O --> M
  M -->|"settled"| C["👤 decide to implement"]
  C --> B["🤖 design"]
  B --> D["🤖 implement"]
  D --> S["🤖 self-review"]
  S -->|"Must fix"| D
  S -->|"Must fix clear"| P["🤖 open PR"]
  P --> E["🤖 review PR"]
  E --> F["👤 review + feedback"]
  F --> G["🤖 address review"]
  G -->|"re-check"| F
  G -->|"OK"| H["👤 merge"]
  H --> J["⚙️ semver:* label → auto bump + GH Release"]
  J --> A
  L["💡 continuous-improvement"] -.separate PR.-> A
  R["🔄 Renovate — dependency PRs (separate)"] -.-> E
```

- Do not implement until the owner asks (`@claude implement` or an explicit instruction). The human decision is made on the issue (what); design (how) is the AI's job.
- If the issue is ambiguous, ask on the issue and stop instead of guessing.
- Do not change beyond the issue's scope.
- Implementation steps: `implement-issue` skill. Layout: `project-structure` skill. Language: English.
- Make it work during implementation; **module depth and design are audited in the `self-review` loop before the PR**, not mid-feature. Do not open a PR while **Must fix** remains. Other self-review notes are optional: fix if useful, or document “not necessary” under Impact and risks.
- Every PR to `main` must carry exactly one `semver:major` / `semver:minor` / `semver:patch` label (CI). On merge, Actions bumps `package.json` and publishes the GitHub Release. `renovate[bot]` defaults to patch.

## Release cycle

**Automated.** Feature/fix/chore PRs declare their semver impact with a label; merging to `main`
is the release. Do not open a dedicated release PR for routine bumps. Distinct from Renovate's
dependency-update PRs (same review path; patch bump by default).

## Subagents

Delegate routine work via the Agent tool. Pass only what the subagent needs.

Delegate only when a step is part of this flow **and** its journey needn't be watched—delegation
just trims context.

| When | Subagent |
|------|----------|
| Create issue | `create-github-issue` |
| Issue discussion | `create-github-issue` (revise) |
| Implement | `implement-issue` |
| Before PR | `self-review` |
| Open PR | `create-pull-request` |
| Review requested | `review-pull-request` |
| Review feedback | `address-pr-review` |

## Triggers

Mention `@claude` on an issue, PR, or PR review (`.github/workflows/claude.yml`). **Only the repository owner can trigger it**; others' mentions are ignored. The mention is the decision to proceed, so write the intent explicitly.

| Comment | Step |
|---------|------|
| `@claude address` on an issue | Revise the issue from its comments (`create-github-issue`); do not implement |
| `@claude implement` on an issue | Design and implement through PR (`implement-issue`) |
| `@claude review` on a PR | `review-pull-request` |
| `@claude address` on a PR or review | `address-pr-review` |

Manual runs in Claude Code (e.g. "implement #123") work the same way.
