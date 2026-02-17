---
name: clean-code
description: PHP clean code standards including PSR-12, WordPress Coding Standards, type safety, PHPDoc, and general best practices.
---

# Clean Code — PHP & WordPress Standards

## PSR-12 Essentials

```php
<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\PartnerRepositoryInterface;
use Illuminate\Support\Collection;

/**
 * Service for managing partner data.
 */
final class PartnerService
{
    public function __construct(
        private readonly PartnerRepositoryInterface $repository,
    ) {}

    /**
     * Get active partners.
     *
     * @return Collection<int, array{id: int, name: string}>
     */
    public function getActive(): Collection
    {
        return $this->repository
            ->findActive()
            ->map(fn (Partner $p) => [
                'id'   => $p->getId(),
                'name' => $p->getName(),
            ]);
    }
}
```

## PHP 8.2+ Features to Use

| Feature               | Example                                             |
| --------------------- | --------------------------------------------------- |
| Typed properties      | `private readonly string $name;`                    |
| Constructor promotion | `public function __construct(private string $name)` |
| Enums                 | `enum Status: string { case Active = 'active'; }`   |
| Match expression      | `match($type) { 'hero' => ..., default => ... }`    |
| Readonly classes      | `readonly class Settings { ... }`                   |
| Named arguments       | `new Query(limit: 10, offset: 0)`                   |
| Null coalescing       | `$value = $input ?? 'default'`                      |
| Null safe operator    | `$user?->profile?->avatar`                          |
| First-class callables | `array_map($this->transform(...), $items)`          |

## WordPress Coding Standards

| Rule            | Convention                                        |
| --------------- | ------------------------------------------------- |
| Function naming | `snake_case` for WordPress, `camelCase` for Acorn |
| Class naming    | `PascalCase` always                               |
| Constants       | `UPPER_SNAKE_CASE`                                |
| File naming     | `class-name.php` (WP) or `ClassName.php` (PSR-4)  |
| Indentation     | Tabs (WordPress) or 4 spaces (PSR-12 / Acorn)     |
| Yoda conditions | `if ( 'value' === $var )` (WordPress only)        |

## PHPDoc Standards

```php
/**
 * Short description (one line).
 *
 * Longer description if needed, explaining behavior,
 * edge cases, or important notes.
 *
 * @param string      $type   The partner type slug.
 * @param int         $limit  Maximum results to return.
 * @param string|null $search Optional search term.
 *
 * @return \WP_Post[] Array of partner post objects.
 *
 * @throws \InvalidArgumentException If type is empty.
 *
 * @since 1.0.0
 */
```

## Anti-Patterns

| ❌ Don't                                  | ✅ Do                        |
| ----------------------------------------- | ---------------------------- |
| Magic numbers                             | Named constants or config    |
| Deep nesting (>3 levels)                  | Early returns, guard clauses |
| God classes (>300 lines)                  | Single Responsibility        |
| Commented-out code                        | Delete it (Git remembers)    |
| Generic variable names (`$data`, `$temp`) | Descriptive names            |
| Missing return types                      | Always declare return types  |
| `@suppressWarnings`                       | Fix the actual issue         |
