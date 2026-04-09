# Indonesian Marketplace Automation Suite

Automation tools for Tokopedia & TikTok Shop (commercial vehicle spare parts)

## Quick Start

### 1. Install Dependencies

```bash
cd ~/marketplace-automation
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Photo Processing

Place your product photos in `raw_photos/` folder, then:

```bash
python3 process_photos.py
```

Output: 4 size variants in `processed/` folder
- `tokopedia/` - 800x800 JPEG
- `tiktok/` - 1080x1920 JPEG
- `thumbnail/` - 300x300 JPEG
- `general/` - 1200x1200 JPEG

### 3. Generate Descriptions

```bash
python3 generate_descriptions.py
```

Output: AI-generated descriptions in `output/` folder
- `tokopedia/` - Professional 1500-2000 char descriptions
- `tiktok/` - Emoji-friendly 500-1000 char descriptions
- `all_listings.csv` - Summary CSV

## File Structure

```
marketplace-automation/
├── config.env              # API keys & settings
├── products.csv            # Your 80 product list
├── process_photos.py       # Photo processor
├── generate_descriptions.py # AI description generator
├── raw_photos/            # Put your photos here
├── processed/             # Photo outputs (auto-created)
│   ├── tokopedia/
│   ├── tiktok/
│   ├── thumbnail/
│   └── general/
└── output/                # Description outputs (auto-created)
    ├── tokopedia/
    ├── tiktok/
    └── all_listings.csv
```

## products.csv Format

Required columns:
- product_name
- part_number
- brand
- category
- vehicle_compatibility
- material
- weight_kg
- price_retail
- price_wholesale
- stock_qty
- condition
- oem_number
- key_features
- notes

## Customization

Edit `config.env` to change:
- Store name and location
- Watermark text
- NVIDIA model settings
- API delay timing

## Time Savings

| Task | Manual | Automated | Saved |
|------|--------|-----------|-------|
| 80 photos | 5+ hours | 10 min | 98% |
| 80 descriptions | 13+ hours | 45 min | 94% |
| **Total** | **18 hours** | **~1 hour** | **95%** |
