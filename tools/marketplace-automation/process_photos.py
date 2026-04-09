#!/usr/bin/env python3
"""
Photo Processor for Indonesian Marketplace
Converts phone photos to Tokopedia & TikTok Shop specs
"""

import os
import argparse
from pathlib import Path
from PIL import Image, ImageEnhance
from tqdm import tqdm
import sys

# Disable rembg warnings
os.environ['ONNXRUNTIME_LOGGING_LEVEL'] = '3'

class PhotoProcessor:
    def __init__(self, watermark_text="", remove_bg=False):
        self.watermark_text = watermark_text
        self.remove_bg = remove_bg
        self.bg_remover = None
        
        if remove_bg:
            try:
                from rembg import remove
                self.bg_remover = remove
            except ImportError:
                print("Warning: rembg not installed. Background removal disabled.")
                self.remove_bg = False
    
    def process_image(self, input_path, output_dir, sizes=None):
        """Process single image into multiple sizes"""
        if sizes is None:
            sizes = {
                'tokopedia': (800, 800),
                'tiktok': (1080, 1920),
                'thumbnail': (300, 300),
                'general': (1200, 1200)
            }
        
        try:
            img = Image.open(input_path)
            if img.mode in ('RGBA', 'LA'):
                img = img.convert('RGB')
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Background removal if enabled
            if self.remove_bg and self.bg_remover:
                img = self.bg_remover(img)
                img = img.convert('RGB')
            
            # Auto enhancement
            enhancer = ImageEnhance.Brightness(img)
            img = enhancer.enhance(1.1)
            enhancer = ImageEnhance.Contrast(img)
            img = enhancer.enhance(1.1)
            enhancer = ImageEnhance.Sharpness(img)
            img = enhancer.enhance(1.2)
            
            base_name = Path(input_path).stem
            results = {}
            
            for size_name, target_size in sizes.items():
                # Calculate aspect ratios
                img_ratio = img.width / img.height
                target_ratio = target_size[0] / target_size[1]
                
                # Resize maintaining aspect ratio with padding
                if img_ratio > target_ratio:
                    new_width = target_size[0]
                    new_height = int(target_size[0] / img_ratio)
                else:
                    new_height = target_size[1]
                    new_width = int(target_size[1] * img_ratio)
                
                resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                
                # Create white background and paste centered
                final = Image.new('RGB', target_size, (255, 255, 255))
                paste_x = (target_size[0] - new_width) // 2
                paste_y = (target_size[1] - new_height) // 2
                final.paste(resized, (paste_x, paste_y))
                
                # Add watermark if specified
                if self.watermark_text:
                    from PIL import ImageDraw, ImageFont
                    draw = ImageDraw.Draw(final)
                    try:
                        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 20)
                    except:
                        font = ImageFont.load_default()
                    bbox = draw.textbbox((0, 0), self.watermark_text, font=font)
                    text_width = bbox[2] - bbox[0]
                    text_height = bbox[3] - bbox[1]
                    x = (target_size[0] - text_width) // 2
                    y = target_size[1] - text_height - 20
                    draw.text((x, y), self.watermark_text, fill=(128, 128, 128), font=font)
                
                # Save
                output_path = output_dir / size_name / f"{base_name}.jpg"
                output_path.parent.mkdir(parents=True, exist_ok=True)
                final.save(output_path, 'JPEG', quality=90, optimize=True)
                results[size_name] = str(output_path)
            
            return results
            
        except Exception as e:
            print(f"\nError processing {input_path}: {e}")
            return None
    
    def process_batch(self, input_dir, output_dir):
        """Process all images in directory"""
        input_path = Path(input_dir)
        output_path = Path(output_dir)
        
        image_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.webp'}
        images = [f for f in input_path.iterdir() if f.suffix.lower() in image_extensions]
        
        if not images:
            print(f"No images found in {input_dir}")
            return
        
        print(f"Processing {len(images)} images...")
        
        for img_file in tqdm(images, desc="Processing"):
            self.process_image(img_file, output_path)
        
        print(f"\n✓ Done! Processed images in: {output_path}")
        print(f"  - tokopedia/    (800x800)")
        print(f"  - tiktok/       (1080x1920)")
        print(f"  - thumbnail/    (300x300)")
        print(f"  - general/      (1200x1200)")

def main():
    parser = argparse.ArgumentParser(description='Process photos for Indonesian marketplaces')
    parser.add_argument('-i', '--input', default='raw_photos', help='Input directory (default: raw_photos)')
    parser.add_argument('-o', '--output', default='processed', help='Output directory (default: processed)')
    parser.add_argument('--remove-bg', action='store_true', help='Remove background (requires rembg)')
    parser.add_argument('--watermark', default='', help='Watermark text')
    
    args = parser.parse_args()
    
    processor = PhotoProcessor(
        watermark_text=args.watermark,
        remove_bg=args.remove_bg
    )
    
    processor.process_batch(args.input, args.output)

if __name__ == '__main__':
    main()
