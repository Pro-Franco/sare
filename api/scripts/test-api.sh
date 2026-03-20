#!/usr/bin/env bash
set -euo pipefail

# Simple API test script for the didactic API
# Usage: ./scripts/test-api.sh [base_url]

BASE_URL=${1:-http://localhost:3000}

command -v curl >/dev/null 2>&1 || { echo "curl not found. Install curl to run this script." >&2; exit 1; }
JQ=0
if command -v jq >/dev/null 2>&1; then
  JQ=1
fi

echo "Using base URL: $BASE_URL"

check_server() {
  echo -n "Checking server... "
  if curl -sSf "$BASE_URL/" >/dev/null; then
    echo "OK"
  else
    echo "FAILED (is the server running?)" >&2
    exit 2
  fi
}

login() {
  local email=$1
  local senha=$2
  if [ "$JQ" -eq 1 ]; then
    curl -s -X POST "$BASE_URL/auth/login" \
      -H "Content-Type: application/json" \
      -d "{\"email\":\"$email\",\"senha\":\"$senha\"}" | jq -r .token
  else
    curl -s -X POST "$BASE_URL/auth/login" \
      -H "Content-Type: application/json" \
      -d "{\"email\":\"$email\",\"senha\":\"$senha\"}" | sed -n 's/.*"token"\s*:\s*"\([^"]*\)".*/\1/p'
  fi
}

req() {
  local method=$1
  local path=$2
  shift 2
  curl -s -X "$method" "$BASE_URL$path" "$@"
}

check_server

echo "\n--- Login admin ---"
ADMIN_TOKEN=$(login "admin@example.com" "admin123")
echo "admin token: ${ADMIN_TOKEN:-(none)}"

echo "\n--- Perfil admin ---"
req GET "/usuarios/perfil" -H "Authorization: Bearer $ADMIN_TOKEN" | ( [ "$JQ" -eq 1 ] && jq . || cat )

echo "\n--- Reservas admin ---"
req GET "/reservas" -H "Authorization: Bearer $ADMIN_TOKEN" | ( [ "$JQ" -eq 1 ] && jq . || cat )

echo "\n--- Criar reserva como admin ---"
req POST "/reservas" -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TOKEN" -d '{"sala":"Script Room","data":"2026-04-02"}' | ( [ "$JQ" -eq 1 ] && jq . || cat )

echo "\n--- Login user ---"
USER_TOKEN=$(login "user@example.com" "user123")
echo "user token: ${USER_TOKEN:-(none)}"

echo "\n--- Perfil user ---"
req GET "/usuarios/perfil" -H "Authorization: Bearer $USER_TOKEN" | ( [ "$JQ" -eq 1 ] && jq . || cat )

echo "\n--- Reservas user ---"
req GET "/reservas" -H "Authorization: Bearer $USER_TOKEN" | ( [ "$JQ" -eq 1 ] && jq . || cat )

echo "\nAll done."
