---
name: seo-fundamentals
description: WordPress SEO best practices, structured data, Core Web Vitals, and content optimization patterns.
---

# SEO Fundamentals — WordPress SEO

## Technical SEO Checklist

- [ ] XML sitemap (`/sitemap_index.xml`)
- [ ] `robots.txt` configured
- [ ] Canonical URLs on all pages
- [ ] 301 redirects for moved content
- [ ] HTTPS enforced
- [ ] Mobile responsive
- [ ] No duplicate `<title>` or `<h1>` tags
- [ ] All images have `alt` attributes
- [ ] Breadcrumbs with JSON-LD
- [ ] Open Graph and Twitter Card meta tags
- [ ] `hreflang` for multilingual sites
- [ ] 404 page with navigation

## Structured Data (JSON-LD)

### Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": ["https://facebook.com/company", "https://linkedin.com/company"]
}
```

### BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://example.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Partenaires",
      "item": "https://example.com/partenaires/"
    }
  ]
}
```

## WordPress SEO Plugin Tips

### Yoast SEO

```php
// Remove Yoast comments
add_filter('wpseo_debug_markers', '__return_false');

// Custom title
add_filter('wpseo_title', function ($title) {
    if (is_post_type_archive('partenaire')) {
        return __('Nos Partenaires', 'theme') . ' | ' . get_bloginfo('name');
    }
    return $title;
});
```

## Core Web Vitals Impact on SEO

| Metric | Target  | SEO Impact             |
| ------ | ------- | ---------------------- |
| LCP    | < 2.5s  | Ranking factor         |
| INP    | < 200ms | User experience signal |
| CLS    | < 0.1   | Ranking factor         |

## Content SEO Patterns

- One `<h1>` per page (post title)
- Logical heading hierarchy (`h2` → `h3` → `h4`)
- Internal linking between related content
- Descriptive anchor text (not "click here")
- Meta description 150-160 characters
- Image file names descriptive (`partenaire-logo.jpg` not `IMG_001.jpg`)
