---
name: acf-patterns
description: ACF development patterns for field groups, Flexible Content, Repeaters, Gutenberg blocks, and options pages within Radicle themes.
---

# ACF Patterns — Advanced Custom Fields

## Field Type Selection Guide

| Content Need     | ACF Field Type   | Notes                              |
| ---------------- | ---------------- | ---------------------------------- |
| Short text       | Text             | Single line                        |
| Long text        | Textarea         | Multi-line, no formatting          |
| Rich content     | WYSIWYG          | Returns HTML                       |
| Number           | Number           | Integer or float                   |
| On/off           | True/False       | Boolean                            |
| Single choice    | Select / Radio   | Choose one                         |
| Multiple choices | Checkbox         | Choose many                        |
| Single image     | Image            | Returns array                      |
| Multiple images  | Gallery          | Returns array of arrays            |
| File download    | File             | Returns array                      |
| URL with label   | Link             | Returns `[url, title, target]`     |
| Related posts    | Relationship     | Returns `WP_Post[]`                |
| Nested fields    | Group            | Returns associative array          |
| Repeatable set   | Repeater         | Returns indexed array              |
| Dynamic layouts  | Flexible Content | Returns array with `acf_fc_layout` |
| Date             | Date Picker      | Returns string                     |
| Color            | Color Picker     | Returns hex string                 |

## Flexible Content Architecture

```
Page
├── FC: page_sections
│   ├── Layout: hero
│   │   ├── title (text)
│   │   ├── subtitle (textarea)
│   │   └── image (image)
│   ├── Layout: text_block
│   │   ├── heading (text)
│   │   └── content (wysiwyg)
│   ├── Layout: partners
│   │   ├── title (text)
│   │   └── partners (relationship → partenaire CPT)
│   └── Layout: cta
│       ├── text (text)
│       └── link (link)
```

## Accessing ACF in View Composers

```php
// ✅ GOOD: In View Composer with null safety
public function with(): array
{
    return [
        'hero' => [
            'title' => get_field('hero_title') ?: '',
            'image' => get_field('hero_image') ?: [],
        ],
    ];
}

// ❌ BAD: Direct in Blade template
// {{ get_field('hero_title') }}
```

## Options Page Pattern

```php
// Register
acf_add_options_page([
    'page_title' => __('Options du thème', 'theme'),
    'menu_title' => __('Options', 'theme'),
    'menu_slug'  => 'theme-options',
    'capability' => 'manage_options',
]);

// Access
$phone = get_field('phone', 'option');
$logo  = get_field('logo', 'option');
```

## ACF Block Template

```blade
{{-- resources/views/blocks/testimonial.blade.php --}}
<blockquote class="testimonial">
    @if ($quote)
        <p class="testimonial__quote">{{ $quote }}</p>
    @endif

    <footer class="testimonial__author">
        @if ($photo)
            <img src="{{ $photo['sizes']['thumbnail'] }}"
                 alt="{{ $photo['alt'] }}"
                 class="testimonial__photo">
        @endif
        <cite>
            <strong>{{ $author ?? '' }}</strong>
            @if ($role)
                <span>{{ $role }}</span>
            @endif
        </cite>
    </footer>
</blockquote>
```

## Performance Tips

- Use `get_field()` not `the_field()` in Composers
- Batch load post meta with `update_meta_cache()`
- Cache Flexible Content layouts in transients for complex pages
- Use `'return_format' => 'id'` for relationships when you only need IDs
