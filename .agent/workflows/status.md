---
description: Project health check — show project structure, dependencies, and issues
---

# /status — Project Health Check

## How to Use

```
/status
```

## Workflow

### Step 1: Scan Project

```
→ Activate: @explorer-agent
→ Identify project type (Bedrock, Sage, Plugin)
→ Read: composer.json, package.json, .env
```

### Step 2: Check Dependencies

```bash
# PHP dependencies
composer outdated --direct

# Node dependencies
npm outdated

# Security audit
composer audit
npm audit
```

### Step 3: Build Check

```bash
# Verify build
npx vite build 2>&1

# Verify PHP
php -l app/**/*.php
```

### Step 4: Generate Report

```markdown
## 📊 Project Status: [Project Name]

### Environment

| Key       | Value |
| --------- | ----- |
| PHP       | 8.x   |
| WordPress | 6.x   |
| Sage      | 10.x  |
| Acorn     | 4.x   |
| Node      | 18.x  |

### Dependencies

| Type | Count | Outdated | Vulnerable |
| ---- | ----- | -------- | ---------- |
| PHP  | XX    | X        | X          |
| Node | XX    | X        | X          |

### Health

| Area          | Status        |
| ------------- | ------------- |
| Build         | ✅ / ❌       |
| PHP Lint      | ✅ / ❌       |
| Tests         | ✅ / ❌       |
| Outdated Deps | ⚠️ X packages |

### Recommendations

1. [Priority action]
2. [Secondary action]
```
