---
name: database-design
description: WordPress database conventions, Eloquent models via Acorn, custom table design, and query optimization patterns.
---

# Database Design — WordPress & Eloquent

## Storage Decision Matrix

| Data Shape             | Storage Method        | Example                   |
| ---------------------- | --------------------- | ------------------------- |
| Per-post metadata      | `wp_postmeta`         | Partner phone number      |
| Categorization         | `wp_terms` + taxonomy | Partner type              |
| Site-wide settings     | `wp_options`          | Social media URLs         |
| User preferences       | `wp_usermeta`         | Dashboard layout          |
| High-volume structured | Custom table          | Redirect rules, analytics |

## WordPress Table Conventions

| Table         | Prefix Usage             | Primary Key |
| ------------- | ------------------------ | ----------- |
| `wp_posts`    | `$wpdb->posts`           | `ID`        |
| `wp_postmeta` | `$wpdb->postmeta`        | `meta_id`   |
| `wp_options`  | `$wpdb->options`         | `option_id` |
| `wp_terms`    | `$wpdb->terms`           | `term_id`   |
| Custom        | `$wpdb->prefix . 'name'` | `id`        |

## Custom Table Migration

```php
global $wpdb;
$table = $wpdb->prefix . 'custom_table';
$charset = $wpdb->get_charset_collate();

$sql = "CREATE TABLE {$table} (
    id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    status enum('active','inactive') NOT NULL DEFAULT 'active',
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_status (status)
) {$charset};";

require_once ABSPATH . 'wp-admin/includes/upgrade.php';
dbDelta($sql);
```

## Eloquent Model (Acorn)

```php
class Partner extends Model
{
    protected $table = 'wp_posts';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $casts = [
        'post_date' => 'datetime',
    ];

    public function scopePublished($query)
    {
        return $query->where('post_status', 'publish')
                     ->where('post_type', 'partenaire');
    }

    public function meta()
    {
        return $this->hasMany(PostMeta::class, 'post_id', 'ID');
    }
}
```

## Query Optimization Tips

1. **Use `no_found_rows`** when pagination isn't needed
2. **Use `fields => 'ids'`** when you only need post IDs
3. **Use `update_post_meta_cache => false`** when meta isn't needed
4. **Use transients** for expensive, infrequently-changing queries
5. **Run `EXPLAIN ANALYZE`** via Query Monitor before adding indexes
