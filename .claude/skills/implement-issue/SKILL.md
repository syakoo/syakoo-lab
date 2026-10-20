---
name: implement-issue
description: >-
  Read a GitHub Issue and run branch creation through implementation, commit, and PR.
  Use when the user asks to implement, work on, or execute a GitHub issue
  (e.g. "implement #123", "work on Issue #42").
---

# Implement issue

Concrete steps for the flow in the `ai-workflow` rule (design → implement ↔ self-review until Must fix is clear → PR).

## Workflow

### 1. Read the issue

```bash
gh issue view <number>
```

Understand background, requirements, and acceptance criteria.

### 2. Create a branch

```bash
git fetch origin && git checkout -b claude/<short-description>-<issue-number> origin/main
```

Do not commit directly to `main`.

### 3. Analyze and design

- Read affected code and scope impact
- Decide the approach and break down tasks yourself; the human decides *what* on the issue, not *how*
- If the issue is ambiguous, ask on the issue and stop instead of guessing

### 4. Implement

Execute the tasks. Follow `coding-guide`.

- **Design system first:** before writing layout chrome, use `Row` / `Col` / `Text` / `Link` (and other `shared/design-system` primitives) instead of raw Tailwind `flex` stacks
- **Dependencies:** add a package only when the issue asks for it; removing unused ones is fine. Use `pnpm add` / `pnpm remove` so the lockfile stays in sync. Never hand-edit `package.json` dependencies or `pnpm-lock.yaml`
- **UI → VRT:** if appearance changes, update `__snapshots__/vrt/` in the same PR (see `coding-guide` → Storybook VRT)

### 5. Commit

Prefer **few, reviewable commits** — one logical change per commit
(e.g. feature / fix / baselines / docs), not one commit per tool turn.
On an **unpushed** feature branch, squash noisy WIP with soft reset +
recommit when history is hard to reread. Do not rewrite commits already
on a shared remote tip under active review unless the human asks.

```bash
git add <files>
git commit -m "<message>"
```

- Match recent style: `git log --oneline -10`
- Message focuses on **why**; surprising implementation choices belong here, not in code comments (see `coding-guide` → Comments)
- End with `closes #<issue-number>` when appropriate

### 6. Self-review loop, then push and open a PR

Loop until **Must fix is `None`**:

1. Run **`self-review`** on the current branch diff (hygiene + module depth / design).
2. **Must fix:** apply fixes, commit, go back to step 1.
3. **Needs confirmation:** fix only when you judge it necessary. If not necessary, note a short reason for the PR **Impact and risks** section—do not keep looping on those alone.
4. When Must fix is `None`: push and create the PR per `create-pull-request`.

```bash
git push -u origin HEAD
```

Do not open a PR while Must fix still has items. If Must-fix thrashing (same finding twice with no progress), stop and ask the human.

## Important

- After step 3, **complete steps 4–6 without pausing** for confirmation unless blocked.
- Do not run redesign / deepen passes during step 4—save that for the step 6 self-review loop.
- If hooks time out, increase Shell `timeout` and retry. Do not use `--no-verify`.
