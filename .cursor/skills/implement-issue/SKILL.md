---
name: implement-issue
description: >-
  Read a GitHub Issue and run branch creation through implementation, commit, and PR.
  Use when the user asks to implement, work on, or execute a GitHub issue
  (e.g. "implement #123", "work on Issue #42").
---

# Implement issue

Concrete steps for the flow in `ai-workflow.mdc` (plan → approval → implement → PR).

## Workflow

### 1. Read the issue

```bash
gh issue view <number>
```

Understand background, requirements, and acceptance criteria.

### 2. Create a branch

```bash
git fetch origin && git checkout -b cursor/<short-description>-<issue-number> origin/main
```

Do not commit directly to `main`.

### 3. Analyze and propose a plan

- Read affected code and scope impact
- Present an implementation plan and wait for approval
- Ask instead of guessing when unclear

### 4. Implement

After approval, break down tasks and execute. Follow `coding-guide`.

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

### 6. Push and open a PR

```bash
git push -u origin HEAD
```

After push, create the PR per `create-pull-request`.

## Important

- After approval, **complete steps 4–6 without pausing** for confirmation unless blocked.
- If hooks time out, increase Shell `timeout` and retry. Do not use `--no-verify`.
