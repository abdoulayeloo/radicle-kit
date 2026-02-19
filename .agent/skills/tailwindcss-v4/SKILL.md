---
name: tailwindcss-v4
description: TailwindCSS v4 utility-first CSS patterns for Sage themes. Covers CSS-first configuration, @theme design tokens, Vite integration, dark mode, and responsive design.
---

# TailwindCSS v4 — Utility-First CSS for Sage

## Installation & Setup

### Install via npm

```bash
npm install tailwindcss @tailwindcss/vite
```

### Vite Configuration

```javascript
// vite.config.js
import tailwindcss from "@tailwindcss/vite";

export default {
  plugins: [tailwindcss()],
};
```

### CSS Entry Point

```css
/* resources/styles/app.css */
@import "tailwindcss";
```

> **v4 Breaking Change**: No `tailwind.config.js` needed. Configuration is CSS-first via `@theme`.

---

## CSS-First Configuration

### Design Tokens with `@theme`

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-primary: #1e40af;
  --color-primary-light: #3b82f6;
  --color-primary-dark: #1e3a8a;
  --color-secondary: #9333ea;
  --color-accent: #f59e0b;

  /* Typography */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Outfit", ui-sans-serif, system-ui, sans-serif;

  /* Spacing */
  --spacing-section: 6rem;
  --spacing-container: 1.5rem;

  /* Border Radius */
  --radius-card: 0.75rem;
  --radius-button: 0.5rem;

  /* Shadows */
  --shadow-card: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-elevated: 0 20px 25px -5px rgb(0 0 0 / 0.1);

  /* Breakpoints */
  --breakpoint-xs: 30rem; /* 480px */
  --breakpoint-sm: 40rem; /* 640px */
  --breakpoint-md: 48rem; /* 768px */
  --breakpoint-lg: 64rem; /* 1024px */
  --breakpoint-xl: 80rem; /* 1280px */
  --breakpoint-2xl: 96rem; /* 1536px */
}
```

### Custom Utilities with `@utility`

```css
@utility container-section {
  max-width: var(--breakpoint-xl);
  margin-inline: auto;
  padding-inline: var(--spacing-container);
}

@utility text-balance {
  text-wrap: balance;
}
```

### Custom Variants with `@variant`

```css
@variant hocus (&:hover, &:focus-visible);
@variant group-hocus (:merge(.group):hover &, :merge(.group):focus-visible &);
```

---

## Dark Mode

```css
@variant dark (&:where(.dark, .dark *));
```

```blade
{{-- Toggle with Alpine.js --}}
<html x-data="{ dark: false }" :class="{ 'dark': dark }">
```

```blade
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <h1 class="text-primary dark:text-primary-light">Title</h1>
</div>
```

---

## Blade Integration Patterns

### Conditional Classes

```blade
<div class="p-4 rounded-card {{ $featured ? 'bg-primary text-white' : 'bg-gray-100' }}">
    {{ $slot }}
</div>
```

### Component with Merged Attributes

```blade
@props([
    'variant' => 'primary',
])

<button
    {{ $attributes->merge([
        'class' => match($variant) {
            'primary' => 'bg-primary text-white hover:bg-primary-dark',
            'secondary' => 'bg-secondary text-white hover:bg-secondary/90',
            'outline' => 'border border-primary text-primary hover:bg-primary/10',
        },
    ]) }}
>
    {{ $slot }}
</button>
```

---

## Responsive Patterns

```blade
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    @foreach ($items as $item)
        <x-card :title="$item->title" :image="$item->thumbnail" />
    @endforeach
</div>
```

### Container Queries

```blade
<div class="@container">
    <div class="flex flex-col @md:flex-row gap-4">
        {{-- Responsive based on container, not viewport --}}
    </div>
</div>
```

---

## Typography & Spacing

### Prose (Typography Plugin)

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

```blade
<div class="prose prose-lg dark:prose-invert max-w-none">
    {!! $content !!}
</div>
```

---

## Migration from v3

| v3 Pattern                  | v4 Equivalent            |
| --------------------------- | ------------------------ |
| `tailwind.config.js`        | `@theme {}` in CSS       |
| `@tailwind base/components` | `@import "tailwindcss"`  |
| `darkMode: 'class'`         | `@variant dark`          |
| `theme.extend.colors`       | `--color-*` in `@theme`  |
| `@apply` (overuse)          | Prefer Blade components  |
| Plugin via config           | `@plugin "package-name"` |

---

## Anti-Patterns

| ❌ Avoid                       | ✅ Prefer                                |
| ------------------------------ | ---------------------------------------- |
| Excessive `@apply` in CSS      | Use Blade components for reusable styles |
| Inline `style=""` attributes   | Tailwind utility classes                 |
| `tailwind.config.js` for v4    | `@theme` in CSS entry point              |
| Hardcoded color hex in classes | Design tokens via `--color-*`            |
| Ignoring dark mode             | Always provide `dark:` variants          |
