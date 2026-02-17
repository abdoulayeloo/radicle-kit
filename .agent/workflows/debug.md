---
description: Systematic debugging for WordPress and PHP issues
---

# /debug — Systematic Debugging Flow

## How to Use

```
/debug [description of the problem]
```

Examples:

- `/debug partner page shows 0 results`
- `/debug white screen on checkout`
- `/debug 500 error after plugin update`

## Workflow

### Phase 1: Reproduce

```
→ Activate: @debugger
→ Questions:
   1. What is the expected behavior?
   2. What is the actual behavior?
   3. When did it start? (after deploy, plugin update, code change?)
   4. Is it consistent or intermittent?
```

### Phase 2: Isolate

```
→ Check error type → Select investigation path

Fatal Error      → Read stack trace → locate file:line
White Screen     → Enable WP_DEBUG → check debug.log
Wrong Data       → Query Monitor → check DB queries
Missing Styles   → Browser DevTools → check Network tab
404 Everywhere   → Flush permalinks → Settings → Save
Slow Page        → Query Monitor → Queries by Component
```

### Phase 3: Understand (5 Whys)

```
Why is it broken?
→ Why does that happen?
  → Why was that changed?
    → Why wasn't it caught?
      → Root cause identified
```

### Phase 4: Fix & Verify

```
1. Implement fix
2. Verify the specific bug is resolved
3. Verify nothing else broke
4. Add regression test if appropriate
5. Document what happened
```

### Output Format

```markdown
## 🐛 Debug Report: [Issue Title]

### Root Cause

[What caused the issue]

### Fix Applied

[What was changed and why]

### Files Modified

| File       | Change        |
| ---------- | ------------- |
| `file.php` | [Description] |

### Prevention

- [ ] Added regression test
- [ ] Updated documentation
```
