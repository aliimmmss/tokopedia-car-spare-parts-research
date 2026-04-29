#!/usr/bin/env python3
"""
nothing-bg-photos.py — Remove backgrounds + apply Nothing Design aesthetic.

Uses rembg (u2net) to remove backgrounds, then composites products onto
a clean Nothing Design dark background with subtle radial gradient.

Usage:
    /usr/bin/python3 scripts/nothing-bg-photos.py                 # process all
    /usr/bin/python3 scripts/nothing-bg-photos.py --dry-run       # preview
    /usr/bin/python3 scripts/nothing-bg-photos.py --source /path  # custom dir

Output: overwrites website/public/products/*.webp with new versions.
"""

import os
import sys
import io
import argparse
from pathlib import Path
from PIL import Image, ImageFilter, ImageDraw

# ── Config ──────────────────────────────────────────────────────────────
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
SOURCE_DIR = PROJECT_ROOT / "photos-source"
PUBLIC_PRODUCTS = PROJECT_ROOT / "website" / "public" / "products"

# Folder name → slug mapping (same as process-new-photos.cjs)
FOLDER_TO_SLUG = {
    "armature": "armature-mitsubishi-ganjo-me701446",
    "as kopling": "as-kopling-l300",
    "ball joint": "ball-joint-mazda-mr90-vantren",
    "brake master assy dyna": "brake-master-assy-dyna-bu30",
    "brake master assy nmr71": "brake-master-assy-nmr71",
    "brake master assy suzuki carry extra": "brake-master-assy-suzuki-carry-extra",
    "brake master assy suzuki carry st100": "brake-master-assy-suzuki-carry-st100",
    "brake master assy suzuki carry st20": "brake-master-assy-suzuki-st20",
    "bushing kingpin isuzu nkr71": "bushing-kingpin-isuzu-nkr71-66",
    "diaphragm assy mitsubishi canter": "diaphragm-assy-mitsubishi-canter",
    "hanger spring mitsubishi ps120": "hanger-spring-mitsubishi-ps120-mc114412",
    "kit valve governor h07c hino": "kit-valve-governor-h07c-hino",
    "packing cylinder head mitsubishi galant": "packing-cylinder-head-mitsubishi-galant-eterna",
    "packing cylinder head panther 2300cc": "packing-cylinder-head-panther-2300cc",
    "packing cylinder head panther 2500cc": "packing-cylinder-head-panther-2500cc",
    "pulley alternator innova diesel": "pulley-alternator-innova-diesel",
    "pulley water pump hino dutro": "pulley-water-pump-hino-dutro",
    "rack end mazda e2000": "rack-end-mazda-e2000",
    "repair kit air master isuzu giga frr": "repair-kit-air-master-isuzu-giga-frr",
    "sedimeter isuzu nmr81": "sedimeter-isuzu-nmr81",
    "selenoid switch starter isuzu giga ftr240 24v": "selenoid-switch-starter-isuzu-giga-ftr240-24v",
    "selenoid switch starter isuzu nkr71 24v": "selenoid-switch-starter-isuzu-nkr71-24v",
    "shuckle spring front ps120": "shuckle-spring-front-ps120",
    "tie rod end daihatsu zebra fan": "tie-rod-end-daihatsu-zebra-fan",
    "tie rod end isuzu tld56": "tie-rod-end-isuzu-tld56",
    "tie rod end mitsubishi lancer dangan 1988 up": "tie-rod-end-mitsubishi-lancer-dangan",
    "tie rod end mitsubishi ps100": "tie-rod-end-mitsubishi-ps100",
    "tie rod end timor s515": "tie-rod-end-timor-s515",
    "timing belt troopeer diesel 4jb1 turbo": "timing-belt-trooper-diesel-4jb1-turbo",
}

# Nothing Design colors
BG_BLACK = (0, 0, 0)           # --black: OLED primary background
BG_SURFACE = (17, 17, 17)      # --surface: #111111
BG_SURFACE_RAISED = (26, 26, 26)  # --surface-raised: #1A1A1A
BORDER = (34, 34, 34)          # --border: #222222


def create_nothing_bg(width=800, height=800):
    """Create a Nothing Design background with subtle radial gradient."""
    img = Image.new("RGB", (width, height), BG_BLACK)
    draw = ImageDraw.Draw(img)

    # Subtle radial gradient: slightly lighter center → pure black edges
    # This gives depth without being distracting
    cx, cy = width // 2, height // 2
    max_r = int((width**2 + height**2) ** 0.5 / 2)

    for r in range(max_r, 0, -2):
        # Very subtle: from #111111 at center to #000000 at edges
        t = r / max_r
        val = int(17 * (1 - t))  # 17 at center, 0 at edge
        color = (val, val, val)
        draw.ellipse(
            [cx - r, cy - r, cx + r, cy + r],
            fill=color
        )

    return img


def remove_bg(input_path):
    """Remove background using rembg."""
    from rembg import remove

    with open(input_path, "rb") as f:
        input_data = f.read()

    output_data = remove(input_data)
    return Image.open(io.BytesIO(output_data)).convert("RGBA")


def composite_on_bg(fg_img, bg_img):
    """Composite foreground (RGBA) onto background (RGB)."""
    # Scale foreground to fit background with some padding
    # Product should take up ~70% of the canvas for nice breathing room
    fg_w, fg_h = fg_img.size
    bg_w, bg_h = bg_img.size

    # Calculate scale to fit product at ~75% of canvas
    scale = min(bg_w * 0.75 / fg_w, bg_h * 0.75 / fg_h)
    new_w = int(fg_w * scale)
    new_h = int(fg_h * scale)

    # Use high-quality resampling
    fg_resized = fg_img.resize((new_w, new_h), Image.LANCZOS)

    # Center on background
    x = (bg_w - new_w) // 2
    y = (bg_h - new_h) // 2

    # Create result
    result = bg_img.copy()
    result.paste(fg_resized, (x, y), fg_resized)  # Use alpha channel as mask

    return result


def process_photo(src_path, out_path, dry_run=False):
    """Process a single photo: remove bg → Nothing Design bg → WebP."""
    if dry_run:
        print(f"  [dry] {src_path.name} → {out_path.name}")
        return True

    try:
        # Step 1: Remove background
        fg = remove_bg(src_path)

        # Step 2: Create Nothing Design background
        bg = create_nothing_bg(800, 800)

        # Step 3: Composite
        result = composite_on_bg(fg, bg)

        # Step 4: Save as WebP
        result.save(out_path, "WEBP", quality=85)
        print(f"  ✅ {src_path.name} → {out_path.name}")
        return True

    except Exception as e:
        print(f"  ❌ {src_path.name}: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Nothing Design photo processor")
    parser.add_argument("--dry-run", action="store_true", help="Preview only")
    parser.add_argument("--source", type=str, help="Custom source directory")
    args = parser.parse_args()

    source_dir = Path(args.source) if args.source else SOURCE_DIR
    dry_run = args.dry_run

    print(f"\n🎨 Nothing Design Photo Processor")
    print(f"   Source: {source_dir}")
    print(f"   Target: {PUBLIC_PRODUCTS}")
    if dry_run:
        print("   Mode: DRY RUN (no changes)")
    print()

    # Check source exists
    if not source_dir.exists():
        print(f"❌ Source directory not found: {source_dir}")
        sys.exit(1)

    # Import rembg early to fail fast
    if not dry_run:
        from rembg import remove
        print("   ✓ rembg loaded\n")

    # Process each folder
    total_ok = 0
    total_fail = 0
    skipped = 0

    folders = sorted([d for d in source_dir.iterdir() if d.is_dir()])
    print(f"📁 Found {len(folders)} photo folders\n")

    for folder in folders:
        folder_name = folder.name.lower().strip()
        slug = FOLDER_TO_SLUG.get(folder_name)

        if not slug:
            print(f"  ⚠  No slug mapping for: {folder.name}")
            skipped += 1
            continue

        # Get photo files
        photos = sorted([
            f for f in folder.iterdir()
            if f.suffix.lower() in (".jpg", ".jpeg", ".png")
        ])

        if not photos:
            print(f"  ⚠  No photos in: {folder.name}")
            skipped += 1
            continue

        print(f"📁 {folder.name} → {slug}")

        for i, photo in enumerate(photos, 1):
            out_path = PUBLIC_PRODUCTS / f"{slug}-{i}.webp"

            if dry_run:
                print(f"  [dry] {photo.name} → {out_path.name}")
                total_ok += 1
            else:
                success = process_photo(photo, out_path, dry_run)
                if success:
                    total_ok += 1
                else:
                    total_fail += 1

    # Summary
    print(f"\n{'='*55}")
    print(f" SUMMARY")
    print(f"{'='*55}\n")
    print(f"  Photos processed: {total_ok}")
    print(f"  Failed:           {total_fail}")
    print(f"  Skipped folders:  {skipped}")

    if dry_run:
        print(f"\n  ℹ  Dry run. Run without --dry-run to apply.")
    print()


if __name__ == "__main__":
    main()
