#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/login.sh [base_url] email senha
BASE_URL=${1:-http://localhost:3000}
EMAIL=${2:-admin@example.com}
SENHA=${3:-admin123}

command -v curl >/dev/null 2>&1 || { echo "curl not found" >&2; exit 1; }
JQ=0
if command -v jq >/dev/null 2>&1; then
  JQ=1
fi

resp=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"senha\":\"$SENHA\"}")

if [ "$JQ" -eq 1 ]; then
  echo "$resp" | jq -r .token
else
  echo "$resp" | sed -n 's/.*"token"\s*:\s*"\([^"]*\)".*/\1/p'
fi
