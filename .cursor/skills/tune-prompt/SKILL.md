---
name: tune-prompt
description: >-
  Empirically test skills, rules, or prompts on fresh agents with scored checklists;
  edit one theme per cycle until instructions land. Use after creating or heavily
  revising agent instructions, when agents misbehave on those instructions, or when
  validating that a skill is followed correctly. NOT for codifying runtime lessons
  after task failures (suggest-improvement) or authoring new skills from scratch
  (create-skill).
---

# Tune prompt

Run the target prompt or skill on a **fresh agent**, find what did not land, and fix it. Evaluate both the executor’s report (where they got stuck) and a requirements checklist. **Do not** self-review the text you just wrote—always use another agent.

## When to use

- Right after creating or heavily revising a skill or prompt
- When agents misbehave and ambiguous instructions may be the cause
- To harden frequently used skills

Do **not** use when:

- One-off disposable prompts (cost > benefit)
- You only want stylistic preference, not quality

## Prerequisites

- You can spawn agents with a **clean context** (Task tool, subagents, etc.). If not, ask the user to run in another chat or report that this skill cannot apply.

## Preparation

### Pre-flight on the target prompt

Before handing off, check **frontmatter `description` vs body**. If description promises A and B but the body only covers A, executors will over-interpret. Align them first.

### Design evaluation scenarios

Plan **2–3** real usage situations:

- **Typical (1):** most common path
- **Edge (1–2):** boundaries or exceptions

One scenario alone overfits. Minimum two.

### Requirements checklist

Per scenario, list **3–7** verifiable requirements. Mark at least one `[critical]`.

```
1. [critical] Output follows the specified format
2. Error cases are considered
3. Code examples run
```

- All `[critical]` pass → success; any fail → failure
- Score = passed items / total (partial = 0.5)

**Fix scenarios and requirements before running.** Do not tune them after seeing results.

## Execution cycle

Repeat until ambiguity is gone.

### 1. Run on a fresh agent

Spawn a **clean-context** agent with:

```
You are an executor reading <prompt name> for the first time.

## Target prompt
<full text or path>

## Scenario
<one paragraph setup>

## Requirements checklist
1. [critical] <item>
2. <item>
3. <item>

## Tasks
1. Follow the prompt for the scenario and produce the artifact.
2. Return this report:

## Report
- Artifact: <output or summary>
- Requirements: ○ / × / partial per item (with reasons)
- Ambiguities: where the prompt blocked you, wording that was unclear
- Discretion: judgments you made that the prompt did not specify
- Retries: how often you redid work and why
```

You may run multiple scenarios in parallel via multiple Tasks in one message.

### 2. Record from the report

Extract:

- **Ambiguities** (hints for edits)
- **Discretion** (implicit spec you should make explicit)
- **Requirements** (○ / × / partial and score)
- **Retries** (signal of vague instructions)
- **Step count** if available; large gaps between scenarios suggest missing explanations

### 3. Edit the prompt

Fix **one theme per cycle**. State which checklist items the change should improve.

- You may batch 2–3 related micro-edits in one cycle
- Defer unrelated fixes to the next cycle

### 4. Continue or stop

**Always use a new agent** for the next cycle (prior executors remember your edits).

- **Continue:** new ambiguities appear
- **Stop:** two consecutive runs with zero new ambiguities and score gain ≤ 3 points
- **Redesign:** 3+ cycles without fewer ambiguities → restructure, not patch
- **Cut off:** ship at ~80% when cost outweighs importance

## Reporting format

```markdown
## Cycle N

### Edits this cycle
- <one line>

### Results
| Scenario | Pass/Fail | Score | Ambiguities | Discretion |
|---|---|---|---|---|
| A | ○ | 90% | 0 | 0 |
| B | × | 60% | 2 | 1 |

### Ambiguity detail
- <Scenario B>: [critical] item N failed — <reason>
- ...

### Discretion detail
- <Scenario B>: <what they invented>

### Next edit
- <one line>

(Convergence: X clear runs in a row / Y cycles until stop)
```

## Notes

- **Never substitute self-review for a fresh agent.**
- **At least two scenarios.**
- **One theme per cycle.**
- **Do not optimize numbers alone**—ambiguities and discretion matter more than score/steps.
- **Do not simplify scenarios** to clear ambiguities—that defeats the purpose.
