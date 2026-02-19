---
name: bootstrap-icons
description: Bootstrap Icons integration for Sage themes via davidhsianturi/blade-bootstrap-icons. Covers Blade component syntax, sizing, styling, and icon reference.
---

# Bootstrap Icons — Blade Component Integration

## Installation & Setup

### Install via Composer

```bash
composer require davidhsianturi/blade-bootstrap-icons
```

### Publish Configuration (Acorn)

```bash
wp acorn vendor:publish --tag=blade-bootstrap-icons
```

> **Sage/Acorn**: The package auto-registers via Laravel's package discovery. No manual setup needed.

---

## Usage Syntax

### Basic Blade Component

```blade
{{-- Component syntax (recommended) --}}
<x-bi-house />
<x-bi-person />
<x-bi-search />
<x-bi-gear />
<x-bi-envelope />
```

### With Attributes

```blade
{{-- Sizing --}}
<x-bi-house class="w-4 h-4" />   {{-- Small (16px) --}}
<x-bi-house class="w-5 h-5" />   {{-- Medium (20px) --}}
<x-bi-house class="w-6 h-6" />   {{-- Default (24px) --}}
<x-bi-house class="w-8 h-8" />   {{-- Large (32px) --}}
<x-bi-house class="w-12 h-12" /> {{-- Extra large (48px) --}}

{{-- Color --}}
<x-bi-check-circle class="w-5 h-5 text-success" />
<x-bi-exclamation-triangle class="w-5 h-5 text-warning" />
<x-bi-x-circle class="w-5 h-5 text-error" />
<x-bi-info-circle class="w-5 h-5 text-info" />

{{-- Custom color --}}
<x-bi-star-fill class="w-5 h-5 text-primary" />
```

### Accessibility

```blade
{{-- Decorative icon (hidden from screen readers) --}}
<x-bi-arrow-right class="w-4 h-4" aria-hidden="true" />

{{-- Meaningful icon (add label) --}}
<x-bi-telephone class="w-5 h-5" aria-label="Phone number" role="img" />

{{-- Icon + text (icon is decorative) --}}
<a href="/contact" class="btn btn-primary">
    <x-bi-envelope class="w-5 h-5" aria-hidden="true" />
    Contact Us
</a>
```

---

## Common Usage Patterns

### Button with Icon

```blade
<button class="btn btn-primary">
    <x-bi-plus-lg class="w-5 h-5" />
    Add New
</button>

<button class="btn btn-ghost btn-sm">
    <x-bi-pencil class="w-4 h-4" />
    Edit
</button>

<button class="btn btn-error btn-sm">
    <x-bi-trash class="w-4 h-4" />
    Delete
</button>
```

### Navigation with Icons

```blade
<ul class="menu">
    <li>
        <a href="/">
            <x-bi-house class="w-5 h-5" />
            Home
        </a>
    </li>
    <li>
        <a href="/about">
            <x-bi-people class="w-5 h-5" />
            About
        </a>
    </li>
    <li>
        <a href="/contact">
            <x-bi-envelope class="w-5 h-5" />
            Contact
        </a>
    </li>
</ul>
```

### Status Indicators

```blade
@switch($status)
    @case('success')
        <x-bi-check-circle-fill class="w-5 h-5 text-success" />
        @break
    @case('warning')
        <x-bi-exclamation-triangle-fill class="w-5 h-5 text-warning" />
        @break
    @case('error')
        <x-bi-x-circle-fill class="w-5 h-5 text-error" />
        @break
    @default
        <x-bi-info-circle-fill class="w-5 h-5 text-info" />
@endswitch
```

### Social Icons

```blade
<div class="flex gap-3">
    <a href="{{ $facebook }}" aria-label="Facebook" class="btn btn-ghost btn-sm btn-circle">
        <x-bi-facebook class="w-5 h-5" />
    </a>
    <a href="{{ $twitter }}" aria-label="Twitter" class="btn btn-ghost btn-sm btn-circle">
        <x-bi-twitter-x class="w-5 h-5" />
    </a>
    <a href="{{ $instagram }}" aria-label="Instagram" class="btn btn-ghost btn-sm btn-circle">
        <x-bi-instagram class="w-5 h-5" />
    </a>
    <a href="{{ $linkedin }}" aria-label="LinkedIn" class="btn btn-ghost btn-sm btn-circle">
        <x-bi-linkedin class="w-5 h-5" />
    </a>
</div>
```

---

## Common Icons Reference

| Icon Name            | Component                        | Use Case           |
| -------------------- | -------------------------------- | ------------------ |
| House                | `<x-bi-house />`                 | Home / Dashboard   |
| Person               | `<x-bi-person />`                | User / Profile     |
| People               | `<x-bi-people />`                | Team / Groups      |
| Search               | `<x-bi-search />`                | Search             |
| Gear                 | `<x-bi-gear />`                  | Settings           |
| Envelope             | `<x-bi-envelope />`              | Email / Contact    |
| Telephone            | `<x-bi-telephone />`             | Phone              |
| Plus (lg)            | `<x-bi-plus-lg />`               | Add / Create       |
| Pencil               | `<x-bi-pencil />`                | Edit               |
| Trash                | `<x-bi-trash />`                 | Delete             |
| Check Circle         | `<x-bi-check-circle />`          | Success / Confirm  |
| Exclamation Triangle | `<x-bi-exclamation-triangle />`  | Warning            |
| X Circle             | `<x-bi-x-circle />`              | Error / Close      |
| Info Circle          | `<x-bi-info-circle />`           | Information        |
| Arrow Right          | `<x-bi-arrow-right />`           | Navigation / CTA   |
| Chevron Down         | `<x-bi-chevron-down />`          | Dropdown indicator |
| List                 | `<x-bi-list />`                  | Menu / Hamburger   |
| X (lg)               | `<x-bi-x-lg />`                  | Close              |
| Eye                  | `<x-bi-eye />`                   | View / Show        |
| Download             | `<x-bi-download />`              | Download action    |
| Calendar             | `<x-bi-calendar />`              | Dates / Events     |
| Star Fill            | `<x-bi-star-fill />`             | Rating / Favorites |
| Sun / Moon           | `<x-bi-sun />` / `<x-bi-moon />` | Theme toggle       |

> **Full icon list**: [icons.getbootstrap.com](https://icons.getbootstrap.com)

---

## Naming Convention

Icon names follow the pattern: `<x-bi-{icon-name} />`

- Use **kebab-case** for multi-word icons: `<x-bi-arrow-right />`
- Filled variants append `-fill`: `<x-bi-star-fill />`
- The `bi-` prefix is mandatory (package namespace)

---

## Anti-Patterns

| ❌ Avoid                                   | ✅ Prefer                               |
| ------------------------------------------ | --------------------------------------- |
| Inline SVG for standard icons              | Use `<x-bi-icon-name />` components     |
| Font Awesome alongside Bootstrap Icons     | Pick one icon library for consistency   |
| Missing `aria-label` on standalone icons   | Always add accessibility attributes     |
| Hardcoded icon sizes with `width`/`height` | Use Tailwind `w-*` / `h-*` classes      |
| Icons without accompanying text (no label) | Add `aria-label` or visible text nearby |
