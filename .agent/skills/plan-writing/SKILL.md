---
name: plan-writing
description: Structured plan writing for Roots.io projects. Task breakdown, roadmap creation, and PLAN.md format for complex features.
---

# Plan Writing — Structured Project Planning

## When to Write a Plan

| Complexity          | Action                               |
| ------------------- | ------------------------------------ |
| Single file edit    | No plan needed                       |
| 2-3 related files   | Brief outline in response            |
| Multi-file feature  | **PLAN.md required**                 |
| Architecture change | **PLAN.md required + user approval** |

## PLAN.md Template

```markdown
# Feature: [Name]

## Objective

[One-line description of what we're building]

## Discovery Checklist

- [ ] Requirements clearly defined
- [ ] Existing code analyzed
- [ ] Dependencies identified
- [ ] Edge cases considered

## Changes

### [Component 1]

- **File(s)**: `app/View/Composers/NewComposer.php` (NEW)
- **Why**: Provides data for the new section
- **Details**: Queries partners by type, caches for 1 hour

### [Component 2]

- **File(s)**: `resources/views/sections/partners.blade.php` (NEW)
- **Why**: Renders the partner grid
- **Details**: Uses `@forelse` with responsive grid layout

## Implementation Order

1. Create Service/Model (backend dependencies first)
2. Create View Composer (data layer)
3. Create Blade template (presentation)
4. Register Provider/hooks (wiring)
5. Test

## Testing Strategy

- [ ] Unit test for Service logic
- [ ] Feature test for View Composer
- [ ] Manual browser verification

## Risks

- [Risk 1]: [Mitigation]
- [Risk 2]: [Mitigation]
```

## Planning Principles

1. **Dependencies First**: Always plan backend → frontend order
2. **Atomic Commits**: Each step should be a working state
3. **Test Between Steps**: Verify after each major change
4. **User Checkpoints**: Ask for approval at architecture decisions
