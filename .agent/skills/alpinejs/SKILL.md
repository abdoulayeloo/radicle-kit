---
name: alpinejs
description: Alpine.js 3.15.x interactivity patterns for Sage themes. Covers directives, magics, Blade escaping, transitions, and common UI patterns like toggles, dropdowns, modals, and tabs.
---

# Alpine.js 3.15.x — Lightweight Interactivity for Blade

## Installation & Setup

### Install via npm

```bash
npm install alpinejs
```

### Initialize in app.js

```javascript
// resources/scripts/app.js
import Alpine from "alpinejs";

window.Alpine = Alpine;
Alpine.start();
```

> **Sage Integration**: Alpine is loaded via Vite. Ensure `resources/scripts/app.js` is an entry point.

---

## Blade Escaping Rule

> 🔴 **CRITICAL**: Use `@{{ }}` (with `@` prefix) to prevent Blade from processing Alpine expressions.

```blade
{{-- ✅ CORRECT — Blade ignores, Alpine processes --}}
<span x-text="@{{ count }}"></span>

{{-- ❌ WRONG — Blade will try to process $count as PHP --}}
<span x-text="{{ count }}"></span>
```

**Alternative**: Use `x-text` / `x-html` directives instead of inline expressions:

```blade
{{-- ✅ Also correct — no template syntax conflict --}}
<span x-data="{ count: 0 }" x-text="count"></span>
```

---

## Core Directives

| Directive      | Purpose              | Example                                    |
| -------------- | -------------------- | ------------------------------------------ |
| `x-data`       | Initialize component | `x-data="{ open: false }"`                 |
| `x-show`       | Toggle visibility    | `x-show="open"`                            |
| `x-if`         | Conditional render   | `<template x-if="show">`                   |
| `x-for`        | Loop                 | `<template x-for="item in items">`         |
| `x-bind`       | Bind attributes      | `x-bind:class="{ 'active': isActive }"`    |
| `x-on`         | Event listener       | `x-on:click="open = !open"` or `@click`    |
| `x-model`      | Two-way binding      | `x-model="search"`                         |
| `x-text`       | Set text content     | `x-text="message"`                         |
| `x-html`       | Set HTML content     | `x-html="richContent"`                     |
| `x-ref`        | Reference element    | `x-ref="input"`                            |
| `x-init`       | Run on init          | `x-init="fetchData()"`                     |
| `x-effect`     | Reactive side effect | `x-effect="console.log(count)"`            |
| `x-transition` | Animate enter/leave  | See transitions section                    |
| `x-cloak`      | Hide until Alpine    | `x-cloak` + `[x-cloak] { display: none; }` |

---

## Magic Properties

| Magic       | Purpose                 | Example                                |
| ----------- | ----------------------- | -------------------------------------- |
| `$el`       | Current element         | `$el.classList.add('active')`          |
| `$refs`     | Access `x-ref` elements | `$refs.input.focus()`                  |
| `$store`    | Global store            | `$store.theme.dark`                    |
| `$watch`    | Watch reactive data     | `$watch('search', val => fetch(val))`  |
| `$dispatch` | Dispatch custom events  | `$dispatch('notify', { message })`     |
| `$nextTick` | Run after DOM update    | `$nextTick(() => $refs.input.focus())` |
| `$id`       | Generate unique IDs     | `$id('dropdown')`                      |

---

## Transitions

```blade
<div
    x-show="open"
    x-transition:enter="transition ease-out duration-200"
    x-transition:enter-start="opacity-0 -translate-y-2"
    x-transition:enter-end="opacity-100 translate-y-0"
    x-transition:leave="transition ease-in duration-150"
    x-transition:leave-start="opacity-100 translate-y-0"
    x-transition:leave-end="opacity-0 -translate-y-2"
>
    {{-- Content --}}
</div>

{{-- Shorthand (uses sensible defaults) --}}
<div x-show="open" x-transition>
    {{-- Content --}}
</div>
```

---

## Common UI Patterns

### Toggle / Hamburger Menu

```blade
<div x-data="{ open: false }">
    <button @click="open = !open" class="btn btn-ghost lg:hidden">
        <x-bi-list x-show="!open" class="w-6 h-6" />
        <x-bi-x-lg x-show="open" class="w-6 h-6" />
    </button>

    <nav x-show="open" x-transition @click.outside="open = false" class="menu">
        @foreach ($navigation as $item)
            <a href="{{ $item->url }}">{{ $item->label }}</a>
        @endforeach
    </nav>
</div>
```

### Dropdown

```blade
<div x-data="{ open: false }" class="relative">
    <button @click="open = !open" class="btn">
        Options <x-bi-chevron-down class="w-4 h-4" />
    </button>

    <ul
        x-show="open"
        x-transition
        @click.outside="open = false"
        class="menu bg-base-100 rounded-box shadow-lg absolute z-50 mt-2 w-52 p-2"
    >
        <li><a href="#">Edit</a></li>
        <li><a href="#">Delete</a></li>
    </ul>
</div>
```

### Modal with Alpine

```blade
<div x-data="{ showModal: false }">
    <button @click="showModal = true" class="btn btn-primary">
        Open Modal
    </button>

    <div
        x-show="showModal"
        x-transition.opacity
        @keydown.escape.window="showModal = false"
        class="modal modal-open"
    >
        <div class="modal-box" @click.outside="showModal = false">
            <h3 class="font-bold text-lg">{{ $title }}</h3>
            <p class="py-4">{{ $content }}</p>
            <div class="modal-action">
                <button @click="showModal = false" class="btn">Close</button>
            </div>
        </div>
    </div>
</div>
```

### Tabs

```blade
<div x-data="{ activeTab: 'tab1' }">
    <div role="tablist" class="tabs tabs-bordered">
        <button
            @click="activeTab = 'tab1'"
            :class="{ 'tab-active': activeTab === 'tab1' }"
            class="tab"
        >
            Tab 1
        </button>
        <button
            @click="activeTab = 'tab2'"
            :class="{ 'tab-active': activeTab === 'tab2' }"
            class="tab"
        >
            Tab 2
        </button>
    </div>

    <div x-show="activeTab === 'tab1'" x-transition>
        {{-- Tab 1 content --}}
    </div>
    <div x-show="activeTab === 'tab2'" x-transition>
        {{-- Tab 2 content --}}
    </div>
</div>
```

### Search / Filter

```blade
<div x-data="{ search: '' }">
    <input
        type="search"
        x-model.debounce.300ms="search"
        placeholder="Search..."
        class="input input-bordered w-full"
    />

    @foreach ($items as $item)
        <div
            x-show="!search || '{{ strtolower($item->title) }}'.includes(search.toLowerCase())"
            x-transition
        >
            <h3>{{ $item->title }}</h3>
        </div>
    @endforeach
</div>
```

### Global Store

```javascript
// resources/scripts/app.js
import Alpine from "alpinejs";

Alpine.store("theme", {
  dark: false,
  toggle() {
    this.dark = !this.dark;
    document.documentElement.classList.toggle("dark", this.dark);
  },
});

Alpine.start();
```

```blade
<button @click="$store.theme.toggle()" class="btn btn-ghost">
    <x-bi-sun x-show="!$store.theme.dark" class="w-5 h-5" />
    <x-bi-moon x-show="$store.theme.dark" class="w-5 h-5" />
</button>
```

---

## Anti-Patterns

| ❌ Avoid                                       | ✅ Prefer                                         |
| ---------------------------------------------- | ------------------------------------------------- |
| `{{ }}` for Alpine expressions in Blade        | `@{{ }}` or `x-text` / `x-bind` directives        |
| Complex logic in `x-data`                      | Extract to Alpine components or `$store`          |
| jQuery alongside Alpine                        | Replace jQuery with Alpine equivalents            |
| Heavy DOM manipulation                         | Use reactive data + `x-show` / `x-if`             |
| Missing `x-cloak` on initially hidden elements | Add `x-cloak` + CSS `[x-cloak] { display: none }` |
| Inline `<script>` for interactivity            | Use Alpine directives in Blade                    |
