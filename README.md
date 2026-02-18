# @ablayelo/radicle-kit

> 🌱 AI agent army for the Roots.io stack — Bedrock, Radicle, Acorn, Trellis, Vite.

16 specialist agents, 18 skills, and 8 slash-command workflows, all tailored for WordPress development with the Roots.io ecosystem.

## Install

```bash
npm install -g @ablayelo/radicle-kit
```

## Usage

Navigate to your Bedrock/Radicle project root and run:

```bash
radicle-kit
```

This copies the `.agent/` directory into your project. Your AI coding assistant (Gemini, Cursor, Codex, etc.) will automatically pick up the agents, skills, and workflows.

### Overwrite existing

If `.agent/` already exists:

```bash
radicle-kit --force
```

## What's Inside

### 16 Agents

| Agent                    | Domain                                     |
| ------------------------ | ------------------------------------------ |
| `orchestrator`           | Multi-agent coordination                   |
| `project-planner`        | Discovery & task planning                  |
| `blade-specialist`       | Blade templates, View Composers            |
| `laravel-specialist`     | Service Providers, DI, Eloquent            |
| `wordpress-specialist`   | Hooks, CPT, WP_Query, REST API             |
| `acf-specialist`         | ACF field groups, Flexible Content, blocks |
| `woocommerce-specialist` | Products, checkout, WC hooks               |
| `database-architect`     | WordPress DB, Eloquent, migrations         |
| `devops-engineer`        | Trellis, Mina, deployment                  |
| `security-auditor`       | OWASP, nonces, sanitization                |
| `test-engineer`          | PestPHP, PHPUnit, Brain Monkey             |
| `debugger`               | Query Monitor, Xdebug, systematic debug    |
| `performance-optimizer`  | Core Web Vitals, caching                   |
| `seo-specialist`         | Yoast, structured data, GEO                |
| `documentation-writer`   | PHPDoc, README, guides                     |
| `explorer-agent`         | Codebase discovery & analysis              |

### 8 Slash Commands

| Command       | Description                             |
| ------------- | --------------------------------------- |
| `/create`     | Create new features for Bedrock/Radicle |
| `/debug`      | Systematic WordPress/PHP debugging      |
| `/deploy`     | Deploy via Trellis or Mina              |
| `/enhance`    | Improve existing code quality           |
| `/plan`       | Task breakdown & roadmap                |
| `/status`     | Project health check                    |
| `/test`       | Run PestPHP / PHPUnit tests             |
| `/brainstorm` | Discovery & ideation session            |

## License

MIT
