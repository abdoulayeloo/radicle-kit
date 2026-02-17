---
description: Improve existing code quality, refactor, or enhance features
---

# /enhance — Code Improvement Flow

## How to Use

```
/enhance [what to improve]
```

Examples:

- `/enhance refactor partner query into a service`
- `/enhance add caching to the hero section`
- `/enhance improve accessibility on navigation`

## Workflow

### Step 1: Analyze Current State

```
→ Activate: @explorer-agent
→ Read the code to improve
→ Identify patterns, anti-patterns, opportunities
```

### Step 2: Plan Enhancement

```
→ Activate: Intelligent Routing
→ Select appropriate specialist
→ Create improvement plan:
   1. What changes
   2. Why (benefit)
   3. Risk assessment
   4. Backward compatibility
```

### Step 3: Implement

```
→ Apply changes following:
   - Clean code standards (@skills/clean-code)
   - Existing project patterns
   - Backward compatibility
```

### Step 4: Verify

```
- [ ] Code passes lint
- [ ] Build succeeds
- [ ] Existing tests still pass
- [ ] No regression
- [ ] Performance not degraded
```

### Output Format

```markdown
## ✨ Enhanced: [What Was Improved]

### Before → After

| Aspect   | Before | After |
| -------- | ------ | ----- |
| [Metric] | [Old]  | [New] |

### Changes

| File       | Change        |
| ---------- | ------------- |
| `file.php` | [Description] |
```
