#!/usr/bin/env python3
"""
Product Photo Automation Tool for Tokopedia and TikTok Shop
Processes batch photos: resize, watermark, enhance, background removal
Author: AI Assistant
Date: April 2026
"""

import os
import sys
import argparse
import logging
from pathlib import Path
from typing import Optional, Tuple
import time
from datetime import datetime

from PIL import Image, ImageEnhance, ImageFilter, ImageDraw, ImageFont
import numpy as np

# Optional imports - handle gracefully if not available
try:
    from rembg import remove
    REMBG_AVAILABLE = True
except ImportError:
    REMBG_AVAILABLE = False
    print("[INFO] rembg not installed. Background removal disabled. Use: pip install rembg")

# Configuration
SUPPORTED_FORMATS = ('.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff', '.tif')
OUTPUT_FORMAT = 'JPEG'
OUTPUT_QUALITY = 85

# Size configurations
SIZES = {
    'tokopedia': (800, 800),      # Square for Tokopedia
    'tiktok': (1080, 1920),       # 9:16 vertical for TikTok
    'thumbnail': (300, 300),      # Small preview
    'general': (1200, 1200),      # Max dimension
}

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%H:%M:%S'
)
logger = logging.getLogger(__name__)


class PhotoProcessor:
    """Main photo processing class."""
    
    def __init__(self, watermark_text: Optional[str] = None, remove_bg: bool = False):
        self.watermark_text = watermark_text
        self.remove_bg = remove_bg and REMBG_AVAILABLE
        self.processed_count = 0
        self.error_count = 0
        self.skipped_count = 0
        
        if remove_bg and not REMBG_AVAILABLE:
            logger.warning("Background removal requested but rembg not available. Skipping.")
    
    def auto_enhance(self, img: Image.Image) -> Image.Image:
        """Apply auto-enhancement: brightness, contrast, sharpness."""
        # Auto brightness - aim for mid-range histogram
        img_array = np.array(img.convert('L'))
        mean_brightness = np.mean(img_array)
        
        if mean_brightness < 100:  # Too dark
            brightness_factor = 1.2
        elif mean_brightness > 200:  # Too bright
            brightness_factor = 0.9
        else:
            brightness_factor = 1.05
        
        enhancer = ImageEnhance.Brightness(img)
        img = enhancer.enhance(brightness_factor)
        
        # Slight contrast boost
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.1)
        
        # Sharpening for detail
        img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=100, threshold=3))
        
        return img
    
    def remove_background(self, img: Image.Image) -> Image.Image:
        """Remove background using rembg. Returns image with white bg."""
        if not self.remove_bg or not REMBG_AVAILABLE:
            return img
        
        try:
            # Remove background
            output = remove(img)
            
            # Create white background
            white_bg = Image.new('RGBA', output.size, (255, 255, 255, 255))
            
            # Paste removed background image onto white
            white_bg.paste(output, mask=output.split()[3])  # Use alpha channel as mask
            
            return white_bg.convert('RGB')
        except Exception as e:
            logger.error(f"Background removal failed: {e}")
            return img
    
    def add_watermark(self, img: Image.Image, text: str) -> Image.Image:
        """Add semi-transparent watermark to bottom-right corner."""
        if not text:
            return img
        
        # Make a copy to avoid modifying original
        img = img.copy().convert('RGBA')
        
        # Create overlay for watermark
        overlay = Image.new('RGBA', img.size, (255, 255, 255, 0))
        draw = ImageDraw.Draw(overlay)
        
        # Calculate font size based on image width
        font_size = max(20, img.width // 25)
        
        try:
            # Try system font first
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", font_size)
        except:
            try:
                font = ImageFont.truetype("/usr/share/fonts/TTF/DejaVuSans.ttf", font_size)
            except:
                font = ImageFont.load_default()
        
        # Get text bounding box
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        # Position: bottom-right with padding
        padding = img.width // 40
        x = img.width - text_width - padding
        y = img.height - text_height - padding
        
        # Draw semi-transparent white background for watermark
        bg_padding = 10
        draw.rectangle(
            [x - bg_padding, y - bg_padding, 
             x + text_width + bg_padding, y + text_height + bg_padding],
            fill=(255, 255, 255, 150)
        )
        
        # Draw text - dark gray
        draw.text((x, y), text, font=font, fill=(50, 50, 50, 200))
        
        # Composite overlay onto original
        img = Image.alpha_composite(img, overlay)
        
        return img.convert('RGB')
    
    def resize_tokopedia(self, img: Image.Image) -> Image.Image:
        """Resize to 800x800 square with letterboxing."""
        target_size = SIZES['tokopedia']
        return self._resize_with_padding(img, target_size, (255, 255, 255))
    
    def resize_tiktok(self, img: Image.Image) -> Image.Image:
        """Resize to 1080x1920 vertical 9:16 with letterboxing."""
        target_size = SIZES['tiktok']
        return self._resize_with_padding(img, target_size, (255, 255, 255))
    
    def resize_thumbnail(self, img: Image.Image) -> Image.Image:
        """Resize to 300x300 square."""
        target_size = SIZES['thumbnail']
        return self._resize_with_padding(img, target_size, (255, 255, 255))
    
    def resize_general(self, img: Image.Image) -> Image.Image:
        """Resize to max 1200px on longest side, maintaining aspect ratio."""
        max_size = SIZES['general'][0]
        img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
        return img
    
    def _resize_with_padding(self, img: Image.Image, target_size: Tuple[int, int], 
                             bg_color: Tuple[int, int, int]) -> Image.Image:
        """Resize image to target size with padding (letterbox)."""
        # Calculate scaling factor
        img_ratio = img.width / img.height
        target_ratio = target_size[0] / target_size[1]
        
        if img_ratio > target_ratio:
            # Image is wider than target - fit to width
            new_width = target_size[0]
            new_height = int(target_size[0] / img_ratio)
        else:
            # Image is taller than target - fit to height
            new_height = target_size[1]
            new_width = int(target_size[1] * img_ratio)
        
        # Resize image
        resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Create new image with background color
        new_img = Image.new('RGB', target_size, bg_color)
        
        # Calculate position to center the image
        x = (target_size[0] - new_width) // 2
        y = (target_size[1] - new_height) // 2
        
        # Paste resized image
        new_img.paste(resized, (x, y))
        
        return new_img
    
    def process_image(self, input_path: Path, output_dir: Path) -> bool:
        """Process a single image through all requested transformations."""
        try:
            # Open image
            with Image.open(input_path) as img:
                # Convert to RGB if necessary
                if img.mode in ('RGBA', 'P'):
                    img = img.convert('RGB')
                elif img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Store original filename (without extension)
                base_name = input_path.stem
                
                # Apply background removal if requested (before other processing)
                if self.remove_bg:
                    img = self.remove_background(img)
                
                # Auto-enhance
                img = self.auto_enhance(img)
                
                # Generate all output sizes
                outputs = {
                    f"{base_name}_tkp.jpg": self.resize_tokopedia(img),
                    f"{base_name}_tik.jpg": self.resize_tiktok(img),
                    f"{base_name}_thumb.jpg": self.resize_thumbnail(img),
                    f"{base_name}_gen.jpg": self.resize_general(img),
                }
                
                # Add watermark to Tokopedia and TikTok versions if specified
                if self.watermark_text:
                    outputs[f"{base_name}_tkp.jpg"] = self.add_watermark(
                        outputs[f"{base_name}_tkp.jpg"], self.watermark_text
                    )
                    outputs[f"{base_name}_tik.jpg"] = self.add_watermark(
                        outputs[f"{base_name}_tik.jpg"], self.watermark_text
                    )
                
                # Create output subdirectories
                for subdir in ['tokopedia', 'tiktok', 'thumbnail', 'general']:
                    (output_dir / subdir).mkdir(parents=True, exist_ok=True)
                
                # Save outputs
                save_paths = {
                    'tokopedia': output_dir / 'tokopedia' / f"{base_name}_tkp.jpg",
                    'tiktok': output_dir / 'tiktok' / f"{base_name}_tik.jpg",
                    'thumbnail': output_dir / 'thumbnail' / f"{base_name}_thumb.jpg",
                    'general': output_dir / 'general' / f"{base_name}_gen.jpg",
                }
                
                for key, img_out in outputs.items():
                    # Map filename to subdirectory
                    if '_tkp' in key:
                        save_path = save_paths['tokopedia']
                    elif '_tik' in key:
                        save_path = save_paths['tiktok']
                    elif '_thumb' in key:
                        save_path = save_paths['thumbnail']
                    else:
                        save_path = save_paths['general']
                    
                    # Skip if already exists
                    if save_path.exists():
                        logger.debug(f"Skipping (exists): {save_path.name}")
                        self.skipped_count += 1
                        continue
                    
                    # Save with quality setting
                    img_out.save(save_path, OUTPUT_FORMAT, quality=OUTPUT_QUALITY, optimize=True)
            
            self.processed_count += 1
            return True
            
        except Exception as e:
            logger.error(f"Failed to process {input_path.name}: {e}")
            self.error_count += 1
            return False
    
    def process_batch(self, input_dir: Path, output_dir: Path) -> None:
        """Process all images in input directory."""
        # Find all supported images
        image_files = []
        for ext in SUPPORTED_FORMATS:
            image_files.extend(input_dir.glob(f'*{ext}'))
            image_files.extend(input_dir.glob(f'*{ext.upper()}'))
        
        image_files = sorted(set(image_files))  # Remove duplicates, sort
        
        if not image_files:
            logger.warning(f"No supported images found in {input_dir}")
            return
        
        total = len(image_files)
        logger.info(f"Found {total} images to process")
        logger.info(f"Output directory: {output_dir.absolute()}")
        logger.info(f"Features: BG removal={self.remove_bg}, Watermark={bool(self.watermark_text)}")
        logger.info("-" * 50)
        
        start_time = time.time()
        
        for i, img_path in enumerate(image_files, 1):
            print(f"\r[{i}/{total}] Processing: {img_path.name:<40}", end='', flush=True)
            self.process_image(img_path, output_dir)
        
        elapsed = time.time() - start_time
        
        print()  # New line after progress
        logger.info("-" * 50)
        logger.info(f"Batch complete!")
        logger.info(f"  Processed: {self.processed_count}")
        logger.info(f"  Skipped (already exist): {self.skipped_count}")
        logger.info(f"  Errors: {self.error_count}")
        logger.info(f"  Time: {elapsed:.1f}s ({elapsed/max(1,total):.2f}s per image)")


def main():
    parser = argparse.ArgumentParser(
        description='Batch product photo processor for Tokopedia and TikTok Shop',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python process_photos.py --input raw_photos/ --output processed/
  python process_photos.py --input raw_photos/ --output processed/ --remove-bg --watermark "STORENAME"
  python process_photos.py --input raw_photos/ --output processed/ --watermark "LUXOR"
        """
    )
    
    parser.add_argument('--input', '-i', type=str, required=True,
                        help='Input directory containing raw photos')
    parser.add_argument('--output', '-o', type=str, required=True,
                        help='Output directory for processed photos')
    parser.add_argument('--remove-bg', '-r', action='store_true',
                        help='Remove background (requires rembg installed)')
    parser.add_argument('--watermark', '-w', type=str, default=None,
                        help='Watermark text to add to images')
    parser.add_argument('--border', '-b', action='store_true',
                        help='Add subtle border to product images (not yet implemented)')
    
    args = parser.parse_args()
    
    # Resolve paths
    input_dir = Path(args.input).expanduser().resolve()
    output_dir = Path(args.output).expanduser().resolve()
    
    # Validate input directory
    if not input_dir.exists():
        logger.error(f"Input directory does not exist: {input_dir}")
        sys.exit(1)
    
    if not input_dir.is_dir():
        logger.error(f"Input path is not a directory: {input_dir}")
        sys.exit(1)
    
    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Initialize processor
    processor = PhotoProcessor(
        watermark_text=args.watermark,
        remove_bg=args.remove_bg
    )
    
    # Process batch
    processor.process_batch(input_dir, output_dir)


if __name__ == '__main__':
    main()
