---
name: radicle-development
description: Radicle theme development patterns, directory structure, setup conventions, Vite build tooling, and asset management.
---

# Radicle Development — Theme Framework

## Radicle Directory Structure

```plaintext
theme-name/
├── app/
│   ├── Providers/          # Service Providers (boot, register)
│   ├── View/
│   │   ├── Composers/      # View Composers (data for views)
│   │   └── Components/     # Blade Components (reusable UI)
│   ├── Filters/            # WordPress filter classes
│   ├── Options/            # Theme options / settings
│   ├── setup.php           # Theme setup (supports, menus, sidebars)
│   └── helpers.php         # Helper functions
├── resources/
│   ├── views/              # Blade templates
│   │   ├── layouts/        # Base layouts
│   │   ├── sections/       # Page sections
│   │   ├── partials/       # Reusable partials
│   │   └── components/     # Component views
│   ├── scripts/            # JavaScript (app.js, editor.js)
│   ├── styles/             # CSS/SCSS (app.css, editor.css)
│   └── images/             # Static images
├── public/                 # Compiled assets (don't edit)
├── vite.config.ts          # Vite build configuration
├── composer.json           # PHP dependencies
├── package.json            # Node dependencies
└── tailwind.config.js      # Tailwind (if used)
```

## Theme Setup (app/setup.php)

```php
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', [
        'search-form', 'comment-form', 'comment-list',
        'gallery', 'caption', 'script', 'style',
    ]);

    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'theme'),
        'footer_navigation'  => __('Footer Navigation', 'theme'),
    ]);

    add_image_size('hero', 1920, 800, true);
    add_image_size('card', 600, 400, true);
});
```

## Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
  plugins: [
    laravel({
      input: [
        "resources/styles/app.css",
        "resources/scripts/app.js",
        "resources/styles/editor.css",
        "resources/scripts/editor.js",
      ],
      refresh: true,
    }),
  ],
});
```

## Common Commands

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build

# Composer (PHP dependencies)
composer install
composer require roots/acorn

# Acorn CLI
wp acorn clear:views        # Clear cached Blade views
wp acorn optimize:clear     # Clear all caches
wp acorn vendor:publish     # Publish package configs
```

## Vite Asset Helpers in Blade

```blade
{{-- In your layout --}}
@vite(['resources/styles/app.css', 'resources/scripts/app.js'])
```

## Radicle Conventions

| Convention | Rule                                                          |
| ---------- | ------------------------------------------------------------- |
| Views      | `resources/views/` — always Blade                             |
| Logic      | `app/` — PHP classes only                                     |
| Assets     | `resources/scripts/` + `resources/styles/` — source files     |
| Public     | `public/` — compiled output (gitignored)                      |
| Config     | Root files: `vite.config.ts`, `composer.json`, `package.json` |
| Build      | `npm run dev` / `npm run build` via Vite                      |
