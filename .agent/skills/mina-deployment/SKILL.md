---
name: mina-deployment
description: Mina deployment recipes for Bedrock/Radicle projects. Fast, zero-downtime deploys with atomic symlinks.
---

# Mina Deployment — Fast WordPress Deployment

## Mina Structure

```plaintext
config/
├── deploy.rb               # Main deploy config
└── deploy/
    ├── production.rb        # Production server config
    └── staging.rb           # Staging server config
Gemfile                      # Ruby dependencies (mina gem)
```

## deploy.rb Configuration

```ruby
require 'mina/rails'
require 'mina/git'

set :application_name, 'your-site'
set :domain, 'example.com'
set :deploy_to, '/srv/www/your-site'
set :repository, 'git@github.com:org/repo.git'
set :branch, ENV['BRANCH'] || 'main'
set :user, 'deploy'
set :keep_releases, 5

# Bedrock shared paths
set :shared_dirs, fetch(:shared_dirs, []).push(
  'public/content/uploads'
)

set :shared_files, fetch(:shared_files, []).push(
  '.env'
)

task :deploy do
  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'deploy:cleanup'

    on :launch do
      invoke :'composer:install'
      invoke :'assets:build'
      invoke :'cache:clear'
    end
  end
end

task 'composer:install' do
  command 'composer install --no-dev --prefer-dist --no-interaction'
end

task 'assets:build' do
  command "cd web/app/themes/theme-name && npm ci && npx vite build"
end

task 'cache:clear' do
  command 'wp acorn optimize:clear || true'
end
```

## Common Commands

```bash
# Deploy to production
mina deploy

# Deploy specific branch
BRANCH=feature/new-hero mina staging deploy

# Setup server (first time)
mina setup

# Run arbitrary command on server
mina run[command]
```

## Mina vs Other Tools

| Feature          | Mina                 | Trellis      | Deployer |
| ---------------- | -------------------- | ------------ | -------- |
| Speed            | ⭐⭐⭐⭐⭐ (fastest) | ⭐⭐⭐       | ⭐⭐⭐⭐ |
| Config           | Ruby                 | YAML/Ansible | PHP      |
| Zero-downtime    | ✅ atomic symlink    | ✅           | ✅       |
| Provision server | ❌                   | ✅           | ❌       |
| Rollback         | ✅                   | ✅           | ✅       |

## Safety Checklist

- [ ] `.env` exists on server in shared path
- [ ] SSH keys configured for deploy user
- [ ] `shared/public/content/uploads` writable
- [ ] Database backup before deploy
- [ ] Build tested locally before deploy
