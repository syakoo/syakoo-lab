---
name: suggest-improvement
description: >-
  Propose codifying reusable lessons from trial-and-error or explicit user
  requests into lint, rules, or skills. Use near task completion after failed
  first attempts, or when the user asks to "make it a rule" or "leave a lesson".
  NOT for empirically testing instructions on fresh agents (tune-prompt) or
  drafting a new skill without a lesson to codify.
---

# Suggest improvement

When a task finishes, extract **"if we had known this upfront, we would not have taken the detour"** and make it reusable. Lessons learned through trial and error are especially worth codifying.

## When to use

- Near task completion after trial-and-error, or when asked to "leave a lesson" / "make it a rule"
- After an initial attempt failed and you reached a solution through iteration
- When similar work is likely to happen again

Do **not** use when:

- The task succeeded on the first try with nothing to extract
- A one-off, project-specific fix (a commit message is enough)

## Steps

### 1. Pair failure and success

Write:

- **First attempt**: what you tried and how it failed
- **Final solution**: what actually worked
- **Bridge insight**: why the first attempt could not reach the solution

### 2. State what should have been known upfront

Condense to 1–3 sentences as **instructions to future you**. Prefer imperatives: "do not …", "check … first".

### 3. Classify the output

| Criterion | Destination | Example |
|-----------|-------------|---------|
| Detectable mechanically at syntax level | Lint (ESLint, ast-grep, etc.) | Use `set.size` instead of `Array.from(set).length` |
| One short line, always on, no judgment | Agent config (global or project) | "Use pnpm v10+" |
| Procedure, context, templates | New or existing skill | "How to write MoonBit C bindings" |
| One-off project-specific | Skip (commit/PR is enough) | — |

**Principle: if lint can catch it, do not put it in prose.** Agents ignore natural-language duplicates of static checks.

"Agent config" varies by tool (Cursor: `.cursor/rules/`, Claude Code: `CLAUDE.md`, etc.). Match this project.

### 4. Duplicate check (required)

Before proposing, search existing knowledge. Prefer **append** over **new** when similar content exists.

Extract 2–3 keywords and search:

- Global skill dirs (`~/.cursor/skills/`, `~/.claude/skills/`, etc.)
- Project agent config (`.cursor/rules/`, `CLAUDE.md`, etc.)
- Lint config

Classify:

- **New**: no hit → normal proposal
- **Append**: related rule/skill exists and new info complements it
- **Duplicate**: already fully covered → no proposal (record the duplicate check only)
- **Unclear**: cannot decide → ask the user

### 5. Prepare proposal text

Prepare content as **text only**—do not write files yet (step 7 writes after approval).

**Lint:** include rule definition and valid/invalid test cases.

**Agent config:** add brief rationale in parentheses.

```markdown
- Use pnpm v10 or newer (lockfile format differs on v9 and below, causing CI drift)
```

**Skill:** frontmatter + when to use + steps + caveats, matching existing skill style.

### 6. Get user approval

Show the proposal and wait for approval. **Do not edit agent config or skills without approval.** If rejected, keep notes in the session only.

### 7. Commit on a separate branch

After approval, create a **branch separate from main work** and write files only there.

Stash **only if** the working tree has changes (tracked, staged, or untracked). If the tree is clean, do not run `git stash`—a no-op stash can make a later blind `git stash pop` restore the wrong entry.

```bash
ORIGINAL_BRANCH=$(git branch --show-current)

if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; then
  git stash push -u -m "suggest-improvement: before improvement branch"
fi

git fetch origin && git checkout -b cursor/improve-<short-lesson-name> origin/main

# Apply approved changes (lint / agent config / skill)
# ... edit files ...

git add <files>
git commit -m "<short improvement message>"
```

### 8. Open a PR and return to the original branch

```bash
git push -u origin HEAD
```

After push, create a PR per `create-pull-request`. In **Problem**, note codifying a lesson from the task; in **Solution**, include the retrospective summary.

Then return:

```bash
git checkout "$ORIGINAL_BRANCH"
```

Run `git stash pop` **only if** you stashed before creating the improvement branch.

## Presentation format

```markdown
## Retrospective

- First failure: <one line>
- Final solution: <one line>
- Insight: <one line>

## Proposal

Candidates:
- [lint] <rule name>: <one line>
- [skill append] <existing skill>: <one line>
- [skill new] <skill name>: <one line>
- [rule] agent config (global/project): <one line>

Duplicate (no proposal):
- <existing skill/rule> already covers this → no addition

Declined:
- <one-line reason> (e.g. project-specific / hard to express in lint / absorbed elsewhere)

Reply with item numbers or names to adopt. "No proposal" is valid.
```

For multiple lessons, use multiple retrospective blocks and tag proposal lines with "from lesson N". Omit empty sections.

## Notes

- **Do not skip describing failure.** Solution-only notes invite the same trap.
- **Avoid overly specific grains.** Abstract to "what to verify", not raw version numbers.
- **Do not write without approval.**
- **Zero proposals is valid.** Do not invent thin lessons.
- **Do not dirty the main feature branch.** Stash if needed, branch, PR, then return.
