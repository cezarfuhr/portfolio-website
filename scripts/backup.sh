#!/bin/bash

# Portfolio Database Backup Script
# Automatically backs up PostgreSQL database and manages retention

set -e

# Configuration
BACKUP_DIR="/opt/portfolio/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-7}

# Load environment variables
if [ -f "/opt/portfolio/.env" ]; then
    source /opt/portfolio/.env
fi

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "======================================="
echo "Portfolio Database Backup"
echo "======================================="
echo "Started at: $(date)"
echo ""

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup filename
BACKUP_FILE="$BACKUP_DIR/backup_${TIMESTAMP}.sql"

# Perform backup
echo "Creating backup..."
if docker exec portfolio-db pg_dump -U "${POSTGRES_USER:-portfolio}" "${POSTGRES_DB:-portfolio_db}" > "$BACKUP_FILE"; then
    echo -e "${GREEN}✓ Backup created successfully${NC}"
    echo "  Location: $BACKUP_FILE"

    # Compress backup
    echo "Compressing backup..."
    if gzip "$BACKUP_FILE"; then
        echo -e "${GREEN}✓ Backup compressed${NC}"
        BACKUP_FILE="${BACKUP_FILE}.gz"
    fi

    # Get file size
    FILE_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo "  Size: $FILE_SIZE"
else
    echo -e "${RED}✗ Backup failed${NC}"
    exit 1
fi

# Clean old backups
echo ""
echo "Cleaning old backups (older than $RETENTION_DAYS days)..."
DELETED_COUNT=$(find "$BACKUP_DIR" -name "backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete -print | wc -l)
echo -e "${GREEN}✓ Deleted $DELETED_COUNT old backup(s)${NC}"

# List current backups
echo ""
echo "Current backups:"
ls -lh "$BACKUP_DIR"/backup_*.sql.gz 2>/dev/null || echo "  No backups found"

# Summary
echo ""
echo "======================================="
echo "Backup completed at: $(date)"
echo "======================================="
