---
name: daisyui-v5
description: DaisyUI v5 component library patterns for Sage themes. Covers component classes, theming, responsive layouts, and Blade component integration.
---

# DaisyUI v5 — Component Library for TailwindCSS

## Installation & Setup

### Install via npm

```bash
npm install daisyui@5
```

### CSS Configuration

```css
/* resources/styles/app.css */
@import "tailwindcss";
@plugin "daisyui";
```

> **v5 Breaking Change**: Use `@plugin "daisyui"` instead of config-based plugin registration.

### Theme Selection

```css
@plugin "daisyui" {
  themes:
    light --default,
    dark --prefersdark,
    corporate;
}
```

---

## Component Reference

### Buttons

```blade
<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-outline btn-primary">Outlined</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-link">Link</button>

{{-- Sizes --}}
<button class="btn btn-xs">Tiny</button>
<button class="btn btn-sm">Small</button>
<button class="btn btn-md">Medium</button>
<button class="btn btn-lg">Large</button>

{{-- States --}}
<button class="btn btn-primary" disabled>Disabled</button>
<button class="btn btn-primary"><span class="loading loading-spinner"></span> Loading</button>
```

### Cards

```blade
<div class="card bg-base-100 shadow-xl">
    @if ($image)
        <figure>
            <img src="{{ $image }}" alt="{{ $title }}" />
        </figure>
    @endif
    <div class="card-body">
        <h2 class="card-title">{{ $title }}</h2>
        <p>{{ $excerpt }}</p>
        <div class="card-actions justify-end">
            <a href="{{ $url }}" class="btn btn-primary btn-sm">Read More</a>
        </div>
    </div>
</div>
```

### Navbar

```blade
<div class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
        <a class="btn btn-ghost text-xl" href="{{ home_url() }}">
            {{ $siteName }}
        </a>
    </div>
    <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
            @foreach ($navigation as $item)
                <li><a href="{{ $item->url }}">{{ $item->label }}</a></li>
            @endforeach
        </ul>
    </div>
    <div class="navbar-end">
        <a class="btn btn-primary" href="{{ $ctaUrl }}">{{ $ctaLabel }}</a>
    </div>
</div>
```

### Modal / Dialog

```blade
<button class="btn btn-primary" onclick="my_modal.showModal()">
    Open Modal
</button>

<dialog id="my_modal" class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">{{ $title }}</h3>
        <p class="py-4">{{ $content }}</p>
        <div class="modal-action">
            <form method="dialog">
                <button class="btn">Close</button>
            </form>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
```

### Drawer (Sidebar)

```blade
<div class="drawer lg:drawer-open">
    <input id="app-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
        {{-- Main content --}}
        <label for="app-drawer" class="btn btn-ghost drawer-button lg:hidden">
            <x-bi-list class="w-6 h-6" />
        </label>
        @yield('content')
    </div>
    <div class="drawer-side">
        <label for="app-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu bg-base-200 min-h-full w-80 p-4">
            @foreach ($sidebarItems as $item)
                <li><a href="{{ $item->url }}">{{ $item->label }}</a></li>
            @endforeach
        </ul>
    </div>
</div>
```

### Tabs

```blade
<div role="tablist" class="tabs tabs-bordered">
    <a role="tab" class="tab tab-active">Tab 1</a>
    <a role="tab" class="tab">Tab 2</a>
    <a role="tab" class="tab">Tab 3</a>
</div>
```

### Alert / Toast

```blade
<div class="alert alert-info">
    <x-bi-info-circle class="w-5 h-5" />
    <span>{{ $message }}</span>
</div>

{{-- Toast positioning --}}
<div class="toast toast-end">
    <div class="alert alert-success">
        <span>{{ $notification }}</span>
    </div>
</div>
```

---

## Common Components Table

| Component   | Classes                        | Notes                  |
| ----------- | ------------------------------ | ---------------------- |
| Button      | `btn btn-{color} btn-{size}`   | Colors: primary, etc.  |
| Card        | `card`, `card-body`            | Wrap with `shadow-xl`  |
| Modal       | `modal`, `modal-box`           | Use `<dialog>` element |
| Navbar      | `navbar`, `navbar-start/end`   | Responsive by default  |
| Drawer      | `drawer`, `drawer-side`        | Sidebar layout         |
| Menu        | `menu`, `menu-horizontal`      | Navigation items       |
| Badge       | `badge badge-{color}`          | Status indicators      |
| Avatar      | `avatar`                       | User images            |
| Hero        | `hero`, `hero-content`         | Landing sections       |
| Footer      | `footer`                       | Site footer            |
| Table       | `table`, `table-zebra`         | Data tables            |
| Tabs        | `tabs tabs-bordered`           | Tabbed navigation      |
| Collapse    | `collapse collapse-arrow`      | Accordion / FAQ        |
| Progress    | `progress progress-primary`    | Progress bars          |
| Loading     | `loading loading-spinner`      | Loading indicators     |
| Breadcrumbs | `breadcrumbs`                  | Navigation path        |
| Pagination  | `join` + `btn`                 | Page navigation        |
| Dropdown    | `dropdown`, `dropdown-content` | Menus, selects         |

---

## Theme Customization

```css
@plugin "daisyui" {
  themes: light --default, dark --prefersdark,
    mytheme --custom {
    --color-primary: #1e40af;
    --color-secondary: #9333ea;
    --color-accent: #f59e0b;
    --color-neutral: #1f2937;
    --color-base-100: #ffffff;
    --radius-selector: 0.5rem;
  }
}
```

---

## Blade Component Integration

Create reusable Blade components wrapping DaisyUI classes:

```blade
{{-- resources/views/components/ui/button.blade.php --}}
@props([
    'variant' => 'primary',
    'size' => 'md',
    'outline' => false,
])

<button
    {{ $attributes->merge([
        'class' => implode(' ', array_filter([
            'btn',
            "btn-{$variant}",
            "btn-{$size}",
            $outline ? 'btn-outline' : null,
        ])),
    ]) }}
>
    {{ $slot }}
</button>
```

Usage:

```blade
<x-ui.button variant="primary" size="lg">Submit</x-ui.button>
<x-ui.button variant="secondary" outline>Cancel</x-ui.button>
```

---

## Anti-Patterns

| ❌ Avoid                             | ✅ Prefer                                 |
| ------------------------------------ | ----------------------------------------- |
| Mixing DaisyUI + raw Tailwind styles | Use DaisyUI components as the base layer  |
| Inline JavaScript for modals         | Use `<dialog>` + `showModal()` API        |
| Ignoring theme system                | Define custom themes via `@plugin` config |
| Hardcoding colors in components      | Use semantic names (primary, secondary)   |
| Creating custom CSS for buttons      | Use `btn btn-{variant}` classes           |
