#!/bin/bash

# Portfolio Database Restore Script
# Restores PostgreSQL database from backup

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Load environment variables
if [ -f "/opt/portfolio/.env" ]; then
    source /opt/portfolio/.env
fi

BACKUP_DIR="/opt/portfolio/backups"

echo "======================================="
echo "Portfolio Database Restore"
echo "======================================="
echo ""

# List available backups
echo "Available backups:"
echo ""
ls -lh "$BACKUP_DIR"/backup_*.sql.gz 2>/dev/null | nl -w2 -s'. ' || {
    echo -e "${RED}No backups found in $BACKUP_DIR${NC}"
    exit 1
}

echo ""
read -p "Enter backup number to restore (or filename): " BACKUP_CHOICE

# Parse input
if [[ "$BACKUP_CHOICE" =~ ^[0-9]+$ ]]; then
    # User entered a number
    BACKUP_FILE=$(ls -1 "$BACKUP_DIR"/backup_*.sql.gz 2>/dev/null | sed -n "${BACKUP_CHOICE}p")
else
    # User entered a filename
    BACKUP_FILE="$BACKUP_DIR/$BACKUP_CHOICE"
fi

# Validate backup file
if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}Backup file not found: $BACKUP_FILE${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}WARNING: This will overwrite the current database!${NC}"
echo "Backup file: $BACKUP_FILE"
echo ""
read -p "Are you sure you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Restore cancelled."
    exit 0
fi

echo ""
echo "Stopping services..."
docker compose -f /opt/portfolio/docker-compose.prod.yml stop backend frontend

echo "Starting database..."
docker compose -f /opt/portfolio/docker-compose.prod.yml up -d postgres
sleep 5

echo "Decompressing backup..."
TEMP_FILE=$(mktemp)
gunzip -c "$BACKUP_FILE" > "$TEMP_FILE"

echo "Dropping existing database..."
docker exec portfolio-db psql -U "${POSTGRES_USER:-portfolio}" -c "DROP DATABASE IF EXISTS ${POSTGRES_DB:-portfolio_db};"

echo "Creating new database..."
docker exec portfolio-db psql -U "${POSTGRES_USER:-portfolio}" -c "CREATE DATABASE ${POSTGRES_DB:-portfolio_db};"

echo "Restoring database..."
if docker exec -i portfolio-db psql -U "${POSTGRES_USER:-portfolio}" "${POSTGRES_DB:-portfolio_db}" < "$TEMP_FILE"; then
    echo -e "${GREEN}✓ Database restored successfully${NC}"
    rm "$TEMP_FILE"
else
    echo -e "${RED}✗ Restore failed${NC}"
    rm "$TEMP_FILE"
    exit 1
fi

echo "Restarting all services..."
docker compose -f /opt/portfolio/docker-compose.prod.yml up -d

echo ""
echo "======================================="
echo "Restore completed at: $(date)"
echo "======================================="
