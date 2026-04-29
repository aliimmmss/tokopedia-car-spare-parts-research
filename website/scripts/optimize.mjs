import sharp from 'sharp';
import { readdir, unlink, stat } from 'fs/promises';
import { join, parse } from 'path';

const PRODUCTS_DIR = 'public/products';

async function main() {
  const files = await readdir(PRODUCTS_DIR);
  const images = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  if (images.length === 0) {
    console.log('No .jpg/.jpeg/.png files found in public/products/');
    console.log('Nothing to optimize.');
    return;
  }

  console.log(`Found ${images.length} image(s) to optimize.\n`);

  let success = 0;
  let failed = 0;

  for (const file of images) {
    const inputPath = join(PRODUCTS_DIR, file);
    const { name } = parse(file);
    const outputPath = join(PRODUCTS_DIR, `${name}.webp`);

    try {
      await sharp(inputPath)
        .resize(800, 800, {
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: 80 })
        .toFile(outputPath);

      const inputStat = await stat(inputPath);
      const outputStat = await stat(outputPath);
      const saved = ((1 - outputStat.size / inputStat.size) * 100).toFixed(1);

      console.log(`✅ ${file} → ${name}.webp (${saved}% smaller)`);

      // Remove original after successful conversion
      await unlink(inputPath);
      success++;
    } catch (err) {
      console.error(`❌ ${file}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${success} optimized, ${failed} failed.`);
}

main().catch(console.error);
