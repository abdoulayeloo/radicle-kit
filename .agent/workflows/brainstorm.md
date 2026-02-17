---
description: Interactive brainstorming and discovery session for new features or architectural decisions
---

# /brainstorm — Discovery & Ideation Flow

## How to Use

```
/brainstorm [topic or feature idea]
```

## Workflow

### Step 1: Understand the Request

Ask the minimum set of questions to understand the scope:

1. **What** is the goal? (Feature, improvement, exploration?)
2. **Who** is it for? (Visitors, editors, admins, API consumers?)
3. **Where** does it live? (Frontend, admin, both, background?)
4. **What exists today?** (Current implementation, if any)

### Step 2: Research Existing Code

```
→ Activate: @explorer-agent
→ Action: Scan codebase for related patterns
→ Output: Summary of what already exists
```

### Step 3: Generate Options

Present **2-3 realistic options** with a comparison table:

```markdown
| Criteria         | Option A   | Option B   |
| ---------------- | ---------- | ---------- |
| Dev Effort       | ⭐⭐⭐     | ⭐⭐       |
| Performance      | ⭐⭐⭐⭐   | ⭐⭐⭐⭐⭐ |
| Maintainability  | ⭐⭐⭐⭐   | ⭐⭐⭐     |
| WordPress-native | ⭐⭐⭐⭐⭐ | ⭐⭐⭐     |
```

### Step 4: Recommend

- State clear recommendation with reasoning
- Highlight trade-offs
- Ask user to confirm before proceeding

### Step 5: Transition

If approved:

- Generate a PLAN.md (via `/plan`)
- Or go directly to implementation (via `/create`)
