#!/usr/bin/env bash
# ============================================================
# rename-photos.sh — Batch-rename product photos to match slugs
# Usage: ./scripts/rename-photos.sh /path/to/source/photos
#
# This is a COPY script — originals are never modified or deleted.
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
TARGET_DIR="$PROJECT_ROOT/public/products"
SLUGS=(
  "rack-end-mazda-e2000"
  "tie-rod-end-timor-s515"
  "ball-joint-mazda-mr90"
  "as-kopling-mitsubishi-l300"
  "tie-rod-end-mitsubishi-lancer"
  "packing-cylinder-head-galant-eterna"
  "packing-cylinder-head-panther-2500"
  "pulley-water-pump-hino-dutro"
  "pulley-alternator-innova-diesel"
  "tie-rod-end-daihatsu-zebra"
  "diaphragm-mitsubishi-canter"
  "armature-mitsubishi-ganjo"
  "packing-cylinder-head-panther-2300"
  "selenoid-starter-isuzu-nkr71"
  "selenoid-starter-isuzu-giga-ftr240"
  "brake-master-assy-isuzu-nmr71"
  "brake-master-assy-suzuki-carry-st100"
  "brake-master-assy-suzuki-carry-extra"
  "filter-fuel-sedimenter-isuzu-nmr81"
  "brake-master-assy-dyna-bu30"
  "tie-rod-end-isuzu-bison"
  "tie-rod-end-mitsubishi-ps100"
  "brake-master-assy-suzuki-st20"
  "hanger-spring-mitsubishi-ps120"
  "shackle-spring-front-ps120"
  "timing-belt-trooper-4jb1"
  "repair-kit-air-master-isuzu-giga-frr"
  "kit-valve-governor-hino-h07c"
  "bushing-kingpin-isuzu-nkr71"
)

# Keyword mapping: "keyword1|keyword2|..." → slug
# First match wins, so more specific patterns come first.
declare -A KEYWORD_MAP
KEYWORD_MAP["rack end|mazda e2000"]="rack-end-mazda-e2000"
KEYWORD_MAP["rack end|long tie rod"]="rack-end-mazda-e2000"
KEYWORD_MAP["tie rod|timor"]="tie-rod-end-timor-s515"
KEYWORD_MAP["tie rod|lancer|dangan"]="tie-rod-end-mitsubishi-lancer"
KEYWORD_MAP["tie rod|zebra"]="tie-rod-end-daihatsu-zebra"
KEYWORD_MAP["tie rod|bison"]="tie-rod-end-isuzu-bison"
KEYWORD_MAP["tie rod|ps100"]="tie-rod-end-mitsubishi-ps100"
KEYWORD_MAP["tie rod|ps120"]="tie-rod-end-mitsubishi-ps120"
KEYWORD_MAP["ball joint|mazda"]="ball-joint-mazda-mr90"
KEYWORD_MAP["ball joint|mr90"]="ball-joint-mazda-mr90"
KEYWORD_MAP["ball joint|vantren"]="ball-joint-mazda-mr90"
KEYWORD_MAP["kopling|l300"]="as-kopling-mitsubishi-l300"
KEYWORD_MAP["kopling|mitsubishi"]="as-kopling-mitsubishi-l300"
KEYWORD_MAP["packing|galant|eterna"]="packing-cylinder-head-galant-eterna"
KEYWORD_MAP["packing|galant|g63b"]="packing-cylinder-head-galant-eterna"
KEYWORD_MAP["packing|panther|2500"]="packing-cylinder-head-panther-2500"
KEYWORD_MAP["packing|panther|2300"]="packing-cylinder-head-panther-2300"
KEYWORD_MAP["packing|panther"]="packing-cylinder-head-panther-2300"
KEYWORD_MAP["pulley|water pump|hino"]="pulley-water-pump-hino-dutro"
KEYWORD_MAP["pulley|dutro"]="pulley-water-pump-hino-dutro"
KEYWORD_MAP["pulley|alternator|innova"]="pulley-alternator-innova-diesel"
KEYWORD_MAP["diaphragm|canter"]="diaphragm-mitsubishi-canter"
KEYWORD_MAP["armature|ganjo"]="armature-mitsubishi-ganjo"
KEYWORD_MAP["armature|me701446"]="armature-mitsubishi-ganjo"
KEYWORD_MAP["selenoid|nkr71"]="selenoid-starter-isuzu-nkr71"
KEYWORD_MAP["selenoid|giga"]="selenoid-starter-isuzu-giga-ftr240"
KEYWORD_MAP["selenoid|ftr240"]="selenoid-starter-isuzu-giga-ftr240"
KEYWORD_MAP["brake master|nmr71"]="brake-master-assy-isuzu-nmr71"
KEYWORD_MAP["brake master|carry|st100"]="brake-master-assy-suzuki-carry-st100"
KEYWORD_MAP["brake master|carry|extra"]="brake-master-assy-suzuki-carry-extra"
KEYWORD_MAP["brake master|carry"]="brake-master-assy-suzuki-carry-st100"
KEYWORD_MAP["brake master|st20"]="brake-master-assy-suzuki-st20"
KEYWORD_MAP["brake master|dyna"]="brake-master-assy-dyna-bu30"
KEYWORD_MAP["filter|sedimenter|nmr81"]="filter-fuel-sedimenter-isuzu-nmr81"
KEYWORD_MAP["sedimenter|isuzu"]="filter-fuel-sedimenter-isuzu-nmr81"
KEYWORD_MAP["hanger|spring|ps120"]="hanger-spring-mitsubishi-ps120"
KEYWORD_MAP["shackle|spring|ps120"]="shackle-spring-front-ps120"
KEYWORD_MAP["timing belt|trooper"]="timing-belt-trooper-4jb1"
KEYWORD_MAP["timing belt|4jb1"]="timing-belt-trooper-4jb1"
KEYWORD_MAP["repair kit|air master"]="repair-kit-air-master-isuzu-giga-frr"
KEYWORD_MAP["kit valve|governor"]="kit-valve-governor-hino-h07c"
KEYWORD_MAP["bushing|kingpin"]="bushing-kingpin-isuzu-nkr71"

if [ $# -lt 1 ]; then
  echo "Usage: $0 /path/to/source/photos"
  echo ""
  echo "This script COPIES photos from the source folder to"
  echo "website/public/products/ with filenames matching product slugs."
  echo "Original files are NEVER modified or deleted."
  exit 1
fi

SOURCE_DIR="$1"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "ERROR: Source directory not found: $SOURCE_DIR"
  exit 1
fi

mkdir -p "$TARGET_DIR"

echo "=== Photo Rename & Copy Script ==="
echo "Source: $SOURCE_DIR"
echo "Target: $TARGET_DIR"
echo ""

# Collect source files
shopt -s nullglob
FILES=("$SOURCE_DIR"/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP})
shopt -u nullglob

if [ ${#FILES[@]} -eq 0 ]; then
  echo "ERROR: No image files found in $SOURCE_DIR"
  echo "Supported: .jpg, .jpeg, .png, .webp"
  exit 1
fi

echo "Found ${#FILES[@]} image(s) in source folder."
echo ""

# Match & preview
MATCHED=()
UNMATCHED=()
COPY_CMDS=()

for filepath in "${FILES[@]}"; do
  filename="$(basename "$filepath")"
  lower_name="$(echo "$filename" | tr '[:upper:]' '[:lower:]')"
  matched_slug=""

  # Try keyword-based matching (sorted by specificity)
  for pattern in "${!KEYWORD_MAP[@]}"; do
    IFS='|' read -ra keywords <<< "$pattern"
    all_found=true
    for kw in "${keywords[@]}"; do
      if [[ "$lower_name" != *"$kw"* ]]; then
        all_found=false
        break
      fi
    done
    if $all_found; then
      matched_slug="${KEYWORD_MAP[$pattern]}"
      break
    fi
  done

  if [ -n "$matched_slug" ]; then
    ext="${filename##*.}"
    ext_lower="$(echo "$ext" | tr '[:upper:]' '[:lower:]')"
    target_name="${matched_slug}.${ext_lower}"
    echo "  MATCHED: $filename → $target_name"
    MATCHED+=("$filename")
    COPY_CMDS+=("cp \"$filepath\" \"$TARGET_DIR/$target_name\"")
  else
    echo "  UNMATCHED: $filename (manual review needed)"
    UNMATCHED+=("$filename")
  fi
done

echo ""
echo "--- Summary ---"
echo "  Matched:   ${#MATCHED[@]}"
echo "  Unmatched: ${#UNMATCHED[@]}"

if [ ${#UNMATCHED[@]} -gt 0 ]; then
  echo ""
  echo "⚠ Unmatched photos (rename manually or add patterns to script):"
  for f in "${UNMATCHED[@]}"; do
    echo "    - $f"
  done
fi

echo ""
read -p "Proceed with copy? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted. No files copied."
  exit 0
fi

# Execute copies
for cmd in "${COPY_CMDS[@]}"; do
  eval "$cmd"
done

echo ""
echo "✅ Copied ${#MATCHED[@]} photo(s) to $TARGET_DIR"
echo ""
echo "Next steps:"
echo "  1. Run: node scripts/optimize.mjs (resize + convert to WebP)"
echo "  2. Update products.ts image fields (already done if using this workflow)"
