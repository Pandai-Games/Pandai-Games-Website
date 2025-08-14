# GitLab CI/CD Setup for Pandai Games Website

This repository is configured with a comprehensive GitLab CI/CD pipeline that automates testing, building, and deployment of the Pandai Games website.

## Pipeline Overview

The CI/CD pipeline consists of the following stages:

### 1. Install Stage
- Installs dependencies for both client and server applications
- Caches `node_modules` for faster subsequent builds
- Uses Node.js 18 Alpine image for efficiency

### 2. Test Stage
- **Client Testing**: Runs React application tests
- **Server Testing**: Runs Node.js server tests
- **Linting**: Code quality checks with ESLint
- **Security Scanning**: NPM audit for vulnerability detection

### 3. Build Stage
- **Client Build**: Creates production build of React application
- **Docker Build**: Creates containerized versions (manual trigger)
- Optimizes assets and generates deployment artifacts

### 4. Deploy Stage
- **Staging Deployment**: Automatic deployment to staging environment
- **Production Deployment**: Manual deployment to production environment
- Uses rsync for efficient file transfer

## Features

### 🚀 Automated Deployment
- Zero-downtime deployments using PM2 process manager
- Automatic dependency installation on target servers
- Rollback capabilities through Git history

### 🔒 Security & Quality
- Automated security vulnerability scanning
- Code quality checks with ESLint
- SSH-based secure deployments

### 🐳 Docker Support
- Optional containerization with Docker
- Multi-stage builds for optimized images
- Container registry integration

### 📊 Monitoring & Reporting
- Test coverage reporting
- Performance testing with Lighthouse
- Deployment status notifications

## Configuration

### Required Variables
See [CICD_VARIABLES.md](.gitlab/CICD_VARIABLES.md) for detailed configuration instructions.

### Branch Strategy
- `main`: Production deployments (manual)
- `develop`: Staging deployments (automatic)
- Feature branches: Testing only

## Quick Start

### 1. Configure Variables
Set up the required CI/CD variables in GitLab:
- Go to Settings > CI/CD > Variables
- Add server credentials and deployment paths
- Configure SSH keys for secure access

### 2. Server Setup
Prepare your deployment servers:
```bash
# Install Node.js, PM2, and Nginx
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
sudo npm install -g pm2
```

### 3. Deploy
- Push to `develop` branch for staging deployment
- Create merge request to `main` for production deployment
- Manual triggers available for Docker builds

## Pipeline Jobs

| Job | Trigger | Description |
|-----|---------|-------------|
| `install_dependencies` | Automatic | Install npm packages |
| `test_client` | Automatic | Run React tests |
| `test_server` | Automatic | Run Node.js tests |
| `lint_client` | Automatic | Code quality checks |
| `security_scan` | Automatic | Vulnerability scanning |
| `build_client` | Automatic | Create production build |
| `build_docker` | Manual | Build Docker images |
| `deploy_staging` | Manual | Deploy to staging |
| `deploy_production` | Manual | Deploy to production |
| `performance_test` | Manual | Lighthouse performance testing |

## Environments

### Staging
- **URL**: https://staging.pandaigames.com
- **Branch**: `develop`
- **Auto-deploy**: Yes
- **Purpose**: Testing and validation

### Production
- **URL**: https://pandaigames.com
- **Branch**: `main`
- **Auto-deploy**: No (manual approval required)
- **Purpose**: Live website

## Local Development

### Using Docker Compose
```bash
# Build and run all services
docker-compose up --build

# Access the application
# Client: http://localhost
# Server: http://localhost:3000
```

### Traditional Setup
```bash
# Install dependencies
cd client && npm install
cd ../server && npm install

# Start development servers
cd client && npm run dev      # Port 5173
cd server && npm start        # Port 3000
```

## Troubleshooting

### Common Issues

1. **Pipeline Fails on Dependencies**
   - Clear cache in GitLab CI/CD settings
   - Check Node.js version compatibility

2. **Deployment Permission Denied**
   - Verify SSH key configuration
   - Check file permissions on target server

3. **Build Artifacts Missing**
   - Ensure build job completed successfully
   - Check artifact expiration settings

### Debug Mode
Add debug variables to `.gitlab-ci.yml`:
```yaml
variables:
  CI_DEBUG_TRACE: "true"
```

## Contributing

1. Create feature branch from `develop`
2. Make your changes
3. Ensure tests pass locally
4. Create merge request
5. Wait for pipeline to pass
6. Request review

## Support

For CI/CD related issues:
1. Check pipeline logs in GitLab
2. Review [troubleshooting guide](.gitlab/CICD_VARIABLES.md)
3. Contact the development team

## License

This CI/CD configuration is part of the Pandai Games Website project.
