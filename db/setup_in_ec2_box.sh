#!/bin/bash
set -euo pipefail

if [ $# -ne 2 ]; then
  echo "Usage: $0 <db_host> <db_password>"
  exit 1
fi

DB_HOST="$1"
DB_PASSWORD="$2"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

docker run --rm -v "$SCRIPT_DIR:/db" -e PGPASSWORD="$DB_PASSWORD" postgres:17-alpine \
  psql -h "$DB_HOST" -U traffic -d traffic -f /db/schema.sql

docker run --rm -v "$SCRIPT_DIR:/db" -e PGPASSWORD="$DB_PASSWORD" postgres:17-alpine \
  psql -h "$DB_HOST" -U traffic -d traffic -f /db/seed.sql

echo "Schema and seed applied."
