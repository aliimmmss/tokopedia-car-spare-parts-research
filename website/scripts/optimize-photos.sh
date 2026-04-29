#!/usr/bin/env bash
# ============================================================
# optimize-photos.sh — Resize & convert product photos to WebP
# Usage: ./scripts/optimize-photos.sh
#
# Requires: Node.js + sharp (in package.json dependencies)
# Processes: public/products/*.{jpg,jpeg,png} → .webp (800×800)
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

if ! command -v node &>/dev/null; then
  echo "ERROR: Node.js not found. Install Node.js first."
  exit 1
fi

if [ ! -f "node_modules/sharp/package.json" ]; then
  echo "Installing sharp..."
  npm install sharp
fi

echo "=== Optimizing product photos ==="
echo "Source: public/products/"
echo "Output: 800×800 WebP (quality 80)"
echo ""

node scripts/optimize.mjs

echo ""
echo "Done! Original .jpg/.png files can be safely deleted from public/products/"
echo "Keep source photos in their original folder as backup."
