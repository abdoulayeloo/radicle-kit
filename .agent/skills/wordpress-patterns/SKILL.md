---
name: wordpress-patterns
description: WordPress development patterns for hooks, WP_Query, Custom Post Types, taxonomies, REST API, and data security within Bedrock/Radicle projects.
---

# WordPress Patterns — Core Development

## Hook Architecture

### Actions (Do something)

```php
// Register
add_action('init', [$this, 'registerPostTypes'], 10, 0);

// Trigger
do_action('theme/partner/created', $partner_id);
```

### Filters (Modify something)

```php
// Register
add_filter('the_content', [$this, 'addDisclaimer'], 20, 1);

// Apply
$content = apply_filters('theme/partner/content', $content, $partner_id);
```

### Priority Guide

| Priority | Use For                        |
| -------- | ------------------------------ |
| 1-9      | Must run early (override core) |
| 10       | Default priority               |
| 11-19    | Run after defaults             |
| 20+      | Run late (final modifications) |
| 999      | Run last (cleanup, logging)    |

## WP_Query Patterns

### Optimized Query

```php
new \WP_Query([
    'post_type'      => 'partenaire',
    'posts_per_page' => 12,
    'paged'          => get_query_var('paged') ?: 1,
    'no_found_rows'          => false, // true if no pagination needed
    'update_post_meta_cache' => true,  // false if no meta needed
    'update_post_term_cache' => true,  // false if no terms needed
    'fields'                 => '',    // 'ids' for just IDs
]);
```

### Modify Main Query (NEVER use `query_posts`)

```php
add_action('pre_get_posts', function ($query) {
    if (! is_admin() && $query->is_main_query() && $query->is_post_type_archive('partenaire')) {
        $query->set('posts_per_page', 24);
        $query->set('orderby', 'menu_order');
        $query->set('order', 'ASC');
    }
});
```

## Data Security Triad

```
INPUT  → sanitize_text_field(), absint(), wp_kses_post()
STORE  → $wpdb->prepare(), validate before save
OUTPUT → esc_html(), esc_attr(), esc_url(), wp_kses_post()
```

## Transient Pattern

```php
$key   = 'theme_partners_' . md5(serialize($args));
$value = get_transient($key);

if ($value === false) {
    $value = expensive_query($args);
    set_transient($key, $value, HOUR_IN_SECONDS);
}

// Invalidate on save
add_action('save_post_partenaire', function () {
    delete_transient('theme_partners_*'); // or specific keys
});
```

## REST API Registration

```php
register_rest_route('theme/v1', '/resource/(?P<id>\d+)', [
    'methods'             => 'GET',
    'callback'            => [$this, 'getResource'],
    'permission_callback' => function () {
        return current_user_can('read');
    },
    'args' => [
        'id' => [
            'validate_callback' => function ($param) {
                return is_numeric($param);
            },
        ],
    ],
]);
```
