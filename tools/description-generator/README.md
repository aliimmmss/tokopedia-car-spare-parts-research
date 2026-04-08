# AI Product Description Generator

AI-powered tool to generate marketplace-ready listings for commercial vehicle spare parts. Creates optimized descriptions for Tokopedia and TikTok Shop using NVIDIA NIM API.

---

## Features

### ✅ Tokopedia Listing Generator
- **Title:** SEO-optimized, up to 120 characters
- **Description:** 1500-2000 characters with:
  - Hook pembula tentang pentingnya suku cadang
  - Spesifikasi teknis dalam tabel
  - Daftar kompatibilitas kendaraan
  - 3-5 fitur utama
  - Info pengiriman dari Bandung
  - Garansi dan after-sales
  - CTA dengan pengalaman 30 tahun
- **SEO Tags:** Up to 10 search tags

### ✅ TikTok Shop Listing Generator
- **Title:** Punchy with emojis, up to 150 characters
- **Description:** 500-1000 characters:
  - Hook dengan emoji
  - Bullet points ringkas
  - Kompatibilitas highlights
  - 4-6 hashtag sesuai trend
  - Ajakan diskusi
- **Hashtags:** Optimized for TikTok discovery

### ✅ Batch Processing
- Process entire product catalog
- Output to organized folder structure
- Combined CSV export
- Error handling and retry logic

### ✅ Review Mode
- Preview generated content in terminal
- Option to regenerate if not satisfied
- Rich formatted display

---

## Installation

### Step 1: Clone and Setup

```bash
cd ~/product-description-generator
python3 -m venv venv
source venv/bin/activate
```

For Windows:
```cmd
venv\Scripts\activate
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 3: Configure API Key

Edit `config.json`:

```json
{
  "api_base": "https://integrate.api.nvidia.com/v1",
  "api_key": "nvapi-YOUR-ACTUAL-API-KEY",
  "model": "qwen/qwen3.5-397b-a17b",
  "language": "indonesian",
  "store_name": "LUXOR AUTO PARTS",
  "store_location": "Bandung",
  "shipping_partners": ["JNE", "J&T", "SiCepat"],
  "experience_years": 30,
  "specialties": ["Hino", "Isuzu", "Mitsubishi Fuso", "Toyota Dyna"]
}
```

**Get NVIDIA API Key:** https://build.nvidia.com/

### Step 4: Prepare Product Data

Edit `products.csv` with your inventory. Required columns:
- `product_name` - Nama produk
- `part_number` - Nomor spare part
- `brand` - Merek (Hino, Isuzu, etc)
- `category` - Kategori (Filters, Brake, Engine, Electrical, Body, Drivetrain)
- `vehicle_compatibility` - Kompabilitas kendaraan
- `material` - Material spare part
- `weight_kg` - Berat produk dalam kg
- `price_retail` - Harga retail
- `price_wholesale` - Harga grosir
- `stock_qty` - Jumlah stok
- `condition` - Kondisi (Baru/Bekas)
- `oem_number` - Nomor OEM
- `key_features` - Fitur utama (comma-separated)
- `notes` - Catatan internal

---

## Usage

### Generate All Products

```bash
python generate_descriptions.py --csv products.csv --all
```

Output:
```
output/
├── tokopedia/
│   ├── Filter_Oli_Hino_Dutro_tkp.txt
│   └── ...
├── tiktok/
│   ├── Filter_Oli_Hino_Dutro_tik.txt
│   └── ...
└── all_listings.csv
```

### Generate Single Product

```bash
python generate_descriptions.py --csv products.csv --product "Filter Oli Hino"
```

Shows preview in terminal. Press Enter to confirm or type 'r' to regenerate.

### Target Specific Marketplace

```bash
# Tokopedia only (title + description optimized)
python generate_descriptions.py --csv products.csv --all --marketplace tokopedia

# TikTok Shop only (title + description optimized)
python generate_descriptions.py --csv products.csv --all --marketplace tiktok
```

---

## Output Format

### Tokopedia File Format

```text
TITEL:
[Brand] [Product Name] [Part Number] - [Key Feature] [Vehicle Compatibility]

DESKRIPSI:
(Bahasa Indonesia, professional, 1500-2000 chars)

TAGS:
tag1,tag2,tag3,...
```

### TikTok Shop File Format

```text
TITEL:
[Brand] [Product] 💯 Original 🔥 Ready [Stock]

DESKRIPSI:
(Bahasa Indonesia, emoji-friendly, 500-1000 chars)

HASHTAGS:
#Tag1 #Tag2 #Tag3...
```

---

## Prompt Customization

Edit `listing_prompt.txt` to customize:
- Tone of voice
- Store-specific information
- Product messaging
- Shipping expectations

Default prompt emphasizes:
- Bahasa Indonesia only
- Professional yet approachable
- Technical specifications
- 30 years of experience
- Original quality parts

---

## Performance

- **20 products:** ~3-4 minutes
- **50 products:** ~8-10 minutes  
- **100 products:** ~15-20 minutes

API rate limiting: ~1 second delay between calls

---

## Tokopedia SEO Tips

### Title Optimization
- Max 120 characters
- Include: Brand + Product + Part Number + Key Benefit
- Example: "Hino Filter Oli Hino 300 Series OF-H300-01 - Sintetik 10.000km Hino Dutro 2008-2024"

### Description Structure
1. Hook (mengapa penting)
2. Spesifikasi tabel
3. Kompatibilitas lengkap
4. Fitur bullet points
5. Pengiriman info
6. Garansi
7. Kenapa beli di kita

### Tags (Max 10)
- Brand name
- Part type
- Vehicle models
- Generic keywords

---

## TikTok Shop Tips

### Mobile-Optimized
- Short paragraphs
- Lots of emojis
- Clear bullet points
- 4-6 relevant hashtags

### Engagement
- End with question
- "Komen di bawah!"
- Show personality

---

## Example Workflow

### Daily Workflow

1. **Prepare CSV:** Update stock quantities, add new products
2. **Generate descriptions:**
   ```bash
   python generate_descriptions.py --csv products.csv --all
   ```
3. **Review output:** Check `output/` folder
4. **Copy to marketplace:**
   - Tokopedia: Use text from `tokopedia/` files
   - TikTok: Use text from `tiktok/` files
5. **Update CSV:** Mark products as "listed"

### For New Products Only

```bash
# Add new rows to products.csv
# Then generate specific products:
python generate_descriptions.py --csv products.csv --product "Kampas Rem"
```

---

## Troubleshooting

### "API Key not configured"
- Edit `config.json`
- Replace `YOUR_NVIDIA_API_KEY_HERE` with actual key
- Get key from https://build.nvidia.com/

### "Product not found"
- Check exact spelling in CSV
- Use partial match: `--product "Oli"` matches "Filter Oli Hino"

### API Rate Limits
- Script has built-in delays
- If errors persist, increase delay between calls
- Free NVIDIA tier has rate limits

### Slow Generation
- Expected: ~5-10 seconds per product
- First API call downloads model
- Subsequent calls are faster

---

## File Structure

```
product-description-generator/
├── config.json              # API settings
├── products.csv             # Product database
├── listing_prompt.txt       # System prompt
├── generate_descriptions.py # Main script
├── requirements.txt         # Dependencies
├── README.md               # This file
├── output/                  # Generated listings
│   ├── tokopedia/
│   ├── tiktok/
│   └── all_listings.csv
└── venv/                   # Virtual environment
```

---

## Sample CSV

```csv
product_name,part_number,brand,category,vehicle_compatibility,material,weight_kg,price_retail,price_wholesale,stock_qty,condition,oem_number,key_features,notes
Filter Oli Hino Dutro,15613-LAA70,Hino,Filters,"Hino Dutro 2005-2024",Sintetik,0.3,55250,45000,45,Baru,15613-LAA70,"Sintetik 10.000km, Premium",Fast mover
```

---

## API Costs

This tool uses NVIDIA NIM API:
- First 10,000 credits free
- ~50 credits per description
- 20 products = ~1000 credits
- Sign up: https://build.nvidia.com/

---

## Support

Questions? Check the research docs in:
`~/tokopedia-car-spare-parts-research/`

---

## License

Internal use for Luxor Automotive online store expansion.
