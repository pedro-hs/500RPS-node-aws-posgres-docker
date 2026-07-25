#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PG_CONTAINER="${PG_CONTAINER:-traffic-pg}"
PG_USER="${PG_USER:-traffic}"
PG_PASSWORD="${PG_PASSWORD:-traffic}"
PG_DB="${PG_DB:-traffic}"
PG_PORT="${PG_PORT:-5432}"
DATABASE_URL="${DATABASE_URL:-postgres://${PG_USER}:${PG_PASSWORD}@localhost:${PG_PORT}/${PG_DB}}"
API_PORT="${PORT:-3000}"
FRONT_PID=""
BACK_PID=""

cleanup() {
  if [[ -n "${BACK_PID}" ]] && kill -0 "${BACK_PID}" 2>/dev/null; then
    kill "${BACK_PID}" 2>/dev/null || true
  fi
  if [[ -n "${FRONT_PID}" ]] && kill -0 "${FRONT_PID}" 2>/dev/null; then
    kill "${FRONT_PID}" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

require() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require docker
require npm
require curl

echo "==> Starting Postgres (${PG_CONTAINER})"
if docker ps -a --format '{{.Names}}' | grep -qx "${PG_CONTAINER}"; then
  docker start "${PG_CONTAINER}" >/dev/null
else
  docker run -d \
    --name "${PG_CONTAINER}" \
    -e POSTGRES_USER="${PG_USER}" \
    -e POSTGRES_PASSWORD="${PG_PASSWORD}" \
    -e POSTGRES_DB="${PG_DB}" \
    -p "${PG_PORT}:5432" \
    postgres:17 >/dev/null
fi

echo "==> Waiting for Postgres"
for _ in $(seq 1 30); do
  if docker exec "${PG_CONTAINER}" pg_isready -U "${PG_USER}" -d "${PG_DB}" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done
docker exec "${PG_CONTAINER}" pg_isready -U "${PG_USER}" -d "${PG_DB}" >/dev/null

echo "==> Applying schema and seed (if needed)"
TABLE_EXISTS="$(docker exec -e PGPASSWORD="${PG_PASSWORD}" "${PG_CONTAINER}" \
  psql -U "${PG_USER}" -d "${PG_DB}" -tAc "SELECT to_regclass('public.countries')")"
if [[ "${TABLE_EXISTS}" != "countries" ]]; then
  docker exec -i -e PGPASSWORD="${PG_PASSWORD}" "${PG_CONTAINER}" \
    psql -U "${PG_USER}" -d "${PG_DB}" < "${ROOT}/db/schema.sql"
  docker exec -i -e PGPASSWORD="${PG_PASSWORD}" "${PG_CONTAINER}" \
    psql -U "${PG_USER}" -d "${PG_DB}" < "${ROOT}/db/seed.sql"
else
  echo "    Schema already present, skipping"
fi

echo "==> Installing dependencies"
if [[ ! -d "${ROOT}/back/node_modules" ]]; then
  (cd "${ROOT}/back" && npm install)
fi
if [[ ! -d "${ROOT}/front/node_modules" ]]; then
  (cd "${ROOT}/front" && npm install)
fi

if [[ ! -f "${ROOT}/front/.env" ]]; then
  cp "${ROOT}/front/.env.example" "${ROOT}/front/.env"
fi

echo "==> Starting API on :${API_PORT}"
(
  cd "${ROOT}/back"
  export DATABASE_URL
  export PORT="${API_PORT}"
  export HOST=0.0.0.0
  export CORS_ORIGIN="*"
  export CLUSTER_ENABLED=false
  export CACHE_ENABLED=true
  npm run dev
) &
BACK_PID=$!

for _ in $(seq 1 30); do
  if curl -sf "http://localhost:${API_PORT}/health" >/dev/null 2>&1; then
    break
  fi
  if ! kill -0 "${BACK_PID}" 2>/dev/null; then
    echo "API process exited unexpectedly" >&2
    exit 1
  fi
  sleep 1
done
curl -sf "http://localhost:${API_PORT}/health" >/dev/null

echo "==> Starting frontend"
(
  cd "${ROOT}/front"
  npm run dev -- --host 127.0.0.1 --port 5173
) &
FRONT_PID=$!

echo
echo "Local stack is up:"
echo "  API:  http://localhost:${API_PORT}/health"
echo "  UI:   http://127.0.0.1:5173"
echo "  DB:   ${DATABASE_URL}"
echo
echo "Ctrl+C to stop API and frontend (Postgres container keeps running)."

wait
