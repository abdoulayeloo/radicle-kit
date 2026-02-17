---
name: security-fundamentals
description: WordPress and Laravel security fundamentals. Nonces, escaping, sanitization, OWASP Top 10, and defense-in-depth patterns.
---

# Security Fundamentals — WP & Laravel Security

## The Security Triad

```
1. SANITIZE input  → sanitize_text_field(), absint(), wp_kses_post()
2. VALIDATE data   → is_email(), filter_var(), custom validation
3. ESCAPE output   → esc_html(), esc_attr(), esc_url(), wp_kses_post()
```

## Sanitization Functions

| Function                | Input Type   | Returns              |
| ----------------------- | ------------ | -------------------- |
| `sanitize_text_field()` | Text         | Clean string         |
| `sanitize_email()`      | Email        | Valid email or empty |
| `sanitize_title()`      | Title/slug   | URL-safe string      |
| `sanitize_file_name()`  | Filename     | Safe filename        |
| `wp_kses_post()`        | HTML content | Safe HTML subset     |
| `absint()`              | Number       | Absolute integer     |
| `esc_url_raw()`         | URL (for DB) | Validated URL        |

## Escaping Functions

| Function         | Context         | Use In                           |
| ---------------- | --------------- | -------------------------------- |
| `esc_html()`     | HTML content    | `<p>{{ esc_html($text) }}</p>`   |
| `esc_attr()`     | HTML attributes | `class="{{ esc_attr($class) }}"` |
| `esc_url()`      | URLs            | `href="{{ esc_url($url) }}"`     |
| `wp_kses_post()` | Rich HTML       | `{!! wp_kses_post($html) !!}`    |

> In Blade: `{{ $var }}` auto-escapes via `htmlspecialchars()`. Use `{!! !!}` only for trusted HTML.

## Nonce Verification

```php
// Create
wp_nonce_field('action_name', 'nonce_field');
$nonce_url = wp_nonce_url($url, 'action_name');

// Verify
if (! wp_verify_nonce($_POST['nonce_field'] ?? '', 'action_name')) {
    wp_die('Security check failed', 403);
}

// AJAX
check_ajax_referer('action_name', 'nonce');
```

## Capability Checks

```php
// Always check before privileged operations
if (! current_user_can('manage_options')) {
    wp_die('Unauthorized', 403);
}

// For post-specific operations
if (! current_user_can('edit_post', $post_id)) {
    wp_die('Unauthorized', 403);
}
```

## OWASP Top 10 Quick Reference

| #   | Vulnerability             | WordPress Prevention             |
| --- | ------------------------- | -------------------------------- |
| A01 | Broken Access Control     | `current_user_can()`, nonces     |
| A03 | Injection                 | `$wpdb->prepare()`, sanitization |
| A05 | Security Misconfiguration | `WP_DEBUG=false` in production   |
| A07 | Auth Failures             | Rate limiting, strong passwords  |

## Danger Patterns

```php
// ❌ SQL Injection
$wpdb->query("SELECT * FROM {$wpdb->posts} WHERE ID = {$_GET['id']}");
// ✅ Prepared statement
$wpdb->prepare("SELECT * FROM {$wpdb->posts} WHERE ID = %d", absint($_GET['id']));

// ❌ XSS
echo $_GET['search'];
// ✅ Escaped output
echo esc_html(sanitize_text_field($_GET['search'] ?? ''));

// ❌ CSRF
delete_post($id);
// ✅ With nonce
wp_verify_nonce($_POST['nonce'], 'delete_post') && delete_post($id);
```
