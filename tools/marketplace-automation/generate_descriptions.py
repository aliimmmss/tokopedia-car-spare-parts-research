#!/usr/bin/env python3
"""
AI Description Generator for Indonesian Marketplace
Uses NVIDIA NIM API to generate Bahasa Indonesia listings
"""

import os
import json
import time
import argparse
import pandas as pd
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI
from tqdm import tqdm

# Load environment
load_dotenv('config.env')

class DescriptionGenerator:
    def __init__(self):
        self.api_key = os.getenv('NVIDIA_API_KEY')
        self.api_base = os.getenv('NVIDIA_API_BASE', 'https://integrate.api.nvidia.com/v1')
        self.model = os.getenv('NVIDIA_MODEL', 'meta/llama-3.1-70b-instruct')
        
        if not self.api_key:
            raise ValueError("NVIDIA_API_KEY not found in config.env")
        
        self.client = OpenAI(
            base_url=self.api_base,
            api_key=self.api_key
        )
        
        self.store_name = os.getenv('STORE_NAME', 'Toko Suku Cadang')
        self.store_location = os.getenv('STORE_LOCATION', 'Bandung')
        self.experience = os.getenv('STORE_EXPERIENCE', '30 tahun')
    
    def generate_tokopedia_description(self, product):
        """Generate professional Tokopedia description"""
        prompt = self._build_prompt(product, 'tokopedia')
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "Kamu adalah penulis deskripsi produk professional untuk marketplace Indonesia. Tulis dalam Bahasa Indonesia yang formal, persuasif, dan SEO-friendly. Gunakan format dengan heading (HOOK, SPESIFIKASI, dll)."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.7,
                max_tokens=2048
            )
            
            return response.choices[0].message.content
        except Exception as e:
            return f"[ERROR] {str(e)}"
    
    def generate_tiktok_description(self, product):
        """Generate emoji-friendly TikTok description"""
        prompt = self._build_prompt(product, 'tiktok')
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "Kamu adalah content creator TikTok Shop Indonesia. Tulis deskripsi produk yang catchy, pakai emoji, bahasa gaul santai, singkat padat. Fokus pada keuntungan dan CTA yang kuat."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.8,
                max_tokens=1024
            )
            
            return response.choices[0].message.content
        except Exception as e:
            return f"[ERROR] {str(e)}"
    
    def _build_prompt(self, product, platform):
        """Build prompt for product"""
        base_prompt = f"""
Buat deskripsi produk untuk {platform.upper()}:

NAMA PRODUK: {product['product_name']}
NOMOR PART: {product['part_number']}
MERK: {product['brand']}
KATEGORI: {product['category']}
KOMPATIBILITAS: {product['vehicle_compatibility']}
MATERIAL: {product['material']}
BERAT: {product['weight_kg']} kg
HARGA RETAIL: {product['price_retail']}
HARGA GROSIR: {product['price_wholesale']}
STOK: {product['stock_qty']} unit
KONDISI: {product['condition']}
OEM NUMBER: {product.get('oem_number', 'N/A')}
FITUR UTAMA: {product.get('key_features', 'N/A')}
CATATAN: {product.get('notes', 'N/A')}

INFO TOKO:
- Nama: {self.store_name}
- Lokasi: {self.store_location}
- Pengalaman: {self.experience}
"""
        
        if platform == 'tokopedia':
            base_prompt += """

FORMAT TOKOPEDIA (1500-2000 karakter):
- HOOK: Judul menarik
- SPESIFIKASI: Detail teknis
- KOMPATIBILITAS: Merek, model, tahun kendaraan
- KEUNGGULAN: 3-5 poin keunggulan
- PENGIRIMAN: Estimasi (Jawa 1-3 hari, Sumatera 5-7 hari, dll)
- GARANSI: Informasi garansi
- CTA: Call-to-action ajakan beli

Gunakan Bahasa Indonesia formal (bukan "gue/lu").
"""
        else:  # tiktok
            base_prompt += """

FORMAT TIKTOK SHOP (500-1000 karakter):
- Caption menarik dengan emoji
- Highlight harga & promo
- Keunggulan singkat (3 poin)
- Hashtag #sukucadangtruk #sparepart #hino #isuzu dll
- CTA dengan urgency

Gunakan bahasa santai, friendly, banyak emoji.
"""
        
        return base_prompt
    
    def process_csv(self, csv_path, output_dir, marketplace='all'):
        """Process all products in CSV"""
        df = pd.read_csv(csv_path)
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        (output_path / 'tokopedia').mkdir(exist_ok=True)
        (output_path / 'tiktok').mkdir(exist_ok=True)
        
        results = []
        
        for idx, row in tqdm(df.iterrows(), total=len(df), desc="Generating"):
            product = row.to_dict()
            product_name = product['product_name'].replace(' ', '_').replace('/', '-')
            
            result = {
                'product_name': product['product_name'],
                'part_number': product['part_number'],
                'price_retail': product['price_retail'],
                'stock_qty': product['stock_qty']
            }
            
            # Generate Tokopedia description
            if marketplace in ('all', 'tokopedia'):
                time.sleep(1)  # Rate limiting
                tokopedia_desc = self.generate_tokopedia_description(product)
                tokopedia_file = output_path / 'tokopedia' / f"{product_name}.txt"
                with open(tokopedia_file, 'w', encoding='utf-8') as f:
                    f.write(tokopedia_desc)
                result['tokopedia_desc'] = tokopedia_desc[:200] + '...' if len(tokopedia_desc) > 200 else tokopedia_desc
            
            # Generate TikTok description
            if marketplace in ('all', 'tiktok'):
                time.sleep(1)  # Rate limiting
                tiktok_desc = self.generate_tiktok_description(product)
                tiktok_file = output_path / 'tiktok' / f"{product_name}.txt"
                with open(tiktok_file, 'w', encoding='utf-8') as f:
                    f.write(tiktok_desc)
                result['tiktok_desc'] = tiktok_desc[:100] + '...' if len(tiktok_desc) > 100 else tiktok_desc
            
            results.append(result)
        
        # Save summary
        summary_file = output_path / 'all_listings.csv'
        pd.DataFrame(results).to_csv(summary_file, index=False, encoding='utf-8-sig')
        
        print(f"\n✓ Done! Generated {len(df)} descriptions:")
        print(f"  - Tokopedia: {output_path}/tokopedia/")
        print(f"  - TikTok: {output_path}/tiktok/")
        print(f"  - Summary: {summary_file}")
        
        return results

def main():
    parser = argparse.ArgumentParser(description='Generate AI descriptions for marketplace listings')
    parser.add_argument('--csv', default='products.csv', help='Input CSV file')
    parser.add_argument('--output', default='output', help='Output directory')
    parser.add_argument('--marketplace', choices=['all', 'tokopedia', 'tiktok'], 
                       default='all', help='Target marketplace')
    
    args = parser.parse_args()
    
    try:
        generator = DescriptionGenerator()
        generator.process_csv(args.csv, args.output, args.marketplace)
    except Exception as e:
        print(f"Error: {e}")
        return 1
    
    return 0

if __name__ == '__main__':
    exit(main())
