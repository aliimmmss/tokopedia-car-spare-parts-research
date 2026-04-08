#!/usr/bin/env python3
"""
AI-Powered Product Description Generator for Tokopedia and TikTok Shop
Commercial Vehicle Spare Parts - Bandung, Indonesia

Author: AI Assistant
Date: April 2026
"""

import os
import sys
import json
import argparse
import time
from pathlib import Path
from typing import Optional, Dict, List
import csv
import re

import pandas as pd
from openai import OpenAI
from rich import print as rprint
from rich.console import Console
from rich.panel import Panel
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich.table import Table

# Initialize Rich console
console = Console()

class DescriptionGenerator:
    """AI-powered description generator using NVIDIA NIM API."""
    
    def __init__(self, config_path: str = "config.json"):
        self.config = self._load_config(config_path)
        self.client = self._init_client()
        self.system_prompt = self._load_prompt()
        self.generated_count = 0
        self.error_count = 0
    
    def _load_config(self, path: str) -> Dict:
        """Load configuration from JSON file."""
        try:
            with open(path, 'r', encoding='utf-8') as f:
                config = json.load(f)
            console.print(f"[green]✓[/green] Config loaded: {Path(path).name}")
            return config
        except FileNotFoundError:
            console.print(f"[red]✗ Config file not found: {path}[/red]")
            sys.exit(1)
        except json.JSONDecodeError as e:
            console.print(f"[red]✗ Invalid JSON in config: {e}[/red]")
            sys.exit(1)
    
    def _init_client(self) -> OpenAI:
        """Initialize OpenAI client with NVIDIA NIM API."""
        api_key = self.config.get('api_key', '').strip()
        api_base = self.config.get('api_base', '').strip()
        
        if not api_key or api_key == "YOUR_NVIDIA_API_KEY_HERE":
            console.print(Panel(
                "[red]API Key not configured![/red]\n"
                "Please set your NVIDIA API key in config.json:\n"
                '\"api_key\": \"your-actual-nvidia-api-key\"',
                title="Configuration Error",
                border_style="red"
            ))
            sys.exit(1)
        
        try:
            client = OpenAI(
                api_key=api_key,
                base_url=api_base,
            )
            console.print(f"[green]✓[/green] NVIDIA NIM API configured: {api_base}")
            return client
        except Exception as e:
            console.print(f"[red]✗ Failed to initialize API client: {e}[/red]")
            sys.exit(1)
    
    def _load_prompt(self) -> str:
        """Load system prompt from file."""
        prompt_file = Path('listing_prompt.txt')
        if prompt_file.exists():
            with open(prompt_file, 'r', encoding='utf-8') as f:
                return f.read()
        else:
            # Use default prompt if file not found
            return self._default_prompt()
    
    def _default_prompt(self) -> str:
        """Default system prompt if file not found."""
        return """Kamu adalah copywriter profesional untuk toko spare parts kendaraan komersial.
Tulis deskripsi produk dalam Bahasa Indonesia yang profesional namun mudah dipahami.
Selalu sebutkan kompatibilitas kendaraan, nomor part OEM, dan manfaat utama.
Tekankan kualitas original dan pengalaman toko 30 tahun.
Sertakan informasi pengiriman dari Bandung."""
    
    def _call_api(self, prompt: str, temperature: float = 0.7) -> str:
        """Call NVIDIA NIM API with retry logic."""
        max_retries = 3
        retry_delay = 2
        
        for attempt in range(max_retries):
            try:
                response = self.client.chat.completions.create(
                    model=self.config['model'],
                    messages=[
                        {"role": "system", "content": self.system_prompt},
                        {"role": "user", "content": prompt}
                    ],
                    temperature=temperature,
                    max_tokens=2000,
                )
                return response.choices[0].message.content.strip()
            except Exception as e:
                if attempt < max_retries - 1:
                    console.print(f"[yellow]API attempt {attempt + 1} failed, retrying...[/yellow]")
                    time.sleep(retry_delay)
                    retry_delay *= 2  # Exponential backoff
                else:
                    console.print(f"[red]API error after {max_retries} attempts: {e}[/red]")
                    return f"[ERROR: {e}]"
        return ""
    
    def _generate_tokopedia_title(self, row: pd.Series) -> str:
        """Generate Tokopedia title format."""
        product_name = row['product_name']
        part_number = row['part_number']
        brand = row['brand']
        vehicle = row['vehicle_compatibility'].split(',')[0] if ',' in str(row['vehicle_compatibility']) else row['vehicle_compatibility']
        
        # Clean and format
        title = f"{brand} {product_name} {part_number} - {vehicle}"[:120]  # Max 120 chars
        return title
    
    def _generate_tokopedia_description(self, row: pd.Series) -> str:
        """Generate full Tokopedia description using AI."""
        prompt = f"""Buat deskripsi produk untuk Tokopedia untuk:

PRODUK: {row['product_name']}
BRAND: {row['brand']}
NOMOR PART: {row['part_number']}
OEM: {row['oem_number']}
KATEGORI: {row['category']}
KOMPATIBILITAS: {row['vehicle_compatibility']}
MATERIAL: {row['material']}
BERAT: {row['weight_kg']} kg
KONDISI: {row['condition']}
FITUR UTAMA: {row['key_features']}
NOTES: {row['notes']}
STORE NAME: {self.config['store_name']}
LOKASI: {self.config['store_location']}
PENGALAMAN: {self.config['experience_years']} tahun

Format deskripsi (1500-2000 karakter):
1. Hook pembuka mengenai pentingnya suku cadang ini
2. Spesifikasi lengkap dalam format tabel atau bullet points
3. Daftar kompatibilitas kendaraan
4. 3-5 fitur utama dalam bullet points
5. Info isi paket dan kondisi
6. Info pengiriman dari Bandung (Jawa 1-3 hari, Sumatra 5-7 hari, Kalimantan 5-8 hari)
7. Garansi 7 hari banding untuk barang cacat
8. CTA - kenapa membeli dari kami (30 tahun pengalaman, stok asli, fast response)

Tuliskan dalam Bahasa Indonesia profesional namun mudah dipahami. Jangan pakai bahasa Inggris."""
        
        return self._call_api(prompt, temperature=0.7)
    
    def _generate_tiktok_title(self, row: pd.Series) -> str:
        """Generate TikTok Shop title format (shorter, punchier)."""
        parts = []
        parts.append(f"{row['brand']} {row['product_name']}")
        parts.append(f"💯 Original")
        parts.append(f"🔥 Ready {row['stock_qty']}")
        
        # Add key feature if short enough
        key_features_short = str(row['key_features']).split(',')[0] if ',' in str(row['key_features']) else str(row['key_features'])[:30]
        
        title = " | ".join(parts)[:150]  # Max 150 chars for TikTok
        return title
    
    def _generate_tiktok_description(self, row: pd.Series) -> str:
        """Generate TikTok Shop description using AI."""
        prompt = f"""Buat deskripsi produk untuk TikTok Shop untuk:

PRODUK: {row['product_name']}
BRAND: {row['brand']}
NOMOR PART: {row['part_number']}
KATEGORI: {row['category']}
KOMPATIBILITAS: {row['vehicle_compatibility']}
MATERIAL: {row['material']}
BERAT: {row['weight_kg']} kg
KONDISI: {row['condition']}
FITUR UTAMA: {row['key_features']}

Format:
1. Hook pendek yang menarik perhatian dengan emoji (500-1000 karakter)
2. Spesifikasi dalam bullet points pendek dengan emoji
3. Kompatibilitas kendaraan bulanan
4. Tambahkan emoji yang relevan di setiap baris
5. 4-6 hashtag yang sesuai (contoh: #SparePartTruk #HinoParts #BengkelBandung #SukuCadangKomersial #TruckPartsOriginal)
6. Ajak diskusi di akhir ("Ada pertanyaan? Komen di bawah!")

Gunakan gaya Bahasa Indonesia yang santai dan engaging TAPI tetap profesional."""
        
        return self._call_api(prompt, temperature=0.8)
    
    def _generate_seo_tags(self, row: pd.Series) -> List[str]:
        """Generate SEO tags for Tokopedia (up to 10)."""
        tags = [
            row['brand'].lower(),
            row['category'].lower().replace(' ', ''),
            row['part_number'].lower(),
        ]
        
        # Add vehicle models
        vehicles = str(row['vehicle_compatibility']).split(',')
        for v in vehicles[:3]:
            v_clean = v.strip().lower().split()[-1] if ' ' in v.strip() else v.strip().lower()
            if v_clean and len(v_clean) > 2:
                tags.append(v_clean)
        
        # Add generic tags
        tags.extend([
            'spare part truk',
            'suku cadang komersial',
            'truck parts',
            'spare part original',
            'bengkel bandung',
        ])
        
        return list(set(tags))[:10]  # Max 10 tags
    
    def _generate_hashtags(self, row: pd.Series) -> List[str]:
        """Generate hashtags for TikTok Shop (up to 8)."""
        hashtags = [
            f"#{row['brand']}Parts",  # #HinoParts
            f"#{row['category'].replace(' ', '')}",  # #Filters
            "#SparePartTruk",
            "#TruckPartsOriginal",
            "#SukuCadangKomersial",
            "#BengkelBandung",
            "#AutoPartsJakarta",
            "#TruckMaintenance",
        ]
        return hashtags[:8]
    
    def generate_single_product(self, product_name: str, df: pd.DataFrame) -> Optional[Dict]:
        """Generate descriptions for a single product."""
        # Find product in dataframe
        matches = df[df['product_name'].str.contains(product_name, case=False, na=False)]
        
        if matches.empty:
            console.print(f"[red]Product '{product_name}' not found in CSV[/red]")
            return None
        
        row = matches.iloc[0]
        
        console.print(f"\n[bold]Generating descriptions for: {row['product_name']}[/bold]")
        console.print(f"Brand: {row['brand']} | Part: {row['part_number']}")
        
        # Generate all content
        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            console=console,
        ) as progress:
            task = progress.add_task("Generating Tokopedia description...", total=None)
            tokopedia_desc = self._generate_tokopedia_description(row)
            progress.update(task, description="Generating TikTok Shop description...")
            time.sleep(0.5)  # Small delay between API calls
            tiktok_desc = self._generate_tiktok_description(row)
            progress.update(task, description="Generating titles and tags...")
            time.sleep(0.5)
            tokopedia_title = self._generate_tokopedia_title(row)
            tiktok_title = self._generate_tiktok_title(row)
            seo_tags = self._generate_seo_tags(row)
            hashtags = self._generate_hashtags(row)
        
        result = {
            'product_name': row['product_name'],
            'brand': row['brand'],
            'part_number': row['part_number'],
            'tokopedia_title': tokopedia_title,
            'tokopedia_description': tokopedia_desc,
            'tiktok_title': tiktok_title,
            'tiktok_description': tiktok_desc,
            'seo_tags': seo_tags,
            'hashtags': hashtags,
        }
        
        # Display result
        self._display_single_product(result)
        
        return result
    
    def _display_single_product(self, result: Dict):
        """Display generated content for review."""
        console.print("\n" + "=" * 60)
        console.print(f"[bold cyan]Tokopedia Listing:[/bold cyan]")
        console.print(Panel(
            f"[bold]{result['tokopedia_title']}[/bold]\n\n{result['tokopedia_description'][:500]}...",
            title="Title + Description Preview",
            border_style="cyan"
        ))
        console.print(f"SEO Tags: {', '.join(result['seo_tags'])}")
        
        console.print(f"\n[bold magenta]TikTok Shop Listing:[/bold magenta]")
        console.print(Panel(
            f"[bold]{result['tiktok_title']}[/bold]\n\n{result['tiktok_description'][:400]}...",
            title="Title + Description Preview",
            border_style="magenta"
        ))
        console.print(f"Hashtags: {' '.join(result['hashtags'])}")
    
    def generate_all(self, df: pd.DataFrame, output_dir: str = "output") -> pd.DataFrame:
        """Generate descriptions for all products."""
        total = len(df)
        console.print(f"\n[bold]Generating descriptions for {total} products...[/bold]\n")
        
        results = []
        
        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            console=console,
        ) as progress:
            task = progress.add_task("Processing products...", total=total)
            
            for idx, row in df.iterrows():
                product_name = row['product_name']
                progress.update(task, description=f"[{idx+1}/{total}] {product_name[:40]}...")
                
                try:
                    # Generate content
                    tokopedia_title = self._generate_tokopedia_title(row)
                    tiktok_title = self._generate_tiktok_title(row)
                    tokopedia_desc = self._generate_tokopedia_description(row)
                    time.sleep(1)  # Rate limiting between API calls
                    tiktok_desc = self._generate_tiktok_description(row)
                    seo_tags = self._generate_seo_tags(row)
                    hashtags = self._generate_hashtags(row)
                    
                    results.append({
                        'product_name': product_name,
                        'brand': row['brand'],
                        'part_number': row['part_number'],
                        'category': row['category'],
                        'tokopedia_title': tokopedia_title,
                        'tokopedia_description': tokopedia_desc,
                        'tiktok_title': tiktok_title,
                        'tiktok_description': tiktok_desc,
                        'seo_tags': ','.join(seo_tags),
                        'hashtags': ' '.join(hashtags),
                    })
                    
                    self.generated_count += 1
                    
                except Exception as e:
                    console.print(f"[red]Error with {product_name}: {e}[/red]")
                    self.error_count += 1
                
                time.sleep(0.5)  # Rate limiting
                progress.update(task, advance=1)
        
        # Create output
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        # Save individual files
        tokopedia_dir = output_path / 'tokopedia'
        tiktok_dir = output_path / 'tiktok'
        tokopedia_dir.mkdir(exist_ok=True)
        tiktok_dir.mkdir(exist_ok=True)
        
        for result in results:
            # Tokopedia file
            safe_name = re.sub(r'[^\w\s-]', '', result['product_name']).strip().replace(' ', '_')
            
            tokopedia_file = tokopedia_dir / f"{safe_name}_tkp.txt"
            with open(tokopedia_file, 'w', encoding='utf-8') as f:
                f.write(f"TITEL:\n{result['tokopedia_title']}\n\n")
                f.write(f"DESKRIPSI:\n{result['tokopedia_description']}\n\n")
                f.write(f"TAGS:\n{result['seo_tags']}\n")
            
            # TikTok file
            tiktok_file = tiktok_dir / f"{safe_name}_tik.txt"
            with open(tiktok_file, 'w', encoding='utf-8') as f:
                f.write(f"TITEL:\n{result['tiktok_title']}\n\n")
                f.write(f"DESKRIPSI:\n{result['tiktok_description']}\n\n")
                f.write(f"HASHTAGS:\n{result['hashtags']}\n")
        
        # Save combined CSV
        df_out = pd.DataFrame(results)
        csv_path = output_path / 'all_listings.csv'
        df_out.to_csv(csv_path, index=False, encoding='utf-8-sig')
        
        # Summary
        console.print("\n" + "=" * 60)
        console.print(Panel(
            f"[bold green]Batch Complete![/bold green]\n\n"
            f"✓ Generated: {self.generated_count}\n"
            f"✗ Errors: {self.error_count}\n\n"
            f"Output files:\n"
            f"• {tokopedia_dir}: {len(results)} Tokopedia listings\n"
            f"• {tiktok_dir}: {len(results)} TikTok Shop listings\n"
            f"• {csv_path}: Combined data",
            title="Generation Summary",
            border_style="green"
        ))
        
        return df_out


def main():
    parser = argparse.ArgumentParser(
        description='AI Product Description Generator for Commercial Vehicle Parts',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python generate_descriptions.py --csv products.csv --all
  python generate_descriptions.py --csv products.csv --product "Filter Oli Hino"
  python generate_descriptions.py --csv products.csv --marketplace tokopedia
        """
    )
    
    parser.add_argument('--csv', '-c', type=str, required=True,
                        help='Path to products CSV file')
    parser.add_argument('--output', '-o', type=str, default='output',
                        help='Output directory for generated listings')
    parser.add_argument('--all', '-a', action='store_true',
                        help='Generate descriptions for all products')
    parser.add_argument('--product', '-p', type=str,
                        help='Generate for specific product (search by name)')
    parser.add_argument('--marketplace', '-m', type=str, choices=['tokopedia', 'tiktok', 'both'],
                        default='both', help='Target marketplace (default: both)')
    parser.add_argument('--config', type=str, default='config.json',
                        help='Config file path (default: config.json)')
    
    args = parser.parse_args()
    
    # Welcome banner
    console.print(Panel.fit(
        "[bold blue]AI Product Description Generator[/bold blue]\n"
        "Commercial Vehicle Spare Parts - Tokopedia & TikTok Shop\n"
        "Powered by NVIDIA NIM API",
        border_style="blue"
    ))
    
    # Initialize generator
    generator = DescriptionGenerator(args.config)
    
    # Load CSV
    csv_path = Path(args.csv)
    if not csv_path.exists():
        console.print(f"[red]CSV file not found: {csv_path}[/red]")
        sys.exit(1)
    
    try:
        df = pd.read_csv(csv_path)
        console.print(f"[green]✓[/green] Loaded {len(df)} products from {csv_path.name}\n")
    except Exception as e:
        console.print(f"[red]Error loading CSV: {e}[/red]")
        sys.exit(1)
    
    # Execute based on mode
    if args.product:
        result = generator.generate_single_product(args.product, df)
        if result:
            # Ask if user is satisfied
            console.print("\n[cyan]Press Enter if satisfied, or type 'r' to regenerate...[/cyan]", end=' ')
            choice = input().lower().strip()
            if choice == 'r':
                result = generator.generate_single_product(args.product, df)
    
    elif args.all:
        generator.generate_all(df, args.output)
    
    else:
        console.print("[yellow]No action specified. Use --all or --product[/yellow]")
        parser.print_help()


if __name__ == '__main__':
    main()
