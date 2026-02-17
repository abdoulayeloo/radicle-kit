# Radicle Kit Architecture

> AI Agent Toolkit for the Roots.io Stack (Bedrock · Radicle · Acorn · Trellis · Vite)

---

## 📋 Overview

Radicle Kit is a modular AI agent system consisting of:

- **16 Specialist Agents** - Role-based AI personas for the PHP/WordPress/Laravel ecosystem
- **18 Skills** - Domain-specific knowledge modules
- **8 Workflows** - Slash command procedures

---

## 🏗️ Directory Structure

```plaintext
.agent/
├── ARCHITECTURE.md          # This file
├── agents/                  # 16 Specialist Agents
├── skills/                  # 18 Skills
├── workflows/               # 8 Slash Commands
└── rules/                   # Global Rules
```

---

## 🤖 Agents (16)

Specialist AI personas for the Roots.io ecosystem.

| Agent                    | Focus                        | Skills Used                                            |
| ------------------------ | ---------------------------- | ------------------------------------------------------ |
| `orchestrator`           | Multi-agent coordination     | intelligent-routing, plan-writing, brainstorming       |
| `project-planner`        | Discovery, task planning     | brainstorming, plan-writing                            |
| `blade-specialist`       | Blade, View Composers, Vite  | blade-patterns, radicle-development, clean-code        |
| `laravel-specialist`     | Acorn, Service Providers, DI | laravel-patterns, clean-code                           |
| `wordpress-specialist`   | Hooks, CPT, WP_Query, REST   | wordpress-patterns, clean-code                         |
| `database-architect`     | WordPress DB, Eloquent       | database-design, clean-code                            |
| `devops-engineer`        | Trellis, Mina, Bedrock       | trellis-deployment, mina-deployment, bedrock-structure |
| `security-auditor`       | WordPress & Laravel security | security-fundamentals, wordpress-patterns              |
| `test-engineer`          | PestPHP, PHPUnit, Cypress    | testing-patterns, clean-code                           |
| `debugger`               | Query Monitor, Xdebug        | systematic-debugging, clean-code                       |
| `performance-optimizer`  | Object cache, queries, Vite  | performance-profiling, clean-code                      |
| `seo-specialist`         | WordPress SEO, schema markup | seo-fundamentals                                       |
| `documentation-writer`   | Roots.io documentation       | clean-code                                             |
| `explorer-agent`         | Codebase analysis            | bedrock-structure, radicle-development                 |
| `acf-specialist`         | ACF field groups, blocks     | acf-patterns, blade-patterns                           |
| `woocommerce-specialist` | Products, orders, WC hooks   | wordpress-patterns, laravel-patterns                   |

---

## 🧩 Skills (18)

Modular knowledge domains that agents can load on-demand.

### Frontend & Templating

| Skill                 | Description                                   |
| --------------------- | --------------------------------------------- |
| `blade-patterns`      | Blade directives, components, View Composers  |
| `radicle-development` | Radicle theme structure, `app/`, `resources/` |
| `acf-patterns`        | ACF field groups, Flexible Content, blocks    |

### Backend & PHP

| Skill                | Description                                |
| -------------------- | ------------------------------------------ |
| `laravel-patterns`   | Service Providers, Facades, DI, Middleware |
| `wordpress-patterns` | Hooks, WP_Query, CPT, taxonomies, REST API |

### Database

| Skill             | Description                               |
| ----------------- | ----------------------------------------- |
| `database-design` | `wp_` tables, Eloquent models, Migrations |

### Infrastructure & Deployment

| Skill                | Description                               |
| -------------------- | ----------------------------------------- |
| `bedrock-structure`  | Bedrock project structure, Composer, .env |
| `trellis-deployment` | Ansible roles, vault, provisioning        |
| `mina-deployment`    | Mina recipes, Deployer                    |

### Testing & Quality

| Skill              | Description                        |
| ------------------ | ---------------------------------- |
| `testing-patterns` | PestPHP, PHPUnit, Brain Monkey     |
| `clean-code`       | PSR-12, WordPress Coding Standards |

### Security

| Skill                   | Description                           |
| ----------------------- | ------------------------------------- |
| `security-fundamentals` | Nonces, escaping, sanitization, OWASP |

### Performance & SEO

| Skill                   | Description                             |
| ----------------------- | --------------------------------------- |
| `performance-profiling` | Query Monitor, object cache, transients |
| `seo-fundamentals`      | WordPress SEO, structured data          |

### Debugging

| Skill                  | Description                     |
| ---------------------- | ------------------------------- |
| `systematic-debugging` | WP_DEBUG, Query Monitor, Xdebug |

### Architecture & Planning

| Skill           | Description              |
| --------------- | ------------------------ |
| `plan-writing`  | Task planning, breakdown |
| `brainstorming` | Socratic questioning     |

### Agent Coordination

| Skill                 | Description                      |
| --------------------- | -------------------------------- |
| `intelligent-routing` | Automatic agent selection matrix |

---

## 🔄 Workflows (8)

Slash command procedures. Invoke with `/command`.

| Command       | Description             |
| ------------- | ----------------------- |
| `/brainstorm` | Socratic discovery      |
| `/create`     | Create new features     |
| `/debug`      | Debug WordPress/PHP     |
| `/deploy`     | Deploy via Trellis/Mina |
| `/enhance`    | Improve existing code   |
| `/plan`       | Task breakdown          |
| `/status`     | Project health check    |
| `/test`       | Run PestPHP/PHPUnit     |

---

## 🎯 Skill Loading Protocol

```plaintext
User Request → Skill Description Match → Load SKILL.md
                                            ↓
                                    Read references/
                                            ↓
                                    Apply Principles
```

### Skill Structure

```plaintext
skill-name/
├── SKILL.md           # (Required) Metadata & instructions
├── references/        # (Optional) Templates, docs
└── examples/          # (Optional) Code examples
```

---

## 📊 Statistics

| Metric              | Value                                  |
| ------------------- | -------------------------------------- |
| **Total Agents**    | 16                                     |
| **Total Skills**    | 18                                     |
| **Total Workflows** | 8                                      |
| **Stack**           | PHP 8.2+ / WordPress / Laravel / Blade |
| **Coverage**        | Full Roots.io ecosystem                |

---

## 🔗 Quick Reference

| Need        | Agent                    | Skills                               |
| ----------- | ------------------------ | ------------------------------------ |
| Blade/Theme | `blade-specialist`       | blade-patterns, radicle-development  |
| PHP/Acorn   | `laravel-specialist`     | laravel-patterns                     |
| WordPress   | `wordpress-specialist`   | wordpress-patterns                   |
| Database    | `database-architect`     | database-design                      |
| ACF         | `acf-specialist`         | acf-patterns, blade-patterns         |
| WooCommerce | `woocommerce-specialist` | wordpress-patterns, laravel-patterns |
| Security    | `security-auditor`       | security-fundamentals                |
| Testing     | `test-engineer`          | testing-patterns                     |
| Debug       | `debugger`               | systematic-debugging                 |
| Deploy      | `devops-engineer`        | trellis-deployment, mina-deployment  |
| SEO         | `seo-specialist`         | seo-fundamentals                     |
| Performance | `performance-optimizer`  | performance-profiling                |
| Plan        | `project-planner`        | brainstorming, plan-writing          |
