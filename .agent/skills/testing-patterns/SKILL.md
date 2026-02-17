---
name: testing-patterns
description: PHP testing patterns using PestPHP, PHPUnit, Brain Monkey, WP_Mock, and Cypress for Roots.io projects.
---

# Testing Patterns — PHP Testing

## Framework Selection

| Test Type      | Framework    | Install                                  |
| -------------- | ------------ | ---------------------------------------- |
| Unit           | PestPHP      | `composer require --dev pestphp/pest`    |
| Unit (alt)     | PHPUnit      | `composer require --dev phpunit/phpunit` |
| WP mocks       | Brain Monkey | `composer require --dev brain/monkey`    |
| WP mocks (alt) | WP_Mock      | `composer require --dev 10up/wp_mock`    |
| Browser/E2E    | Cypress      | `npm install --save-dev cypress`         |

## PestPHP Patterns

```php
// tests/Unit/Services/PartnerServiceTest.php
describe('PartnerService', function () {
    beforeEach(function () {
        $this->service = new PartnerService();
    });

    it('returns partners by type', function () {
        $result = $this->service->getByType('financier');

        expect($result)
            ->toBeArray()
            ->each->toHaveKeys(['id', 'name', 'url']);
    });

    it('returns empty array for unknown type', function () {
        expect($this->service->getByType('nonexistent'))
            ->toBeArray()
            ->toBeEmpty();
    });

    it('throws on null type', function () {
        expect(fn () => $this->service->getByType(null))
            ->toThrow(\TypeError::class);
    });
});
```

## Brain Monkey for WordPress Mocks

```php
use Brain\Monkey;
use Brain\Monkey\Functions;

beforeEach(fn () => Monkey\setUp());
afterEach(fn () => Monkey\tearDown());

it('registers post type on init', function () {
    Functions\expect('register_post_type')
        ->once()
        ->with('partenaire', \Mockery::type('array'));

    $provider = new ThemeServiceProvider(app());
    $provider->registerPostTypes();
});

it('returns sanitized input', function () {
    Functions\when('sanitize_text_field')
        ->returnArg();

    $result = sanitize_text_field('test');
    expect($result)->toBe('test');
});
```

## Test Organization

```plaintext
tests/
├── Unit/              # Fast, isolated, no WP dependency
├── Feature/           # Integration with WP/Acorn
├── Browser/           # Cypress E2E tests
├── Pest.php           # PestPHP config
├── TestCase.php       # Base test class
└── phpunit.xml        # PHPUnit config
```

## AAA Pattern (Always Follow)

```php
it('calculates total correctly', function () {
    // Arrange
    $cart = new Cart();
    $cart->add(new Product(price: 10.00), quantity: 2);

    // Act
    $total = $cart->getTotal();

    // Assert
    expect($total)->toBe(20.00);
});
```
