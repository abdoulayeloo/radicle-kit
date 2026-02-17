---
name: capistrano-deployment
description: Capistrano deployment recipes and Deployer alternative for Bedrock/Radicle projects.
---

# Capistrano Deployment — WordPress Deployment Recipes

## Capistrano Structure

```plaintext
config/
├── deploy.rb               # Main deploy config
└── deploy/
    ├── production.rb        # Production server config
    └── staging.rb           # Staging server config
Capfile                      # Load tasks and plugins
Gemfile                      # Ruby dependencies
```

## deploy.rb Configuration

```ruby
lock '~> 3.19'

set :application, 'your-site'
set :repo_url, 'git@github.com:org/repo.git'
set :deploy_to, '/srv/www/your-site'
set :branch, ENV['BRANCH'] || 'main'
set :keep_releases, 5

# Bedrock-specific linked directories and files
set :linked_dirs, %w[
  web/app/uploads
]

set :linked_files, %w[
  .env
]

# Build assets during deploy
namespace :deploy do
  before :updated, :build do
    on roles(:app) do
      within release_path do
        execute :composer, 'install', '--no-dev', '--prefer-dist', '--no-interaction'
      end
      within release_path.join('web/app/themes/theme-name') do
        execute :npm, 'ci'
        execute :npx, 'bud', 'build'
      end
    end
  end
end
```

## Server Configuration

```ruby
# config/deploy/production.rb
server 'example.com',
  user: 'deploy',
  roles: %w[app db web],
  ssh_options: {
    forward_agent: true,
    keys: %w[~/.ssh/deploy_key],
  }
```

## Common Commands

```bash
# Deploy to production
cap production deploy

# Deploy specific branch
BRANCH=feature/new-hero cap staging deploy

# Rollback
cap production deploy:rollback

# Check status
cap production deploy:check
```

## Deployer Alternative

```php
// deploy.php
namespace Deployer;

require 'recipe/wordpress.php';

host('production')
    ->set('remote_user', 'deploy')
    ->set('deploy_path', '/srv/www/site')
    ->set('repository', 'git@github.com:org/repo.git');

task('deploy:build', function () {
    cd('{{release_path}}');
    run('composer install --no-dev --prefer-dist');
    cd('{{release_path}}/web/app/themes/theme-name');
    run('npm ci && npx vite build');
});

before('deploy:symlink', 'deploy:build');
```
