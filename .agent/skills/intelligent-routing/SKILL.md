---
name: intelligent-routing
description: Automatic agent selection and intelligent task routing for Roots.io projects. Analyzes user requests and selects the best specialist agent(s) based on keywords and domain detection.
version: 1.0.0
---

# Intelligent Agent Routing — Radicle Kit

**Purpose**: Automatically analyze user requests and route them to the most appropriate specialist agent(s) for the Roots.io ecosystem.

## Core Principle

> **Act as an intelligent Project Manager** — analyze each request and select the best specialist for the job.

## Agent Selection Matrix

| User Intent          | Keywords                                                | Selected Agent(s)                           | Auto-invoke? |
| -------------------- | ------------------------------------------------------- | ------------------------------------------- | ------------ |
| **Blade Template**   | "blade", "view", "template", "partial", "component"     | `blade-specialist`                          | ✅ YES       |
| **View Composer**    | "composer", "data", "with()", "view data"               | `laravel-specialist`                        | ✅ YES       |
| **Service Provider** | "provider", "register", "boot", "service"               | `laravel-specialist`                        | ✅ YES       |
| **WordPress Hook**   | "hook", "filter", "action", "add_action"                | `wordpress-specialist`                      | ✅ YES       |
| **Custom Post Type** | "CPT", "post type", "register_post_type"                | `wordpress-specialist`                      | ✅ YES       |
| **Taxonomy**         | "taxonomy", "term", "category", "tag"                   | `wordpress-specialist`                      | ✅ YES       |
| **REST API**         | "REST", "endpoint", "API", "route"                      | `wordpress-specialist`                      | ✅ YES       |
| **ACF Fields**       | "ACF", "field group", "flexible content", "repeater"    | `acf-specialist`                            | ✅ YES       |
| **ACF Block**        | "block", "Gutenberg", "acf_register_block"              | `acf-specialist`                            | ✅ YES       |
| **WooCommerce**      | "product", "cart", "checkout", "order", "WooCommerce"   | `woocommerce-specialist`                    | ✅ YES       |
| **Database**         | "schema", "migration", "query", "wpdb", "Eloquent"      | `database-architect`                        | ✅ YES       |
| **Authentication**   | "login", "auth", "password", "nonce"                    | `security-auditor` + `wordpress-specialist` | ✅ YES       |
| **Bug Fix**          | "error", "bug", "not working", "broken", "white screen" | `debugger`                                  | ✅ YES       |
| **Testing**          | "test", "PestPHP", "PHPUnit", "coverage"                | `test-engineer`                             | ✅ YES       |
| **Deploy**           | "deploy", "Trellis", "Capistrano", "production"         | `devops-engineer`                           | ✅ YES       |
| **Security**         | "security", "vulnerability", "XSS", "SQL injection"     | `security-auditor`                          | ✅ YES       |
| **Performance**      | "slow", "optimize", "cache", "Query Monitor"            | `performance-optimizer`                     | ✅ YES       |
| **SEO**              | "SEO", "meta", "sitemap", "schema markup", "Yoast"      | `seo-specialist`                            | ✅ YES       |
| **TailwindCSS**      | "tailwind", "css", "utility", "responsive", "dark mode" | `blade-specialist`                          | ✅ YES       |
| **DaisyUI**          | "daisyui", "btn", "card", "modal", "drawer", "navbar"   | `blade-specialist`                          | ✅ YES       |
| **Alpine.js**        | "alpine", "x-data", "x-show", "toggle", "dropdown"      | `blade-specialist`                          | ✅ YES       |
| **Icons**            | "icon", "bootstrap icon", "bi-", "x-bi"                 | `blade-specialist`                          | ✅ YES       |
| **New Feature**      | "build", "create", "implement"                          | `orchestrator` → multi-agent                | ⚠️ ASK FIRST |
| **Complex Task**     | Multiple domains detected                               | `orchestrator` → multi-agent                | ⚠️ ASK FIRST |

## Domain Detection Rules

### Single-Domain → Direct Agent

| Domain            | Patterns                                                   | Agent                    |
| ----------------- | ---------------------------------------------------------- | ------------------------ |
| **Blade/Theme**   | blade, view, template, partial, layout, section, component | `blade-specialist`       |
| **TailwindCSS**   | tailwind, css, utility, responsive, dark mode, @theme      | `blade-specialist`       |
| **DaisyUI**       | daisyui, btn, card, modal, drawer, navbar, badge, hero     | `blade-specialist`       |
| **Alpine.js**     | alpine, x-data, x-show, x-bind, x-on, toggle, dropdown     | `blade-specialist`       |
| **Icons**         | icon, bootstrap icon, bi-, x-bi, svg icon                  | `blade-specialist`       |
| **Laravel/Acorn** | provider, composer, middleware, facade, eloquent, DI       | `laravel-specialist`     |
| **WordPress**     | hook, filter, action, CPT, taxonomy, WP_Query, REST        | `wordpress-specialist`   |
| **ACF**           | acf, field group, repeater, flexible content, block        | `acf-specialist`         |
| **WooCommerce**   | woocommerce, product, cart, checkout, order, payment       | `woocommerce-specialist` |
| **Database**      | database, schema, migration, query, table, index           | `database-architect`     |
| **Testing**       | test, pest, phpunit, mock, coverage, brain monkey          | `test-engineer`          |
| **DevOps**        | deploy, trellis, capistrano, ansible, nginx, CI/CD         | `devops-engineer`        |
| **Debug**         | error, bug, crash, white screen, debug, xdebug             | `debugger`               |
| **Performance**   | slow, cache, transient, optimize, query monitor            | `performance-optimizer`  |
| **SEO**           | seo, meta, snippet, yoast, rankmath, sitemap               | `seo-specialist`         |
| **Security**      | security, nonce, sanitize, escape, vulnerability           | `security-auditor`       |

### Multi-Domain → Orchestrator

If request matches **2+ domains from different categories**, use `orchestrator`:

```
"Create a secure partner page with ACF fields"
→ Detected: ACF + Blade + Security
→ Auto-invoke: orchestrator
→ Orchestrator handles: acf-specialist, blade-specialist, security-auditor
```

## Complexity Assessment

### SIMPLE (Direct agent)

- Single file edit, clear task, one domain
- Example: "Fix the hero section layout"

### MODERATE (2-3 agents, sequential)

- 2-3 files, clear requirements, 2 domains max
- Example: "Add a View Composer for the partner archive"

### COMPLEX (Orchestrator)

- Multiple files/domains, architecture decisions needed
- Example: "Build a WooCommerce product filter with ACF"

## Response Format

```markdown
🤖 **Applying knowledge of `@blade-specialist`...**

[Specialized response]
```

## Rules

1. **Silent Analysis**: Don't announce analysis — just inform agent selection
2. **Inform Selection**: Always tell user which expertise is applied
3. **Override**: User can explicitly mention `@agent-name` to override
4. **Socratic Gate**: Auto-routing does NOT bypass the Socratic Gate
5. **Priority**: GEMINI.md rules > intelligent-routing
