#!/usr/bin/env bash
set -euo pipefail
photo_id="$1"
out="$2"
w="${3:-1200}"
h="${4:-900}"
mkdir -p "$(dirname "$out")"
url="https://images.unsplash.com/${photo_id}?w=${w}&h=${h}&fit=crop&q=80&auto=format"
curl -fsSL "$url" -o "$out"
size=$(stat -c%s "$out")
if [ "$size" -lt 1000 ]; then echo "Download failed: $out" >&2; exit 1; fi
echo "OK $out"
