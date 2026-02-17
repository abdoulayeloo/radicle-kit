---
name: systematic-debugging
description: Systematic debugging techniques for WordPress and PHP. WP_DEBUG, Query Monitor, Xdebug, error log analysis, and common issue resolution.
---

# Systematic Debugging — WordPress & PHP

## Debug Configuration (Bedrock)

```php
// config/environments/development.php
Config::define('WP_DEBUG', true);
Config::define('WP_DEBUG_LOG', true);     // Log to wp-content/debug.log
Config::define('WP_DEBUG_DISPLAY', true); // Show on screen
Config::define('SCRIPT_DEBUG', true);     // Use unminified scripts
Config::define('SAVEQUERIES', true);      // Log all queries

// config/environments/production.php
Config::define('WP_DEBUG', false);
Config::define('WP_DEBUG_LOG', false);
Config::define('WP_DEBUG_DISPLAY', false);
```

## Error Type → Investigation Path

| Error                 | First Check            | Tool                         |
| --------------------- | ---------------------- | ---------------------------- |
| **Fatal error**       | Stack trace, file:line | Error log                    |
| **White screen**      | Enable WP_DEBUG        | debug.log                    |
| **404 on all pages**  | Permalinks             | Settings → Permalinks → Save |
| **Slow page**         | Queries tab            | Query Monitor                |
| **Wrong data**        | Template tab           | Query Monitor                |
| **Missing styles**    | Network tab            | Browser DevTools             |
| **JS error**          | Console                | Browser DevTools             |
| **Plugin conflict**   | Deactivate all         | Admin → Plugins              |
| **Memory exhaustion** | Memory limit           | `WP_MEMORY_LIMIT`            |
| **500 Internal**      | Error log              | Server error log             |

## Query Monitor Debugging

```
1. Activate Query Monitor plugin
2. Load the problem page
3. Check admin bar for:
   - Red = PHP errors exist
   - Slow query count
   - Template indicators
4. Expand relevant panel
5. Identify root cause
```

## Log Analysis

```bash
# View WordPress debug log (Bedrock)
tail -f web/app/debug.log

# View PHP error log
tail -f /var/log/php-fpm/error.log

# View Nginx error log
tail -f /var/log/nginx/error.log

# Search for specific error
grep -n "Fatal error" web/app/debug.log
```

## The 5 Whys Technique

```
Bug: Partner page shows 0 results

Why 1: WP_Query returns empty → Check query args
Why 2: tax_query uses wrong taxonomy → Verify taxonomy name
Why 3: Taxonomy was renamed in last commit → Check Git history
Why 4: Rename didn't update all references → Search for old name
Why 5: No automated test for this query → Add a test

Root Cause: Missing test coverage for taxonomy queries
Fix: Fix the reference + add regression test
```

## Common Debug Snippets

```php
// Quick debug output (development only)
error_log(print_r($variable, true));

// WordPress debug with context
if (defined('WP_DEBUG') && WP_DEBUG) {
    error_log(sprintf('[%s] %s: %s',
        date('Y-m-d H:i:s'),
        __METHOD__,
        print_r($data, true)
    ));
}

// Dump and die (NEVER in production)
wp_die('<pre>' . print_r($variable, true) . '</pre>');
```
