# 🚀 Production Quick Start

Fast track to deploy your portfolio to production.

## Prerequisites Checklist

- [ ] Proxmox VM with Ubuntu 22.04
- [ ] Docker and Docker Compose installed
- [ ] Nginx Proxy Manager running
- [ ] Domain name pointing to your VM
- [ ] SSH access to VM

## 5-Step Deployment

### Step 1: Clone & Configure (5 minutes)

```bash
# SSH into your VM
ssh user@your-vm-ip

# Clone repository
cd /opt
sudo git clone <your-repo-url> portfolio
cd portfolio

# Copy production environment
cp .env.production.example .env
```

### Step 2: Generate Secrets (2 minutes)

```bash
# Generate strong JWT secret
JWT_SECRET=$(openssl rand -base64 64)

# Generate database password
DB_PASSWORD=$(openssl rand -base64 32)

# Generate admin password
ADMIN_PASSWORD=$(openssl rand -base64 24)

echo "Save these somewhere safe!"
echo "JWT_SECRET: $JWT_SECRET"
echo "DB_PASSWORD: $DB_PASSWORD"
echo "ADMIN_PASSWORD: $ADMIN_PASSWORD"
```

### Step 3: Edit Environment (5 minutes)

```bash
nano .env
```

Update these values:
```bash
DOMAIN=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com/api
CORS_ORIGIN=https://your-domain.com
POSTGRES_PASSWORD=<paste DB_PASSWORD>
JWT_SECRET=<paste JWT_SECRET>
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=<paste ADMIN_PASSWORD>
```

### Step 4: Deploy (10 minutes)

```bash
# Build and start
make -f Makefile.prod build
make -f Makefile.prod up

# Check status
make -f Makefile.prod status

# View logs
make -f Makefile.prod logs
```

### Step 5: Configure Nginx Proxy Manager (5 minutes)

1. Open Nginx Proxy Manager (http://your-vm-ip:81)
2. Add new Proxy Host:
   - **Domain**: your-domain.com
   - **Forward to**: portfolio-frontend:3000
   - **SSL**: Request Let's Encrypt certificate
   - **Force SSL**: ✅ Enabled
3. Add custom location for API:
   - **Location**: /api
   - **Forward to**: portfolio-backend:5000

Done! Visit https://your-domain.com

---

## Post-Deployment

### Test Everything

```bash
# Health check
make -f Makefile.prod health

# Create first backup
make -f Makefile.prod backup

# Check logs
make -f Makefile.prod logs
```

### Secure Your VM

```bash
# Configure firewall
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Enable automatic updates
sudo apt install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

### Setup Monitoring

```bash
# Add to crontab
crontab -e

# Daily backup at 2 AM
0 2 * * * cd /opt/portfolio && make -f Makefile.prod backup

# Hourly health check
0 * * * * cd /opt/portfolio && make -f Makefile.prod health >> /var/log/portfolio-health.log
```

---

## Common Commands

```bash
# View logs
make -f Makefile.prod logs

# Restart
make -f Makefile.prod restart

# Update app
make -f Makefile.prod update

# Backup
make -f Makefile.prod backup

# Restore
make -f Makefile.prod restore

# Check status
make -f Makefile.prod status
```

---

## Troubleshooting

### Can't access website

```bash
# Check containers
docker ps

# Check logs
make -f Makefile.prod logs

# Restart everything
make -f Makefile.prod restart
```

### Database errors

```bash
# Check database
docker exec -it portfolio-db psql -U portfolio_user -d portfolio_db

# View database logs
docker logs portfolio-db
```

### SSL issues

- Check domain DNS is pointing to your VM
- Wait 5-10 minutes for DNS propagation
- Check Nginx Proxy Manager logs
- Try requesting certificate again

---

## Need Help?

1. Check [PRODUCTION.md](PRODUCTION.md) for detailed guide
2. Check [SECURITY-SUMMARY.md](SECURITY-SUMMARY.md) for security info
3. Check logs: `make -f Makefile.prod logs`

---

**Total Time**: ~30 minutes from zero to production! 🎉
