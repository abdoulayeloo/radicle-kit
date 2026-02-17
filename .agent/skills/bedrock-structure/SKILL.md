---
name: bedrock-structure
description: Bedrock project structure, Composer dependency management, environment configuration, and WordPress setup conventions.
---

# Bedrock Structure — Project Architecture

## Directory Map

```plaintext
site/                           # Project root
├── config/
│   ├── application.php         # Main WP configuration
│   └── environments/
│       ├── development.php     # Dev overrides (WP_DEBUG=true)
│       ├── staging.php         # Staging config
│       └── production.php      # Production config
├── web/                        # Document root (public)
│   ├── app/                    # wp-content equivalent
│   │   ├── mu-plugins/         # Must-use plugins
│   │   ├── plugins/            # Regular plugins
│   │   ├── themes/             # Themes
│   │   └── uploads/            # Media uploads
│   ├── wp/                     # WordPress core (via Composer)
│   ├── index.php               # Entry point
│   └── wp-config.php           # Loads Bedrock config
├── vendor/                     # Composer packages
├── composer.json               # PHP dependencies
├── composer.lock               # Locked versions
├── .env                        # Environment variables (NEVER commit)
└── .env.example                # Template for .env
```

## Environment Variables (.env)

```env
DB_NAME='database_name'
DB_USER='database_user'
DB_PASSWORD='database_password'
DB_HOST='localhost'
DB_PREFIX='wp_'

WP_ENV='development'
WP_HOME='https://example.test'
WP_SITEURL="${WP_HOME}/wp"

# Salts (generate at https://roots.io/salts.html)
AUTH_KEY='...'
SECURE_AUTH_KEY='...'
```

## Composer Best Practices

```json
{
  "require": {
    "php": ">=8.2",
    "roots/bedrock-autoloader": "^1.0",
    "roots/acorn": "^4.0",
    "roots/wordpress": "^6.5",
    "wpackagist-plugin/advanced-custom-fields": "^6.0"
  },
  "repositories": [
    {
      "type": "composer",
      "url": "https://wpackagist.org"
    }
  ]
}
```

### Installing Plugins via Composer

```bash
# WordPress.org plugins via wpackagist
composer require wpackagist-plugin/plugin-name

# Premium plugins (private repository or artifact)
# Add repository to composer.json first
```

## Config Priority

```
.env → config/application.php → config/environments/{WP_ENV}.php
```

Later values override earlier ones. Environment-specific config always wins.
