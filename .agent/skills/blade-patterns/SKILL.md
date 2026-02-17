---
name: blade-patterns
description: Best practices for Blade templating in Radicle themes. Covers directives, components, View Composers, layouts, and the template hierarchy.
---

# Blade Patterns — Radicle Theme Templating

## Blade Directives

### Essential Directives

| Directive             | Purpose                | Example                                     |
| --------------------- | ---------------------- | ------------------------------------------- |
| `@extends`            | Inherit layout         | `@extends('layouts.app')`                   |
| `@section` / `@yield` | Define/output sections | `@section('content')`                       |
| `@include`            | Include partial        | `@include('partials.header')`               |
| `@includeIf`          | Include if exists      | `@includeIf('partials.sidebar')`            |
| `@includeWhen`        | Conditional include    | `@includeWhen($show, 'partials.banner')`    |
| `@component`          | Use Blade component    | `<x-alert type="info" />`                   |
| `@foreach`            | Loop                   | `@foreach ($items as $item)`                |
| `@forelse`            | Loop with empty state  | `@forelse ($items as $item) ... @empty ...` |
| `@if` / `@unless`     | Conditionals           | `@if ($condition)`                          |
| `@php`                | Inline PHP (avoid)     | `@php ... @endphp`                          |

### WordPress-Specific Directives (Radicle)

| Directive                | Purpose              |
| ------------------------ | -------------------- |
| `@query`                 | Start WordPress Loop |
| `@posts`                 | Loop through posts   |
| `@endposts`              | End posts loop       |
| `@hasposts` / `@noposts` | Check if posts exist |
| `@title`                 | Output post title    |
| `@content`               | Output post content  |
| `@excerpt`               | Output post excerpt  |

---

## Template Hierarchy in Radicle

```plaintext
WordPress request
  └── Radicle template (Blade)
        ├── page.blade.php         → All pages
        ├── page-{slug}.blade.php  → Specific page by slug
        ├── single.blade.php       → All single posts
        ├── single-{cpt}.blade.php → Specific CPT single
        ├── archive.blade.php      → All archives
        ├── archive-{cpt}.blade.php → Specific CPT archive
        ├── taxonomy-{tax}.blade.php → Specific taxonomy
        ├── search.blade.php       → Search results
        ├── 404.blade.php          → Not found
        └── index.blade.php        → Fallback
```

---

## Component Architecture

### Anonymous Components (Simple)

```blade
{{-- resources/views/components/button.blade.php --}}
@props([
    'type' => 'button',
    'variant' => 'primary',
])

<button
    type="{{ $type }}"
    {{ $attributes->merge(['class' => "btn btn--{$variant}"]) }}
>
    {{ $slot }}
</button>
```

### Class-Based Components (Complex)

```php
// app/View/Components/Card.php
class Card extends Component
{
    public function __construct(
        public string $title,
        public ?string $image = null,
        public ?string $url = null,
    ) {}

    public function render()
    {
        return view('components.card');
    }
}
```

---

## View Composer Best Practices

1. **One Composer per view concern** — not one per page
2. **Type all return values** in `with()`
3. **Use Collections** for list data (`collect()`)
4. **Cache expensive queries** in Composer methods
5. **Test Composers** independently from views

---

## Layout Pattern

```blade
{{-- resources/views/layouts/app.blade.php --}}
<!doctype html>
<html {!! get_language_attributes() !!}>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {!! wp_head() !!}
</head>
<body @php(body_class())>
    {!! do_action('get_header') !!}

    @include('sections.header')

    <main id="main" class="main">
        @yield('content')
    </main>

    @include('sections.footer')

    {!! wp_footer() !!}
</body>
</html>
```

---

## Escaping Rules

| Syntax         | Behavior                     | Use When                                        |
| -------------- | ---------------------------- | ----------------------------------------------- |
| `{{ $var }}`   | Escaped (`htmlspecialchars`) | Always (default)                                |
| `{!! $var !!}` | Unescaped (raw HTML)         | Only for trusted HTML (WYSIWYG, `wp_kses_post`) |
| `@{{ $var }}`  | Literal (for JS frameworks)  | Passing to Alpine.js etc.                       |
