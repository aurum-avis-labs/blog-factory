#!/usr/bin/env bash
set -euo pipefail
photo_id="$1"; out="$2"; w="${3:-1200}"; h="${4:-900}"
mkdir -p "$(dirname "$out")"
curl -fsSL "https://images.unsplash.com/${photo_id}?w=${w}&h=${h}&fit=crop&q=80&auto=format" -o "$out"
[ "$(stat -c%s "$out")" -ge 1000 ] || { echo fail; exit 1; }
