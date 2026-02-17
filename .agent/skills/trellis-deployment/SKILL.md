---
name: trellis-deployment
description: Trellis provisioning and deployment patterns. Ansible roles, vault encryption, server configuration, and WordPress deployment workflows.
---

# Trellis Deployment — Ansible-Based WordPress Infrastructure

## Trellis Structure

```plaintext
trellis/
├── group_vars/
│   ├── all/
│   │   ├── main.yml        # Shared variables
│   │   ├── vault.yml       # Encrypted secrets (ansible-vault)
│   │   └── users.yml       # SSH users
│   ├── development/
│   │   ├── wordpress_sites.yml
│   │   └── vault.yml
│   ├── staging/
│   │   ├── wordpress_sites.yml
│   │   └── vault.yml
│   └── production/
│       ├── wordpress_sites.yml
│       └── vault.yml
├── hosts/
│   ├── development
│   ├── staging
│   └── production
├── deploy-hooks/
│   ├── build-before.yml
│   └── finalize-after.yml
├── server.yml              # Provision playbook
└── deploy.yml              # Deploy playbook
```

## Key Commands

```bash
# Provision server
trellis provision production

# Deploy
trellis deploy production

# SSH into server
trellis ssh production

# Encrypt vault
trellis vault encrypt production

# Decrypt vault
trellis vault decrypt production
```

## WordPress Sites Config

```yaml
# group_vars/production/wordpress_sites.yml
wordpress_sites:
  example.com:
    site_hosts:
      - canonical: example.com
        redirects:
          - www.example.com
    local_path: ../site
    repo: git@github.com:org/site.git
    repo_subtree_path: site
    branch: main
    multisite:
      enabled: false
    ssl:
      enabled: true
      provider: letsencrypt
    cache:
      enabled: true
```

## Deploy Hooks

```yaml
# deploy-hooks/build-before.yml
- name: Install Composer dependencies
  command: composer install --no-dev --prefer-dist
  args:
    chdir: "{{ deploy_helper.new_release_path }}"

- name: Build theme assets
  command: npx bud build
  args:
    chdir: "{{ deploy_helper.new_release_path }}/web/app/themes/theme-name"
```

## Safety Checklist

- [ ] Vault files encrypted before commit
- [ ] SSH keys configured for deploy user
- [ ] Database backups automated
- [ ] SSL certificates valid
- [ ] `WP_ENV=production` in vault
