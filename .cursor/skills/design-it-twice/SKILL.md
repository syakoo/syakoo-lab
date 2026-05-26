---
name: design-it-twice
description: >-
  When designing a module or API, run parallel subagents to produce fundamentally
  different options and compare them. The first idea is rarely best—practice "Design It Twice"
  from A Philosophy of Software Design. Use when designing an API, exploring interface shapes,
  or the user mentions "design it twice" or "interface comparison".
---

# Design it twice

The first design is rarely the best. **Place radically different interface options side by side** and learn from the contrast.

Comparison surfaces tradeoffs you will not see from a single sketch.

## When to use

- Choosing a new module, function, or component public API
- Redesigning an existing API
- Stuck on shape ("how should this look?")

Do **not** use for internal optimization without API changes, or when the framework dictates the shape.

## Steps

### 1. Clarify requirements

At minimum:

- **Purpose** in one sentence (if not, scope is too wide)
- **Callers** (other modules, users, tests)
- **Main operations** (CRUD, transform, side effects)
- **Complexity to hide** from callers
- **Constraints** (performance, consistency, compatibility)

Ask: "What does this module do? Who uses it? What should callers not need to know?"

### 2. Generate options in parallel

Launch **3+ subagents at once** via Task with **different design constraints** so options do not converge.

| Agent | Constraint example |
|-------|-------------------|
| A | Minimize method count (1–3) |
| B | Optimize for the most common use case |
| C | Maximize generality for future uses |
| D | Borrow from a specific library or paradigm |

Each agent returns:

1. **Type-level interface** (signatures, args, returns)
2. **Caller example** (real usage)
3. **Hidden complexity**
4. **Tradeoffs** (gains and costs)

### 3. Compare in prose

When all options are ready, compare in **prose, not a flat table**—tables hide the important tradeoffs.

**Angles:**

- **Interface size:** methods, args, things to remember; too small leaks complexity to callers
- **Depth:** work hidden behind the API vs shallow pass-through
- **Misuse resistance:** easy correct use; wrong use caught early?
- **Generality vs focus:** fits today without burdening callers with speculative API

### 4. Synthesize

Do not pick one option blindly—**combine insights** from several.

Ask the user:

- Which option fits the main use case best?
- What would you take from the others?
- Did comparison change what we thought we were building?

The last question matters most.

## Notes

- **Stop at interface design**—implementation comes later.
- **Count alone is not enough**—three similar options fail the exercise; constraints must force difference.
- **Do not rank by implementation cost**—rank by caller experience.
- **Comparison is mandatory**—listing options without contrast is not Design It Twice.
