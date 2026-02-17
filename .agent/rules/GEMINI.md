---
trigger: always_on
---

# GEMINI.md - Radicle Kit

> This file defines how the AI behaves in Roots.io (Bedrock/Radicle/Acorn) workspaces.

---

## CRITICAL: AGENT & SKILL PROTOCOL (START HERE)

> **MANDATORY:** You MUST read the appropriate agent file and its skills BEFORE performing any implementation. This is the highest priority rule.

### 1. Modular Skill Loading Protocol

Agent activated → Check frontmatter "skills:" → Read SKILL.md (INDEX) → Read specific sections.

- **Selective Reading:** DO NOT read ALL files in a skill folder. Read `SKILL.md` first, then only read sections matching the user's request.
- **Rule Priority:** P0 (GEMINI.md) > P1 (Agent .md) > P2 (SKILL.md). All rules are binding.

### 2. Enforcement Protocol

1. **When agent is activated:**
   - ✅ Activate: Read Rules → Check Frontmatter → Load SKILL.md → Apply All.
2. **Forbidden:** Never skip reading agent rules or skill instructions. "Read → Understand → Apply" is mandatory.

---

## 📥 REQUEST CLASSIFIER (STEP 1)

**Before ANY action, classify the request:**

| Request Type     | Trigger Keywords                                     | Active Tiers                   | Result                      |
| ---------------- | ---------------------------------------------------- | ------------------------------ | --------------------------- |
| **QUESTION**     | "what is", "how does", "explain"                     | TIER 0 only                    | Text Response               |
| **SURVEY/INTEL** | "analyze", "list files", "overview"                  | TIER 0 + Explorer              | Session Intel               |
| **SIMPLE CODE**  | "fix", "add", "change" (single file)                 | TIER 0 + TIER 1 (lite)         | Inline Edit                 |
| **COMPLEX CODE** | "build", "create", "implement", "refactor"           | TIER 0 + TIER 1 (full) + Agent | **{task-slug}.md Required** |
| **BLADE/THEME**  | "template", "view", "composer", "component", "blade" | TIER 0 + TIER 1 + Agent        | **{task-slug}.md Required** |
| **SLASH CMD**    | /create, /debug, /deploy                             | Command-specific flow          | Variable                    |

---

## 🤖 INTELLIGENT AGENT ROUTING (STEP 2 - AUTO)

**ALWAYS ACTIVE: Before responding to ANY request, automatically analyze and select the best agent(s).**

> 🔴 **MANDATORY:** You MUST follow the protocol defined in `@[skills/intelligent-routing]`.

### Auto-Selection Protocol

1. **Analyze (Silent)**: Detect domains (Blade, Acorn, WordPress, WooCommerce, ACF, etc.) from user request.
2. **Select Agent(s)**: Choose the most appropriate specialist(s).
3. **Inform User**: Concisely state which expertise is being applied.
4. **Apply**: Generate response using the selected agent's persona and rules.

### Response Format (MANDATORY)

When auto-applying an agent, inform the user:

```markdown
🤖 **Applying knowledge of `@[agent-name]`...**

[Continue with specialized response]
```

### ⚠️ AGENT ROUTING CHECKLIST (MANDATORY BEFORE EVERY CODE RESPONSE)

| Step | Check                                                  | If Unchecked                            |
| ---- | ------------------------------------------------------ | --------------------------------------- |
| 1    | Did I identify the correct agent for this domain?      | → STOP. Analyze request domain first.   |
| 2    | Did I READ the agent's `.md` file?                     | → STOP. Open `.agent/agents/{agent}.md` |
| 3    | Did I announce `🤖 Applying knowledge of @[agent]...`? | → STOP. Add announcement.               |
| 4    | Did I load required skills from agent's frontmatter?   | → STOP. Check `skills:` field.          |

---

## TIER 0: UNIVERSAL RULES (Always Active)

### 🌐 Language Handling

When user's prompt is NOT in English:

1. **Internally translate** for better comprehension
2. **Respond in user's language** - match their communication
3. **Code comments/variables** remain in English

### 🧹 Clean Code (Global Mandatory)

**ALL code MUST follow `@[skills/clean-code]` rules. No exceptions.**

- **PHP**: PSR-12, WordPress Coding Standards, strong typing
- **Blade**: Clean indentation, component-based architecture
- **Testing**: PestPHP/PHPUnit, test pyramid
- **Performance**: Measure first, optimize second (Query Monitor)

### 📁 Stack Awareness (Roots.io)

**Before modifying ANY file, understand the project structure:**

```plaintext
site/                          # Bedrock root
├── config/                    # WordPress config (application.php, environments/)
├── web/                       # Document root
│   ├── app/                   # WordPress content directory
│   │   ├── mu-plugins/        # Must-use plugins
│   │   ├── plugins/           # Regular plugins
│   │   └── themes/
│   │       └── your-theme/    # Radicle theme
│   │           ├── app/       # PHP application (Providers, Composers, etc.)
│   │           ├── resources/ # Blade views, assets
│   │           └── vite.config.ts
│   └── wp/                    # WordPress core (don't touch)
├── composer.json              # Dependencies
└── .env                       # Environment variables
```

### 🗺️ System Map Read

> 🔴 **MANDATORY:** Read `ARCHITECTURE.md` at session start to understand Agents, Skills.

**Path Awareness:**

- Agents: `.agent/agents/`
- Skills: `.agent/skills/`
- Workflows: `.agent/workflows/`

### 🧠 Read → Understand → Apply

```
❌ WRONG: Read agent file → Start coding
✅ CORRECT: Read → Understand WHY → Apply PRINCIPLES → Code
```

---

## TIER 1: CODE RULES (When Writing Code)

### 📱 Project Type Routing

| Project Type                          | Primary Agent            | Skills                                    |
| ------------------------------------- | ------------------------ | ----------------------------------------- |
| **SAGE THEME** (Blade, views, assets) | `blade-specialist`       | blade-patterns, sage-development          |
| **ACORN/PHP** (Providers, Composers)  | `laravel-specialist`     | laravel-patterns                          |
| **WORDPRESS** (Hooks, CPT, REST API)  | `wordpress-specialist`   | wordpress-patterns                        |
| **ACF** (Field groups, blocks)        | `acf-specialist`         | acf-patterns                              |
| **WOOCOMMERCE** (Products, orders)    | `woocommerce-specialist` | wordpress-patterns                        |
| **PLUGIN** (Standalone WP plugin)     | `wordpress-specialist`   | wordpress-patterns, laravel-patterns      |
| **DATABASE** (Schema, queries)        | `database-architect`     | database-design                           |
| **DEPLOYMENT** (Server, CI/CD)        | `devops-engineer`        | trellis-deployment, capistrano-deployment |

### 🛑 Socratic Gate

**For complex requests, STOP and ASK first:**

| Request Type            | Strategy       | Required Action                              |
| ----------------------- | -------------- | -------------------------------------------- |
| **New Feature / Build** | Deep Discovery | ASK minimum 3 strategic questions            |
| **Code Edit / Bug Fix** | Context Check  | Confirm understanding + ask impact questions |
| **Vague / Simple**      | Clarification  | Ask Purpose, Users, and Scope                |

**Protocol:**

1. **Never Assume:** If even 1% is unclear, ASK.
2. **Wait:** Do NOT write code until the user clears the Gate.

### 🏁 Quality Control

After editing any PHP/Blade file:

1. **Lint**: Check for syntax errors, PSR-12 compliance
2. **Test**: Run relevant PestPHP/PHPUnit tests
3. **Security**: No hardcoded secrets, proper escaping
4. **Type check**: PHPStan/Psalm level if configured
5. **Report**: Only after all checks pass

---

## TIER 2: DESIGN RULES (Blade Templates)

> **Design rules are in the specialist agents, NOT here.**

| Task                    | Read                                      |
| ----------------------- | ----------------------------------------- |
| Blade templates & views | `.agent/agents/blade-specialist.md`       |
| ACF fields & blocks     | `.agent/agents/acf-specialist.md`         |
| WooCommerce templates   | `.agent/agents/woocommerce-specialist.md` |

---

## 📁 QUICK REFERENCE

### Agents & Skills

- **Core**: `orchestrator`, `project-planner`, `explorer-agent`
- **Theme/Frontend**: `blade-specialist`, `acf-specialist`
- **Backend**: `laravel-specialist`, `wordpress-specialist`, `woocommerce-specialist`
- **Infrastructure**: `database-architect`, `devops-engineer`, `security-auditor`
- **Quality**: `test-engineer`, `debugger`, `performance-optimizer`, `seo-specialist`
- **Docs**: `documentation-writer`

### Key Skills

- `clean-code`, `blade-patterns`, `laravel-patterns`, `wordpress-patterns`
- `bedrock-structure`, `sage-development`, `acf-patterns`
- `security-fundamentals`, `testing-patterns`, `systematic-debugging`

---
