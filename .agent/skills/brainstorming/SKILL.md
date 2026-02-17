---
name: brainstorming
description: Brainstorming and ideation techniques for Roots.io projects. Feature discovery, architecture decisions, and solution comparison.
---

# Brainstorming — Solution Design

## Brainstorming Triggers

| User Says            | What to Do                                  |
| -------------------- | ------------------------------------------- |
| "I want..."          | Clarify → Options → Pros/Cons → Recommend   |
| "How should I..."    | Research → Compare → Decide                 |
| "Which is better..." | Compare with criteria matrix                |
| "What if..."         | Explore implications → Prototype suggestion |

## Decision Framework

### Option Comparison Table

```markdown
| Criteria            | Option A        | Option B        | Option C            |
| ------------------- | --------------- | --------------- | ------------------- |
| **Dev Effort**      | Low ⭐⭐⭐      | Medium ⭐⭐     | High ⭐             |
| **Performance**     | Good ⭐⭐⭐     | Better ⭐⭐⭐⭐ | Best ⭐⭐⭐⭐⭐     |
| **Maintainability** | High ⭐⭐⭐⭐   | Medium ⭐⭐⭐   | Low ⭐⭐            |
| **WordPress-ness**  | High ⭐⭐⭐⭐⭐ | Medium ⭐⭐⭐   | Low ⭐⭐            |
| **Recommendation**  | ✅ Default      | ⚠️ If needed    | ❌ Over-engineering |
```

## Common Architecture Decisions

| Decision      | Default Choice         | Consider Alternative When                  |
| ------------- | ---------------------- | ------------------------------------------ |
| Data storage  | `wp_postmeta`          | Volume > 10k entries → custom table        |
| Template data | View Composer          | Simple static data → `@include` with props |
| Page layouts  | Flexible Content (ACF) | Simple pages → standard template           |
| API endpoint  | WP REST API            | Internal only → `admin-ajax.php`           |
| Cache layer   | Transients             | Persistent needed → Object Cache           |
| Deployment    | Trellis                | Shared hosting → Capistrano/Deployer       |
| Testing       | PestPHP                | Existing PHPUnit → keep PHPUnit            |

## Feature Discovery Questions

1. **Who** will use this? (Admin, editor, visitor, API consumer?)
2. **What** problem does it solve?
3. **Where** does it live? (Frontend, admin, API, background?)
4. **When** does it run? (Page load, cron, on-demand?)
5. **How** much data? (10 items? 10,000? 100,000?)
6. **What's out of scope?** (Prevent scope creep early)

## Output Format

```markdown
## Brainstorm: [Topic]

### Context

[Brief problem description]

### Options Considered

1. **Option A**: [Description] → Pros/Cons
2. **Option B**: [Description] → Pros/Cons

### Recommendation

**Option [X]** because: [reasoning]

### Next Steps

1. [First action]
2. [Second action]
```
