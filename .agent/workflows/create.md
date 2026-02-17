---
description: Create new features, components, or views for Bedrock/Radicle projects
---

# /create — Feature Creation Flow

## How to Use

```
/create [what to create]
```

Examples:

- `/create partner archive page`
- `/create ACF block for testimonials`
- `/create WooCommerce checkout field`

## Workflow

### Step 1: Analyze Request

```
→ Activate: Intelligent Routing (@skills/intelligent-routing)
→ Detect domain(s): Blade? ACF? WordPress? WooCommerce?
→ Select specialist agent(s)
```

If request is UNCLEAR, ask the Socratic Gate questions:

1. What exactly should this feature do?
2. What content type is involved? (CPT, page, taxonomy?)
3. What data does it need? (ACF fields, WP_Query, external API?)

### Step 2: Plan

```
→ Activate: @project-planner
→ Create PLAN.md with:
   - Files to create/modify
   - Implementation order (backend → frontend)
   - Data requirements
→ Wait for user approval
```

### Step 3: Build (Sequential Order)

Execute in this order:

1. **Data Layer** → Service Provider, CPT/Taxonomy registration
2. **Logic Layer** → View Composer, Service class
3. **View Layer** → Blade templates, partials
4. **Assets** → CSS, JS if needed
5. **Integration** → Wire everything together

```
→ Activate: Selected specialist agent(s)
→ Follow agent boundary rules
→ Each agent works within their domain
```

### Step 4: Verify

```
→ Check: PHP syntax (lint)
→ Check: Build passes (npx vite build)
→ Check: No WP_DEBUG errors
→ Check: Page renders correctly
```

### Output Format

```markdown
## ✅ Created: [Feature Name]

### Files Created/Modified

| File                                         | Type | Description   |
| -------------------------------------------- | ---- | ------------- |
| `app/View/Composers/Feature.php`             | NEW  | View Composer |
| `resources/views/sections/feature.blade.php` | NEW  | Template      |

### Next Steps

- [ ] Verify in browser
- [ ] Add content via WP admin
```
