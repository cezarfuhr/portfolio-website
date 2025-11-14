# 🚀 Production Deployment Guide

Complete guide to deploy this portfolio application to production on a Proxmox VM with Docker and Nginx Proxy Manager.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Security Checklist](#security-checklist)
3. [Deployment Steps](#deployment-steps)
4. [Nginx Proxy Manager Configuration](#nginx-proxy-manager-configuration)
5. [Maintenance](#maintenance)
6. [Monitoring](#monitoring)
7. [Backup & Recovery](#backup--recovery)
8. [Troubleshooting](#troubleshooting)

---

## 📦 Prerequisites

### VM Requirements (Minimum)
- **OS**: Ubuntu 22.04 LTS or similar
- **RAM**: 2GB minimum, 4GB recommended
- **CPU**: 2 cores minimum
- **Disk**: 20GB minimum, 40GB recommended
- **Docker**: Version 24.0+
- **Docker Compose**: Version 2.20+

### External Requirements
- Domain name pointing to your VM IP
- Nginx Proxy Manager installed and configured
- SSL certificate (Let's Encrypt via Nginx Proxy Manager)

---

## 🔒 Security Checklist

### ✅ Before Deployment

- [ ] **Firewall configured** on VM (UFW or iptables)
  ```bash
  sudo ufw allow 22/tcp    # SSH
  sudo ufw allow 80/tcp    # HTTP (for Let's Encrypt)
  sudo ufw allow 443/tcp   # HTTPS
  sudo ufw enable
  ```

- [ ] **Strong passwords generated** for:
  - PostgreSQL (32+ characters)
  - Admin account (16+ characters)
  - JWT Secret (64+ characters)

- [ ] **Environment variables** properly set (no defaults)

- [ ] **Docker daemon** secured:
  ```bash
  # Edit /etc/docker/daemon.json
  {
    "log-driver": "json-file",
    "log-opts": {
      "max-size": "10m",
      "max-file": "3"
    },
    "live-restore": true
  }
  ```

- [ ] **SSH hardened**:
  - Disable root login
  - Use SSH keys only
  - Change default port (optional)

- [ ] **Regular updates** scheduled:
  ```bash
  sudo apt update && sudo apt upgrade -y
  sudo apt install unattended-upgrades
  ```

### 🔐 Security Features Already Implemented

✅ **Backend Security:**
- Helmet.js (security headers)
- CORS with configurable origin
- Rate limiting (100 req/15min by default)
- JWT authentication
- Bcrypt password hashing
- Input validation
- Error handling (no stack traces in production)

✅ **Docker Security:**
- Multi-stage builds (smaller images)
- Non-root users
- Read-only filesystems
- Capability dropping
- No new privileges flag
- Health checks
- Log rotation

✅ **Database Security:**
- Not exposed to internet
- Strong authentication
- Automatic backups
- Volume persistence

---

## 🚀 Deployment Steps

### Step 1: Prepare the VM

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo apt install docker-compose-plugin

# Verify installations
docker --version
docker compose version
```

### Step 2: Clone Repository

```bash
# Create application directory
mkdir -p /opt/portfolio
cd /opt/portfolio

# Clone repository
git clone <your-repo-url> .

# Or upload files via SCP/SFTP
```

### Step 3: Configure Environment

```bash
# Copy production environment template
cp .env.production.example .env

# Edit environment variables
nano .env

# IMPORTANT: Change ALL these values:
# - DOMAIN=https://your-domain.com
# - NEXT_PUBLIC_API_URL=https://your-domain.com/api
# - CORS_ORIGIN=https://your-domain.com
# - POSTGRES_PASSWORD=<strong-password>
# - JWT_SECRET=<strong-secret>
# - ADMIN_EMAIL=<your-email>
# - ADMIN_PASSWORD=<strong-password>
```

**Generate Strong Secrets:**
```bash
# Generate JWT Secret (64 chars)
openssl rand -base64 64

# Generate strong password (32 chars)
openssl rand -base64 32
```

### Step 4: Create Required Directories

```bash
# Create directories for backups and logs
mkdir -p backups logs scripts

# Set proper permissions
chmod 700 backups
chmod 755 scripts
```

### Step 5: Build and Start Services

```bash
# Build images
docker compose -f docker-compose.prod.yml build

# Start services
docker compose -f docker-compose.prod.yml up -d

# Check status
docker compose -f docker-compose.prod.yml ps

# View logs
docker compose -f docker-compose.prod.yml logs -f
```

### Step 6: Verify Services

```bash
# Check backend health
docker exec portfolio-backend wget -qO- http://localhost:5000/api/health

# Check frontend
docker exec portfolio-frontend wget -qO- http://localhost:3000

# Check database
docker exec portfolio-db pg_isready -U portfolio_user
```

---

## 🌐 Nginx Proxy Manager Configuration

### Add Proxy Host

1. **Open Nginx Proxy Manager** (usually http://your-vm-ip:81)
2. **Login** with admin credentials
3. **Go to:** Hosts → Proxy Hosts → Add Proxy Host

### Frontend Configuration

**Details Tab:**
- **Domain Names**: `your-domain.com`, `www.your-domain.com`
- **Scheme**: `http`
- **Forward Hostname/IP**: `portfolio-frontend` (container name) or `localhost`
- **Forward Port**: `3000`
- **Cache Assets**: ✅ Enabled
- **Block Common Exploits**: ✅ Enabled
- **Websockets Support**: ✅ Enabled

**SSL Tab:**
- **SSL Certificate**: Request a new Let's Encrypt certificate
- **Force SSL**: ✅ Enabled
- **HTTP/2 Support**: ✅ Enabled
- **HSTS Enabled**: ✅ Enabled
- **HSTS Subdomains**: ✅ Enabled

**Advanced Tab:**
```nginx
# Add security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# Increase client body size for uploads
client_max_body_size 10M;

# Timeouts
proxy_connect_timeout 60s;
proxy_send_timeout 60s;
proxy_read_timeout 60s;
```

### Backend Configuration (API)

**Details Tab:**
- **Domain Names**: `your-domain.com`
- **Scheme**: `http`
- **Forward Hostname/IP**: `portfolio-backend` or `localhost`
- **Forward Port**: `5000`
- **Block Common Exploits**: ✅ Enabled

**Custom Location: `/api`**
```nginx
location /api {
    proxy_pass http://portfolio-backend:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

---

## 🔧 Maintenance

### Update Application

```bash
cd /opt/portfolio

# Pull latest changes
git pull

# Rebuild and restart
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d

# Clean up old images
docker image prune -af
```

### Update Dependencies

```bash
# Backend
cd backend
npm audit fix
npm update

# Frontend
cd ../frontend
npm audit fix
npm update

# Rebuild after updates
cd ..
docker compose -f docker-compose.prod.yml build
```

### View Logs

```bash
# All services
docker compose -f docker-compose.prod.yml logs -f

# Specific service
docker compose -f docker-compose.prod.yml logs -f backend

# Last 100 lines
docker compose -f docker-compose.prod.yml logs --tail=100
```

### Restart Services

```bash
# All services
docker compose -f docker-compose.prod.yml restart

# Specific service
docker compose -f docker-compose.prod.yml restart backend

# Stop and start (full restart)
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d
```

---

## 📊 Monitoring

### Health Checks

Create monitoring script `/opt/portfolio/scripts/health-check.sh`:

```bash
#!/bin/bash

# Portfolio Health Check Script

echo "=== Portfolio Health Check ==="
echo "Date: $(date)"
echo ""

# Check containers
echo "Container Status:"
docker compose -f /opt/portfolio/docker-compose.prod.yml ps

# Check backend API
echo ""
echo "Backend API Health:"
curl -sf http://localhost:5000/api/health || echo "❌ Backend unhealthy"

# Check frontend
echo ""
echo "Frontend Health:"
curl -sf http://localhost:3000 > /dev/null && echo "✅ Frontend healthy" || echo "❌ Frontend unhealthy"

# Check database
echo ""
echo "Database Health:"
docker exec portfolio-db pg_isready -U portfolio_user || echo "❌ Database unhealthy"

# Check disk space
echo ""
echo "Disk Usage:"
df -h /opt/portfolio

# Check memory
echo ""
echo "Memory Usage:"
free -h

echo ""
echo "=== Health Check Complete ==="
```

```bash
chmod +x /opt/portfolio/scripts/health-check.sh
```

### Setup Monitoring Cron

```bash
# Add to crontab
crontab -e

# Run health check every hour
0 * * * * /opt/portfolio/scripts/health-check.sh >> /var/log/portfolio-health.log 2>&1
```

### Docker Stats

```bash
# Real-time resource usage
docker stats

# Specific containers
docker stats portfolio-frontend portfolio-backend portfolio-db
```

---

## 💾 Backup & Recovery

### Automatic Backups

The `docker-compose.prod.yml` includes an automatic backup service that:
- Runs daily at 2 AM
- Keeps backups for 7 days (configurable)
- Stores in `/opt/portfolio/backups`

### Manual Backup

```bash
# Database backup
docker exec portfolio-db pg_dump -U portfolio_user portfolio_db > backups/manual_backup_$(date +%Y%m%d_%H%M%S).sql

# Backup volumes
docker run --rm \
  -v portfolio_postgres_data:/data \
  -v $(pwd)/backups:/backup \
  alpine tar czf /backup/postgres_data_$(date +%Y%m%d).tar.gz -C /data .

# Backup environment file (SECURE THIS!)
cp .env backups/.env.backup
```

### Restore from Backup

```bash
# Stop services
docker compose -f docker-compose.prod.yml down

# Restore database
docker compose -f docker-compose.prod.yml up -d postgres
sleep 10
docker exec -i portfolio-db psql -U portfolio_user portfolio_db < backups/backup_YYYYMMDD_HHMMSS.sql

# Restart all services
docker compose -f docker-compose.prod.yml up -d
```

### Backup to Remote Location

```bash
# Install rclone for cloud backups
curl https://rclone.org/install.sh | sudo bash

# Configure rclone (e.g., Google Drive, S3, etc.)
rclone config

# Sync backups to cloud
rclone sync /opt/portfolio/backups remote:portfolio-backups
```

Add to crontab for daily cloud backup:
```bash
0 3 * * * rclone sync /opt/portfolio/backups remote:portfolio-backups
```

---

## 🐛 Troubleshooting

### Container Won't Start

```bash
# Check logs
docker compose -f docker-compose.prod.yml logs <service-name>

# Check configuration
docker compose -f docker-compose.prod.yml config

# Recreate container
docker compose -f docker-compose.prod.yml up -d --force-recreate <service-name>
```

### Database Connection Issues

```bash
# Check database is running
docker ps | grep portfolio-db

# Check database logs
docker logs portfolio-db

# Test connection
docker exec -it portfolio-db psql -U portfolio_user -d portfolio_db

# Check environment variables
docker exec portfolio-backend env | grep DATABASE_URL
```

### Frontend/Backend Not Accessible

```bash
# Check if ports are exposed (they shouldn't be in prod)
docker ps

# Check nginx proxy manager logs
docker logs nginx-proxy-manager

# Check if containers are on same network
docker network inspect portfolio_portfolio-network

# Verify DNS resolution
nslookup your-domain.com
```

### SSL Certificate Issues

```bash
# Check certificate in Nginx Proxy Manager
# Navigate to SSL Certificates tab

# Force certificate renewal
# In Nginx Proxy Manager, delete and request new certificate

# Check Let's Encrypt rate limits
# https://letsencrypt.org/docs/rate-limits/
```

### High Memory Usage

```bash
# Check resource usage
docker stats

# Restart specific service
docker compose -f docker-compose.prod.yml restart <service-name>

# Add resource limits to docker-compose.prod.yml
```

### Disk Space Full

```bash
# Clean Docker resources
docker system prune -af --volumes

# Remove old backups
find /opt/portfolio/backups -name "*.sql" -mtime +7 -delete

# Check disk usage
du -sh /opt/portfolio/*
df -h
```

---

## 📝 Post-Deployment Checklist

After deployment, verify:

- [ ] ✅ Application accessible via HTTPS
- [ ] ✅ HTTP redirects to HTTPS
- [ ] ✅ Admin login works
- [ ] ✅ All pages load correctly
- [ ] ✅ API endpoints responding
- [ ] ✅ Database persists data after restart
- [ ] ✅ Backups are being created
- [ ] ✅ Health checks passing
- [ ] ✅ Monitoring set up
- [ ] ✅ Firewall configured
- [ ] ✅ SSL certificate valid
- [ ] ✅ Security headers present
- [ ] ✅ Rate limiting working
- [ ] ✅ Logs rotating properly

### Security Scan

```bash
# Test SSL configuration
https://www.ssllabs.com/ssltest/analyze.html?d=your-domain.com

# Test security headers
https://securityheaders.com/?q=your-domain.com

# Docker security scan
docker scan portfolio-frontend
docker scan portfolio-backend
```

---

## 🔗 Useful Commands Reference

```bash
# Start services
docker compose -f docker-compose.prod.yml up -d

# Stop services
docker compose -f docker-compose.prod.yml down

# View logs
docker compose -f docker-compose.prod.yml logs -f

# Restart service
docker compose -f docker-compose.prod.yml restart <service>

# Rebuild and restart
docker compose -f docker-compose.prod.yml up -d --build

# Execute command in container
docker exec -it portfolio-backend sh

# Database shell
docker exec -it portfolio-db psql -U portfolio_user portfolio_db

# Backup database
docker exec portfolio-db pg_dump -U portfolio_user portfolio_db > backup.sql

# View resource usage
docker stats

# Clean system
docker system prune -af

# Update images
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

---

## 📞 Support

For issues or questions:
1. Check logs: `docker compose -f docker-compose.prod.yml logs`
2. Verify environment variables
3. Check Nginx Proxy Manager configuration
4. Review this guide's troubleshooting section
5. Check Docker and container status

---

## 🎯 Performance Optimization

### Enable Redis Cache (Optional)

Add Redis to `docker-compose.prod.yml`:

```yaml
redis:
  image: redis:7-alpine
  container_name: portfolio-redis
  restart: always
  networks:
    - portfolio-network
  volumes:
    - redis_data:/data
  healthcheck:
    test: ["CMD", "redis-cli", "ping"]
    interval: 30s
    timeout: 10s
    retries: 3
```

### Database Tuning

Edit `docker-compose.prod.yml` postgres service:

```yaml
command: postgres -c max_connections=200 -c shared_buffers=256MB -c effective_cache_size=1GB
```

---

**Last Updated**: 2025-01-13
**Version**: 1.0.0
