#!/usr/bin/env bash
# ============================================================
# rename-photos.sh — Batch-rename product photos to match slugs
#
# Supports TWO modes:
#   1. Subfolder mode (recommended): Photos organized in subfolders
#      e.g., photos/rack-end-mazda/IMG_001.jpg, IMG_002.jpg
#   2. Flat mode (fallback): All photos in one folder, keyword matching
#
# Naming: {slug}-1.webp, {slug}-2.webp, {slug}-3.webp
# This is a COPY script — originals are never modified or deleted.
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
TARGET_DIR="$PROJECT_ROOT/public/products"

# All 29 product slugs + display names
declare -A SLUG_NAMES
SLUG_NAMES["rack-end-mazda-e2000"]="Rack End Long Tie Rod Mazda E2000"
SLUG_NAMES["tie-rod-end-timor-s515"]="Tie Rod End Timor S515"
SLUG_NAMES["ball-joint-mazda-mr90"]="Ball Joint Mazda MR90/Vantren"
SLUG_NAMES["as-kopling-mitsubishi-l300"]="As Kopling Mitsubishi L300"
SLUG_NAMES["tie-rod-end-mitsubishi-lancer"]="Tie Rod End Mitsubishi Lancer"
SLUG_NAMES["packing-cylinder-head-galant-eterna"]="Packing Cyl Head Galant Eterna"
SLUG_NAMES["packing-cylinder-head-panther-2500"]="Packing Cyl Head Panther 2500cc"
SLUG_NAMES["pulley-water-pump-hino-dutro"]="Pulley Water Pump Hino Dutro"
SLUG_NAMES["pulley-alternator-innova-diesel"]="Pulley Alternator Innova Diesel"
SLUG_NAMES["tie-rod-end-daihatsu-zebra"]="Tie Rod End Daihatsu Zebra"
SLUG_NAMES["diaphragm-mitsubishi-canter"]="Diaphragm Mitsubishi Canter"
SLUG_NAMES["armature-mitsubishi-ganjo"]="Armature Mitsubishi Ganjo"
SLUG_NAMES["packing-cylinder-head-panther-2300"]="Packing Cyl Head Panther 2300cc"
SLUG_NAMES["selenoid-starter-isuzu-nkr71"]="Selenoid Starter Isuzu NKR71"
SLUG_NAMES["selenoid-starter-isuzu-giga-ftr240"]="Selenoid Starter Isuzu Giga FTR240"
SLUG_NAMES["brake-master-assy-isuzu-nmr71"]="Brake Master Assy Isuzu NMR71"
SLUG_NAMES["brake-master-assy-suzuki-carry-st100"]="Brake Master Assy Suzuki Carry ST100"
SLUG_NAMES["brake-master-assy-suzuki-carry-extra"]="Brake Master Assy Suzuki Carry Extra"
SLUG_NAMES["filter-fuel-sedimenter-isuzu-nmr81"]="Filter Fuel Sedimenter Isuzu NMR81"
SLUG_NAMES["brake-master-assy-dyna-bu30"]="Brake Master Assy Dyna BU30"
SLUG_NAMES["tie-rod-end-isuzu-bison"]="Tie Rod End Isuzu Bison"
SLUG_NAMES["tie-rod-end-mitsubishi-ps100"]="Tie Rod End Mitsubishi PS100"
SLUG_NAMES["brake-master-assy-suzuki-st20"]="Brake Master Assy Suzuki ST20"
SLUG_NAMES["hanger-spring-mitsubishi-ps120"]="Hanger Spring Mitsubishi PS120"
SLUG_NAMES["shackle-spring-front-ps120"]="Shackle Spring Front PS120"
SLUG_NAMES["timing-belt-trooper-4jb1"]="Timing Belt Trooper 4JB1"
SLUG_NAMES["repair-kit-air-master-isuzu-giga-frr"]="Repair Kit Air Master Isuzu Giga"
SLUG_NAMES["kit-valve-governor-hino-h07c"]="Kit Valve Governor Hino H07C"
SLUG_NAMES["bushing-kingpin-isuzu-nkr71"]="Bushing Kingpin Isuzu NKR71"

# Fuzzy match a folder/file name to a slug
match_to_slug() {
  local name_lower
  name_lower="$(echo "$1" | tr '[:upper:]' '[:lower:]' | sed 's/[-_]/ /g')"
  local best_slug=""
  local best_score=0

  for slug in "${!SLUG_NAMES[@]}"; do
    local slug_words
    slug_words="$(echo "$slug" | sed 's/-/ /g')"
    local score=0
    for word in $slug_words; do
      # Skip very short words (1-2 chars)
      if [ ${#word} -le 2 ]; then continue; fi
      if [[ "$name_lower" == *"$word"* ]]; then
        score=$((score + 1))
      fi
    done
    if [ $score -gt $best_score ]; then
      best_score=$score
      best_slug="$slug"
    fi
  done

  # Require at least 2 matching words
  if [ $best_score -ge 2 ]; then
    echo "$best_slug"
  fi
}

# Check if a directory has image files
has_images() {
  local dir="$1"
  shopt -s nullglob
  local files=("$dir"/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP})
  shopt -u nullglob
  [ ${#files[@]} -gt 0 ]
}

# Detect mode: subfolder or flat
detect_mode() {
  local source="$1"
  local has_subdirs=false

  for entry in "$source"/*/; do
    if [ -d "$entry" ] && has_images "$entry"; then
      has_subdirs=true
      break
    fi
  done

  if $has_subdirs; then
    echo "subfolder"
  else
    echo "flat"
  fi
}

# ============================================================
# SUBFOLDER MODE
# ============================================================
run_subfolder_mode() {
  local source="$1"
  echo "=== SUBFOLDER MODE ==="
  echo "Each subfolder maps to a product. Photos inside get numbered."
  echo ""

  local total_copied=0
  local summary_lines=()
  local unmatched_folders=()

  for folder in "$source"/*/; do
    [ -d "$folder" ] || continue
    local folder_name
    folder_name="$(basename "$folder")"

    # Skip hidden dirs
    [[ "$folder_name" == .* ]] && continue

    if ! has_images "$folder"; then
      echo "  SKIP: $folder_name/ (no images)"
      continue
    fi

    local slug
    slug="$(match_to_slug "$folder_name")"

    if [ -z "$slug" ]; then
      echo "  UNMATCHED FOLDER: $folder_name/"
      unmatched_folders+=("$folder_name")
      continue
    fi

    local display_name="${SLUG_NAMES[$slug]}"
    echo "  MATCHED: $folder_name/ → $slug"

    # Get images sorted by name (consistent ordering)
    shopt -s nullglob
    local imgs=("$folder"/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP})
    shopt -u nullglob

    # Sort
    IFS=$'\n' imgs=($(sort <<<"${imgs[*]}")); unset IFS

    local count=0
    local filenames=()
    for img in "${imgs[@]}"; do
      count=$((count + 1))
      local ext="${img##*.}"
      ext="$(echo "$ext" | tr '[:upper:]' '[:lower:]')"
      local target="${slug}-${count}.${ext}"
      cp "$img" "$TARGET_DIR/$target"
      filenames+=("$target")
      total_copied=$((total_copied + 1))
    done

    summary_lines+=("$(printf '  %-45s | %s' "$display_name" "${filenames[*]}")"
  done

  echo ""
  echo "=== Summary ==="
  echo ""
  printf "  %-45s | %s\n" "Product" "Photos"
  printf "  %-45s-|-%s\n" "---------------------------------------------" "------------------------"
  for line in "${summary_lines[@]}"; do
    echo "$line"
  done
  echo ""
  echo "  Total copied: $total_copied"

  if [ ${#unmatched_folders[@]} -gt 0 ]; then
    echo ""
    echo "  ⚠ Unmatched folders (rename to match a product):"
    for f in "${unmatched_folders[@]}"; do
      echo "    - $f/"
    done
  fi
}

# ============================================================
# FLAT MODE (original keyword-matching behavior)
# ============================================================
run_flat_mode() {
  local source="$1"
  echo "=== FLAT MODE ==="
  echo "All photos in one folder. Using keyword matching."
  echo ""

  # Keyword mapping: "keyword1|keyword2|..." → slug
  declare -A KEYWORD_MAP
  KEYWORD_MAP["rack end|mazda"]="rack-end-mazda-e2000"
  KEYWORD_MAP["rack end|long tie"]="rack-end-mazda-e2000"
  KEYWORD_MAP["tie rod|timor"]="tie-rod-end-timor-s515"
  KEYWORD_MAP["tie rod|lancer"]="tie-rod-end-mitsubishi-lancer"
  KEYWORD_MAP["tie rod|zebra"]="tie-rod-end-daihatsu-zebra"
  KEYWORD_MAP["tie rod|bison"]="tie-rod-end-isuzu-bison"
  KEYWORD_MAP["tie rod|ps100"]="tie-rod-end-mitsubishi-ps100"
  KEYWORD_MAP["ball joint|mazda"]="ball-joint-mazda-mr90"
  KEYWORD_MAP["ball joint|mr90"]="ball-joint-mazda-mr90"
  KEYWORD_MAP["kopling|l300"]="as-kopling-mitsubishi-l300"
  KEYWORD_MAP["packing|galant"]="packing-cylinder-head-galant-eterna"
  KEYWORD_MAP["packing|panther|2500"]="packing-cylinder-head-panther-2500"
  KEYWORD_MAP["packing|panther|2300"]="packing-cylinder-head-panther-2300"
  KEYWORD_MAP["packing|panther"]="packing-cylinder-head-panther-2300"
  KEYWORD_MAP["pulley|water pump"]="pulley-water-pump-hino-dutro"
  KEYWORD_MAP["pulley|dutro"]="pulley-water-pump-hino-dutro"
  KEYWORD_MAP["pulley|alternator"]="pulley-alternator-innova-diesel"
  KEYWORD_MAP["diaphragm|canter"]="diaphragm-mitsubishi-canter"
  KEYWORD_MAP["armature|ganjo"]="armature-mitsubishi-ganjo"
  KEYWORD_MAP["armature|me701446"]="armature-mitsubishi-ganjo"
  KEYWORD_MAP["selenoid|nkr71"]="selenoid-starter-isuzu-nkr71"
  KEYWORD_MAP["selenoid|giga"]="selenoid-starter-isuzu-giga-ftr240"
  KEYWORD_MAP["selenoid|ftr"]="selenoid-starter-isuzu-giga-ftr240"
  KEYWORD_MAP["brake master|nmr71"]="brake-master-assy-isuzu-nmr71"
  KEYWORD_MAP["brake master|carry|st100"]="brake-master-assy-suzuki-carry-st100"
  KEYWORD_MAP["brake master|carry|extra"]="brake-master-assy-suzuki-carry-extra"
  KEYWORD_MAP["brake master|carry"]="brake-master-assy-suzuki-carry-st100"
  KEYWORD_MAP["brake master|st20"]="brake-master-assy-suzuki-st20"
  KEYWORD_MAP["brake master|dyna"]="brake-master-assy-dyna-bu30"
  KEYWORD_MAP["filter|sedimenter"]="filter-fuel-sedimenter-isuzu-nmr81"
  KEYWORD_MAP["sedimenter|nmr81"]="filter-fuel-sedimenter-isuzu-nmr81"
  KEYWORD_MAP["hanger|ps120"]="hanger-spring-mitsubishi-ps120"
  KEYWORD_MAP["shackle|ps120"]="shackle-spring-front-ps120"
  KEYWORD_MAP["timing belt|trooper"]="timing-belt-trooper-4jb1"
  KEYWORD_MAP["timing belt|4jb1"]="timing-belt-trooper-4jb1"
  KEYWORD_MAP["repair kit|air master"]="repair-kit-air-master-isuzu-giga-frr"
  KEYWORD_MAP["kit valve|governor"]="kit-valve-governor-hino-h07c"
  KEYWORD_MAP["bushing|kingpin"]="bushing-kingpin-isuzu-nkr71"

  shopt -s nullglob
  local FILES=("$source"/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP})
  shopt -u nullglob

  if [ ${#FILES[@]} -eq 0 ]; then
    echo "ERROR: No image files found in $source"
    exit 1
  fi

  echo "Found ${#FILES[@]} image(s)."
  echo ""

  # Track per-slug count for numbering
  declare -A SLUG_COUNT
  local MATCHED=()
  local UNMATCHED=()
  local COPY_CMDS=()

  for filepath in "${FILES[@]}"; do
    local filename
    filename="$(basename "$filepath")"
    local lower_name
    lower_name="$(echo "$filename" | tr '[:upper:]' '[:lower:]')"
    local matched_slug=""

    for pattern in "${!KEYWORD_MAP[@]}"; do
      IFS='|' read -ra keywords <<< "$pattern"
      local all_found=true
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
      local count="${SLUG_COUNT[$matched_slug]:-0}"
      count=$((count + 1))
      SLUG_COUNT["$matched_slug"]=$count
      local ext="${filename##*.}"
      ext="$(echo "$ext" | tr '[:upper:]' '[:lower:]')"
      local target="${matched_slug}-${count}.${ext}"
      echo "  MATCHED: $filename → $target"
      MATCHED+=("$filename")
      COPY_CMDS+=("cp \"$filepath\" \"$TARGET_DIR/$target\"")
    else
      echo "  UNMATCHED: $filename"
      UNMATCHED+=("$filename")
    fi
  done

  echo ""
  echo "--- Summary ---"
  echo "  Matched:   ${#MATCHED[@]}"
  echo "  Unmatched: ${#UNMATCHED[@]}"

  if [ ${#UNMATCHED[@]} -gt 0 ]; then
    echo ""
    echo "  ⚠ Unmatched photos:"
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

  for cmd in "${COPY_CMDS[@]}"; do
    eval "$cmd"
  done

  echo ""
  echo "✅ Copied ${#MATCHED[@]} photo(s) to $TARGET_DIR"
}

# ============================================================
# MAIN
# ============================================================
if [ $# -lt 1 ]; then
  echo "Usage: $0 /path/to/source/photos"
  echo ""
  echo "Two modes:"
  echo "  Subfolder: photos/product-name/IMG_001.jpg (recommended)"
  echo "  Flat:      photos/IMG_rack_end_001.jpg (keyword matching)"
  echo ""
  echo "Output: {slug}-1.webp, {slug}-2.webp, ... in public/products/"
  echo "Originals are NEVER modified or deleted."
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

MODE="$(detect_mode "$SOURCE_DIR")"

if [ "$MODE" = "subfolder" ]; then
  run_subfolder_mode "$SOURCE_DIR"
else
  run_flat_mode "$SOURCE_DIR"
fi

echo ""
echo "Next steps:"
echo "  1. Run: node scripts/optimize.mjs"
echo "  2. Run: node scripts/update-product-images.mjs"
echo "  3. Paste output into lib/products.ts"
