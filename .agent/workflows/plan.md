---
description: Create structured task breakdown and roadmap for complex features
---

# /plan — Task Planning Flow

## How to Use

```
/plan [feature or task description]
```

Examples:

- `/plan multi-step partner application form`
- `/plan WooCommerce product filter with AJAX`
- `/plan migrate from custom theme to Sage`

## Workflow

### Step 1: Discovery

```
→ Activate: @project-planner
→ Ask discovery questions:
   1. What is the end goal?
   2. What exists today?
   3. What are the constraints? (timeline, budget, tech)
   4. Who needs to approve?
```

### Step 2: Analyze

```
→ Activate: @explorer-agent
→ Scan codebase for:
   - Related existing code
   - Dependencies
   - Potential conflicts
   - Established patterns to follow
```

### Step 3: Create PLAN.md

```
→ Follow @skills/plan-writing format
→ Include:
   - Objective (1 sentence)
   - Files to create/modify
   - Implementation order
   - Testing strategy
   - Risks and mitigations
→ Present to user for approval
```

### Step 4: Transition

Once approved:

- Execute via `/create` for new features
- Execute via `/enhance` for refactors
- Track progress in PLAN.md checkboxes
