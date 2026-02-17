---
name: laravel-patterns
description: Laravel/Acorn patterns for WordPress integration. Service Providers, Dependency Injection, Facades, Middleware, and Eloquent ORM within the Acorn framework.
---

# Laravel Patterns — Acorn Integration

## Service Provider Lifecycle

```
register()  → Bind services to container (no hooks here)
boot()      → Bootstrap services, register hooks, configure app
```

## Dependency Injection

### Constructor Injection (Preferred)

```php
class PartnerService
{
    public function __construct(
        private readonly CacheManager $cache,
        private readonly LoggerInterface $logger,
    ) {}
}
```

### Method Injection

```php
public function handle(Request $request, PartnerService $service): Response
{
    return $service->getAll();
}
```

## Facade vs DI

| Use DI When                    | Use Facade When        |
| ------------------------------ | ---------------------- |
| Service is core dependency     | Quick utility access   |
| Testing is important           | Simple, one-off use    |
| Multiple implementations exist | Readability preference |

## Collections

```php
// Transform WordPress posts into clean arrays
collect(get_posts($args))
    ->map(fn($post) => [
        'title' => get_the_title($post),
        'url'   => get_permalink($post),
        'image' => get_the_post_thumbnail_url($post, 'medium'),
    ])
    ->filter(fn($item) => ! empty($item['image']))
    ->values()
    ->toArray();
```

## Configuration Pattern

```php
// config/theme.php
return [
    'posts_per_page' => env('POSTS_PER_PAGE', 12),
    'cache_ttl'      => env('CACHE_TTL', 3600),
];

// Usage
$limit = config('theme.posts_per_page');
```

## Middleware Pattern (Acorn)

```php
class RedirectTrailingSlash
{
    public function handle($request, Closure $next)
    {
        $path = $request->getPathInfo();

        if ($path !== '/' && str_ends_with($path, '/')) {
            return redirect(rtrim($path, '/'), 301);
        }

        return $next($request);
    }
}
```

## String Helpers

```php
use Illuminate\Support\Str;

Str::slug('Mon Article')         // 'mon-article'
Str::limit($text, 150)          // Truncate with ellipsis
Str::contains($path, '/admin')  // Check substring
Str::after($url, '://')         // Extract after delimiter
```
