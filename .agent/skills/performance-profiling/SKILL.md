---
name: performance-profiling
description: WordPress performance profiling with Query Monitor, object caching, transients, and optimization workflows.
---

# Performance Profiling — WordPress Optimization

## Profiling Tools

| Tool                   | What It Shows                            | When to Use                  |
| ---------------------- | ---------------------------------------- | ---------------------------- |
| **Query Monitor**      | DB queries, hooks, PHP errors, templates | Always during development    |
| **Xdebug Profiler**    | PHP call graph, execution time           | Deep function-level analysis |
| **PageSpeed Insights** | Core Web Vitals, Lighthouse              | Production performance check |
| **WebPageTest**        | Waterfall chart, TTFB, render            | Full page load analysis      |

## Query Monitor Panels

| Panel           | Focus                                                 |
| --------------- | ----------------------------------------------------- |
| Queries         | Slow queries, duplicate queries, queries by component |
| Template        | Active template, template parts, body classes         |
| Hooks & Actions | Hook execution order, callbacks                       |
| PHP Errors      | Notices, warnings, deprecated usage                   |
| Environment     | PHP version, memory usage, MySQL version              |
| HTTP API        | External HTTP requests and timings                    |

## Caching Strategy

```
Request → Full Page Cache (fastest)
  miss → Object Cache (Redis/Memcached)
    miss → Transient Cache (wp_options/external)
      miss → Database Query (slowest)
```

### Transients

```php
set_transient($key, $value, $expiration); // Expires
get_transient($key);                       // false if expired/missing
delete_transient($key);

// Constants: MINUTE_IN_SECONDS, HOUR_IN_SECONDS, DAY_IN_SECONDS, WEEK_IN_SECONDS
```

### Object Cache

```php
wp_cache_set($key, $value, $group, $expire);
wp_cache_get($key, $group);
wp_cache_delete($key, $group);
```

## WP_Query Performance Flags

```php
'no_found_rows'          => true,  // Skip SQL_CALC_FOUND_ROWS (no pagination)
'update_post_meta_cache' => false, // Skip priming meta cache
'update_post_term_cache' => false, // Skip priming term cache
'fields'                 => 'ids', // Return only IDs, not full objects
'posts_per_page'         => 10,    // Never use -1 unless absolutely needed
```

## Optimization Workflow

```
1. Enable Query Monitor
2. Load the slow page
3. Check "Queries by Component"
4. Identify: Slow queries? Duplicate queries? Too many queries?
5. Apply fix (cache, optimize query, or restructure data)
6. Reload and verify improvement
7. Repeat for next bottleneck
```
