# Product Photo Automation Tool

Batch photo processor for commercial vehicle spare parts. Prepares photos for Tokopedia, TikTok Shop, and other marketplaces.

**Purpose:** Convert phone photos (3000x4000) into marketplace-ready images in 4 formats with auto-enhancement and optional background removal.

---

## Installation

### Step 1: Clone and Setup

```bash
cd ~/product-photo-automation
python3 -m venv venv
source venv/bin/activate
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

**If `rembg` fails to install**, the script will still work. Background removal will be skipped gracefully:

```bash
# Alternative without rembg:
pip install Pillow numpy
```

### Step 3: Test Installation

```bash
python process_photos.py --help
```

---

## Usage

### Basic Usage

Process photos from `raw_photos/` folder and save to `processed/`:

```bash
python process_photos.py --input raw_photos/ --output processed/
```

### With Background Removal

```bash
python process_photos.py --input raw_photos/ --output processed/ --remove-bg
```

### With Watermark

```bash
python process_photos.py --input raw_photos/ --output processed/ --watermark "LUXOR"
```

### Full Options

```bash
python process_photos.py \
  --input raw_photos/ \
  --output processed/ \
  --remove-bg \
  --watermark "LUXOR AUTO"
```

---

## Output Folders

| Folder | Size | Use Case |
|--------|------|----------|
| `tokopedia/` | 800x800 px | Tokopedia main images. Square, white padding preserved |
| `tiktok/` | 1080x1920 px | TikTok Shop. Vertical 9:16 format |
| `thumbnail/` | 300x300 px | Catalog previews, quick browsing |
| `general/` | Max 1200px | Website, WhatsApp, other uses |

**Naming Convention:**
- Original: `brake_pad_hino.jpg`
- Tokopedia: `brake_pad_hino_tkp.jpg`
- TikTok: `brake_pad_hino_tik.jpg`
- Thumbnail: `brake_pad_hino_thumb.jpg`
- General: `brake_pad_hino_gen.jpg`

---

## Features

### ✅ Auto-Enhancement (Always On)
- **Auto-brightness:** Corrects under/over-exposed images
- **Contrast boost:** +10% for better visibility
- **Sharpening:** Unsharp mask for detail clarity
- Works on all photos automatically

### ✅ Background Removal (Optional, `--remove-bg`)
- Uses AI to remove background and replace with white
- Perfect for professional product listings
- Requires `rembg` installed
- Falls back gracefully if not available

### ✅ Smart Resizing
- **Letterboxing:** Never stretches images. White padding maintains aspect ratio
- **Aspect ratio preserved:** Images never distorted
- **Centered:** Products centered in frame

### ✅ Watermark (Optional)
- Semi-transparent text in bottom-right corner
- Not distracting, subtle branding
- Applied to Tokopedia and TikTok versions

### ✅ Batch Processing
- Processes entire folder at once
- Shows progress counter
- Skips already processed files
- Error handling: logs failures, continues processing

---

## Photo Tips for Marketplaces

### Lighting
- **Best:** Natural daylight near window, diffused
- **Acceptable:** Bright overhead lighting, no shadows
- **Avoid:** Direct sunlight (harsh shadows), yellow indoor lighting
- **Fixable:** Auto-enhancement corrects most lighting issues

### Angles
- **Primary shot:** Front view, eye level
- **Detail shots:** Side angles showing thickness/depth
- **Part number:** Close-up of any numbers/text
- **Installed:** If possible, show on vehicle

### Background
- **Best:** Clean white wall or seamless paper
- **Acceptable:** On shelf, in warehouse (real context)
- **Fixable:** Use `--remove-bg` flag for professional white background

### Resolution
- **Input:** 3000x4000 (phone camera) works perfectly
- **Output:** Optimized for web (85% JPEG quality)
- **File size:** Typically 200-800KB per output file

### Speed
- **Desktop:** ~5 seconds per photo
- **50 photos:** ~4-5 minutes
- **500 photos:** ~40-50 minutes

---

## Marketplace Specifications

### Tokopedia Requirements
| Spec | Requirement | Our Output |
|------|-------------|------------|
| Size | 800x800 px (minimum 500x500) | ✅ 800x800 |
| Aspect | Square 1:1 | ✅ Square with padding |
| Format | JPEG, PNG | ✅ JPEG |
| Size Limit | 5MB | ✅ ~200-800KB |
| Count | 1-9 photos per product | Use general folder for extras |

### TikTok Shop Requirements
| Spec | Requirement | Our Output |
|------|-------------|------------|
| Size | 1080x1920 px | ✅ 1080x1920 |
| Aspect | 9:16 or 3:4 | ✅ 9:16 vertical |
| Format | JPEG, PNG | ✅ JPEG |
| Video | Also supported | Create separately |
| Count | Up to 9 images | Use general folder for extras |

### Shopee Requirements (Future)
| Spec | Requirement | Compatibility |
|------|-------------|---------------|
| Size | 1024x1024 px | Use general folder, resize manually |
| Aspect | Square | Manual crop needed |
| Format | JPEG | ✅ Compatible |

---

## Workflow for Your Store

### Daily Workflow

1. **Photograph in batches** (20-50 products at a time)
2. **Copy to `raw_photos/` folder**
3. **Run processor:**
   ```bash
   python process_photos.py -i raw_photos/ -o processed/ -w "LUXOR"
   ```
4. **Upload `tokopedia/` folder** to Tokopedia
5. **Upload `tiktok/` folder** to TikTok Shop
6. **Archive processed photos** to dated folder
7. **Clear `raw_photos/`** and repeat

### File Organization

```
processed/
├── tokopedia/
│   ├── brake_pad_hino_tkp.jpg
│   ├── filter_oil_isuzu_tkp.jpg
│   └── ...
├── tiktok/
│   ├── brake_pad_hino_tik.jpg
│   └── ...
├── thumbnail/
│   └── ...
└── general/
    └── ...
```

---

## Troubleshooting

### "rembg not found"
Script continues without background removal. Install with:
```bash
pip install rembg
```

### Photos too dark
Auto-enhancement fixes this. For extreme cases, manually adjust in phone before processing.

### Blurry photos
Script adds sharpening, but cannot fix out-of-focus shots. Retake with steady hand.

### Watermark too big/large
Watermark auto-sizes based on image width. For different size, edit `font_size = max(20, img.width // 25)` in script.

### Processing takes too long
First time using rembg downloads AI model (~100MB). Subsequent runs are fast.

---

## Performance

- **50 photos:** 4-5 minutes
- **500 photos:** 40-50 minutes  
- **Memory:** ~200MB RAM
- **Storage:** Output ~4x input size (4 formats per photo)

| Format | Size | Quality |
|--------|------|---------|
| Phone original | 3-5 MB | 100% (large) |
| Tokopedia output | 200-500 KB | 85% (web optimized) |
| TikTok output | 300-600 KB | 85% (web optimized) |

---

## Recommended Setup

### For Bandung-based Store

**Lighting:**
- Warehouse with north-facing windows (non-direct sunlight)
- LED panel lights as backup for rainy days

**Station:**
- Table with white backdrop (paper roll)
- Phone tripod for consistent angles
- Optional: Lightbox for small parts

**Batch size:**
- 20-30 products per photography session
- Process immediately after shooting
- Upload same day

---

## Technical Details

- **Python:** 3.11+
- **PIL/Pillow:** Image processing
- **rembg:** AI background removal (optional)
- **WSL Compatible:** Tested on WSL2 Ubuntu

---

## License

Internal use for Luxor Automotive online store expansion.

---

## Support

Questions? Check the research docs in:
`~/tokopedia-car-spare-parts-research/`
