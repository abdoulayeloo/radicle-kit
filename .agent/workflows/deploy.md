---
description: Deploy WordPress site via Trellis or Mina
---

# /deploy — Production Deployment Flow

## How to Use

```
/deploy [environment]
```

Examples:

- `/deploy staging`
- `/deploy production`

## Workflow

### Pre-Deployment Checklist

```markdown
- [ ] All changes committed and pushed
- [ ] Tests passing
- [ ] Build succeeds (`npx vite build`)
- [ ] No WP_DEBUG errors
- [ ] Database migrations run (if any)
- [ ] Vault encrypted (Trellis)
- [ ] Backup exists for current production
```

### Deployment Platform Detection

```
→ Activate: @devops-engineer
→ Detect deployment method:
   - trellis/ exists → Trellis deployment
   - config/deploy.rb exists → Mina deployment
   - deploy.php exists → Deployer deployment
   - None detected → Ask user
```

### Phase 1: Pre-Flight

```bash
# Trellis
trellis check production

# Mina
mina deploy -t staging -- check
```

### Phase 2: Build Assets

```bash
# Local build (if required)
cd web/app/themes/theme-name
npm ci
npx vite build
```

### Phase 3: Deploy

```bash
# Trellis
trellis deploy production

# Mina
mina deploy

# Deployer
dep deploy production
```

### Phase 4: Post-Deploy Verification

```markdown
- [ ] Site loads correctly
- [ ] No 500 errors
- [ ] SSL working
- [ ] Forms submitting
- [ ] Critical pages render
```

### Phase 5: Rollback (If Needed)

```bash
# Trellis
trellis rollback production

# Mina
mina rollback
```

### Output Format

```markdown
## 🚀 Deployment: [Environment]

### Status: ✅ Success / ❌ Failed

### Details

| Step       | Status |
| ---------- | ------ |
| Pre-flight | ✅     |
| Build      | ✅     |
| Deploy     | ✅     |
| Verify     | ✅     |

### Next Steps

- [ ] Monitor error logs for 30 minutes
- [ ] Verify critical user flows
```

> ⚠️ **SAFETY RULE**: Never deploy on Friday afternoon. Never deploy without a backup. Never skip pre-flight checks.
