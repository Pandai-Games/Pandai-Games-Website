# GitLab CI/CD Variables Configuration

This document outlines the required CI/CD variables that need to be configured in your GitLab project settings.

## Required Variables

### Container Registry (Optional - for Docker builds)
- `CI_REGISTRY_USER`: GitLab registry username (usually provided automatically)
- `CI_REGISTRY_PASSWORD`: GitLab registry password (usually provided automatically)
- `CI_REGISTRY_IMAGE`: GitLab registry image path (usually provided automatically)

### Staging Environment
- `STAGING_SERVER`: IP address or hostname of your staging server
- `STAGING_USER`: SSH username for staging server access
- `STAGING_PRIVATE_KEY`: SSH private key for staging server access (paste entire key)
- `STAGING_PATH`: Deployment path on staging server (e.g., `/var/www/pandai-games-staging`)

### Production Environment
- `PRODUCTION_SERVER`: IP address or hostname of your production server
- `PRODUCTION_USER`: SSH username for production server access
- `PRODUCTION_PRIVATE_KEY`: SSH private key for production server access (paste entire key)
- `PRODUCTION_PATH`: Deployment path on production server (e.g., `/var/www/pandai-games`)

## How to Set Variables

1. Navigate to your GitLab project
2. Go to Settings > CI/CD
3. Expand the "Variables" section
4. Click "Add variable" for each required variable
5. For private keys, make sure to mark them as "Protected" and "Masked" (if possible)

## Variable Types

- **Protected**: Only available in protected branches (main, develop)
- **Masked**: Values are hidden in job logs (recommended for sensitive data)
- **Environment**: Scoped to specific environments

## SSH Key Setup

To generate SSH keys for deployment:

```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "gitlab-ci@pandaigames.com"

# Copy public key to your servers
ssh-copy-id -i ~/.ssh/id_rsa.pub user@your-server.com

# Copy private key content to GitLab CI variable
cat ~/.ssh/id_rsa
```

## Server Requirements

Your deployment servers should have:
- Node.js 18+ installed
- PM2 process manager (for server management)
- Nginx (for client hosting)
- SSH access enabled

## Installation Commands for Servers

```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt-get install -y nginx

# Setup PM2 to start on boot
pm2 startup
pm2 save
```

## Pipeline Stages

1. **Install**: Install dependencies for both client and server
2. **Test**: Run tests, linting, and security scans
3. **Build**: Build client application and Docker images (optional)
4. **Deploy**: Deploy to staging/production environments

## Manual Jobs

Some jobs are set to `when: manual` for safety:
- Docker builds
- Staging deployments
- Production deployments
- Performance testing

## Troubleshooting

### Common Issues

1. **SSH Connection Failed**: Verify server access and SSH keys
2. **Build Failures**: Check Node.js version compatibility
3. **Deployment Timeouts**: Increase job timeout in GitLab settings
4. **Permission Denied**: Verify file permissions on deployment servers

### Debug Commands

Add these to your pipeline for debugging:

```yaml
- echo "Current directory: $(pwd)"
- echo "Available files: $(ls -la)"
- echo "Node version: $(node --version)"
- echo "NPM version: $(npm --version)"
```
