#!/usr/bin/env node
/**
 * process-new-photos.cjs
 *
 * Automated product photo workflow.
 * Scans photos-source/ (or a custom dir), matches folders to products,
 * resizes+converts to WebP, and updates products.ts.
 *
 * Usage:
 *   node scripts/process-new-photos.cjs                    # scan photos-source/
 *   node scripts/process-new-photos.cjs /path/to/photos    # scan custom dir
 *   node scripts/process-new-photos.cjs --dry-run          # preview only, no changes
 *
 * What it does:
 *   1. Scans all subfolders in the source directory
 *   2. For each folder, tries to match to an existing product (fuzzy name matching)
 *   3. If no match found → suggests a new product entry (needs your confirmation later)
 *   4. Processes photos: resize 800×800 center crop → WebP q80
 *   5. Saves to website/public/products/{slug}-{n}.webp
 *   6. Updates products.ts with new image paths (and new product entries if any)
 *   7. Reports summary
 *
 * Never deletes originals — photos-source/ stays untouched.
 */

const { readdir, stat, mkdir, readFile, writeFile } = require('fs/promises');
const { join, basename } = require('path');
const sharp = require('sharp');

// ── Config ──────────────────────────────────────────────────────────────
const PROJECT_ROOT = join(__dirname, '..', '..');
const PRODUCTS_FILE = join(__dirname, '..', 'lib', 'products.ts');
const PUBLIC_PRODUCTS = join(__dirname, '..', 'public', 'products');

const DRY_RUN = process.argv.includes('--dry-run');
const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
const SOURCE_DIR = args[0] || join(PROJECT_ROOT, 'photos-source');

// ── Helpers ─────────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[()\/,]+/g, ' ')     // remove parens, slashes, commas
    .replace(/[^a-z0-9\s-]/g, '')  // strip special chars
    .replace(/\s+/g, '-')          // spaces → hyphens
    .replace(/-+/g, '-')           // collapse multiple hyphens
    .replace(/^-|-$/g, '');        // trim leading/trailing hyphens
}

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
}

/** Fuzzy match score: how many tokens from `folder` appear in `productName` */
function matchScore(folderName, productName) {
  const folderTokens = normalize(folderName).split(' ').filter(t => t.length > 1);
  const productTokens = normalize(productName).split(' ').filter(t => t.length > 1);
  if (folderTokens.length === 0) return 0;

  let score = 0;
  let matched = 0;
  for (const ft of folderTokens) {
    // Exact token match (highest weight)
    if (productTokens.includes(ft)) {
      score += 2;
      matched++;
    }
    // Partial match (substring)
    else if (productTokens.some(pt => pt.includes(ft) || ft.includes(pt))) {
      score += 1;
      matched++;
    }
  }

  // Penalize if product has tokens NOT in folder (prevents false matches)
  const extraTokens = productTokens.filter(pt =>
    !folderTokens.some(ft => ft.includes(pt) || pt.includes(ft))
  );
  const penalty = extraTokens.length * 0.3;

  // Max possible score is folderTokens.length * 2
  const maxScore = folderTokens.length * 2;
  return Math.max(0, (score - penalty) / maxScore);
}

/** Parse products.ts to extract current product entries */
function parseProducts(tsContent) {
  const entries = [];
  const regex = /\{\s*id:\s*(\d+),\s*name:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*price:\s*(\d+),\s*quantity:\s*"([^"]+)",\s*images:\s*\[([^\]]*)\]\s*\}/g;
  let match;
  while ((match = regex.exec(tsContent)) !== null) {
    entries.push({
      id: parseInt(match[1]),
      name: match[2],
      category: match[3],
      brand: match[4],
      price: parseInt(match[5]),
      quantity: match[6],
      imagesRaw: match[7],
      fullMatch: match[0],
    });
  }
  return entries;
}

/** Get the slug from existing image paths, or derive from name */
function getSlug(entry) {
  // Try to extract slug from existing images
  const slugMatch = entry.imagesRaw.match(/\/products\/([a-z0-9-]+)-\d+\.webp/);
  if (slugMatch) return slugMatch[1];
  // Fallback: derive from name
  return slugify(entry.name);
}

/** Get next image number for a slug */
function getNextImageNumber(existingImages, slug) {
  const nums = existingImages
    .filter(p => p.includes(`/${slug}-`))
    .map(p => {
      const m = p.match(/-(\d+)\.webp/);
      return m ? parseInt(m[1]) : 0;
    });
  return nums.length > 0 ? Math.max(...nums) + 1 : 1;
}

// ── Main ────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔍 Scanning: ${SOURCE_DIR}`);
  if (DRY_RUN) console.log('   (dry run — no files will be modified)\n');

  // 1. Read current products.ts
  const tsContent = await readFile(PRODUCTS_FILE, 'utf-8');
  const products = parseProducts(tsContent);
  console.log(`📦 Found ${products.length} existing products in products.ts\n`);

  // 2. Scan source directory
  const entries = await readdir(SOURCE_DIR);
  const folders = [];
  for (const entry of entries) {
    const entryPath = join(SOURCE_DIR, entry);
    const entryStat = await stat(entryPath);
    if (entryStat.isDirectory()) folders.push(entry);
  }
  console.log(`📁 Found ${folders.length} photo folders\n`);

  // 3. Match folders to products
  const matched = [];    // { folder, product, slug, photos[] }
  const unmatched = [];  // { folder, bestScore, bestProduct }

  for (const folder of folders) {
    let bestScore = 0;
    let bestProduct = null;

    for (const product of products) {
      const score = matchScore(folder, product.name);
      if (score > bestScore) {
        bestScore = score;
        bestProduct = product;
      }
    }

    // Get photo files in folder
    const folderPath = join(SOURCE_DIR, folder);
    const files = (await readdir(folderPath))
      .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
      .sort();

    if (files.length === 0) {
      console.log(`⚠  Empty folder: ${folder}`);
      continue;
    }

    if (bestScore >= 0.5 && bestProduct) {
      const slug = getSlug(bestProduct);
      matched.push({ folder, product: bestProduct, slug, photos: files });
    } else {
      unmatched.push({ folder, bestScore, bestProduct, photos: files });
    }
  }

  // 4. Print matching results
  console.log('═══════════════════════════════════════════════════════');
  console.log(' MATCHED FOLDERS → PRODUCTS');
  console.log('═══════════════════════════════════════════════════════\n');

  for (const m of matched) {
    const existingCount = m.product.imagesRaw.split(',').filter(s => s.trim()).length;
    const nextNum = getNextImageNumber(
      m.product.imagesRaw.split(',').map(s => s.trim().replace(/"/g, '')),
      m.slug
    );
    console.log(`  📁 ${m.folder}`);
    console.log(`  →  #${m.product.id} "${m.product.name}"`);
    console.log(`     slug: ${m.slug}`);
    console.log(`     existing photos: ${existingCount}, adding: ${m.photos.length}`);
    console.log(`     new files: ${m.photos.map((f, i) => `${m.slug}-${nextNum + i}.webp`).join(', ')}`);
    console.log('');
  }

  if (unmatched.length > 0) {
    console.log('═══════════════════════════════════════════════════════');
    console.log(' ⚠  UNMATCHED FOLDERS (no product found)');
    console.log('═══════════════════════════════════════════════════════\n');

    for (const u of unmatched) {
      const suggestedSlug = slugify(u.folder);
      console.log(`  📁 ${u.folder}`);
      console.log(`     best match: ${u.bestProduct ? `"${u.bestProduct.name}" (${(u.bestScore * 100).toFixed(0)}%)` : 'none'}`);
      console.log(`     photos: ${u.photos.length} files`);
      console.log(`     suggested slug: ${suggestedSlug}`);
      console.log(`     → Add manually to products.ts, then re-run`);
      console.log('');
    }
  }

  // 5. Process matched photos
  console.log('═══════════════════════════════════════════════════════');
  console.log(' PROCESSING PHOTOS');
  console.log('═══════════════════════════════════════════════════════\n');

  if (!DRY_RUN) {
    await mkdir(PUBLIC_PRODUCTS, { recursive: true });
  }

  const imageUpdates = {};  // productId → new images array

  for (const m of matched) {
    const existingImages = m.product.imagesRaw
      .split(',')
      .map(s => s.trim().replace(/"/g, ''))
      .filter(s => s.length > 0);

    const nextNum = getNextImageNumber(existingImages, m.slug);
    const newImages = [];

    for (let i = 0; i < m.photos.length; i++) {
      const src = join(SOURCE_DIR, m.folder, m.photos[i]);
      const outName = `${m.slug}-${nextNum + i}.webp`;
      const outPath = join(PUBLIC_PRODUCTS, outName);

      if (DRY_RUN) {
        console.log(`  [dry] ${m.photos[i]} → ${outName}`);
      } else {
        await sharp(src)
          .resize(800, 800, { fit: 'cover', position: 'center' })
          .webp({ quality: 80 })
          .toFile(outPath);
        console.log(`  ✅ ${m.photos[i]} → ${outName}`);
      }

      newImages.push(`/products/${outName}`);
    }

    imageUpdates[m.product.id] = [...existingImages, ...newImages];
  }

  // 6. Update products.ts
  if (!DRY_RUN && Object.keys(imageUpdates).length > 0) {
    console.log('\n═══════════════════════════════════════════════════════');
    console.log(' UPDATING products.ts');
    console.log('═══════════════════════════════════════════════════════\n');

    let updatedContent = tsContent;

    for (const [productId, images] of Object.entries(imageUpdates)) {
      const product = products.find(p => p.id === parseInt(productId));
      if (!product) continue;

      const oldImagesStr = product.imagesRaw.trim();
      const newImagesStr = images.map(i => `"${i}"`).join(', ');

      // Replace the images array in the specific product line
      const oldLine = product.fullMatch;
      const newLine = oldLine.replace(
        /images:\s*\[[^\]]*\]/,
        `images: [${newImagesStr}]`
      );

      updatedContent = updatedContent.replace(oldLine, newLine);

      const added = images.length - product.imagesRaw.split(',').filter(s => s.trim()).length;
      console.log(`  ✅ #${product.id} "${product.name}": +${added} photos (total: ${images.length})`);
    }

    await writeFile(PRODUCTS_FILE, updatedContent, 'utf-8');
    console.log('\n  💾 products.ts saved');
  }

  // 7. Summary
  console.log('\n═══════════════════════════════════════════════════════');
  console.log(' SUMMARY');
  console.log('═══════════════════════════════════════════════════════\n');

  const totalPhotos = matched.reduce((sum, m) => sum + m.photos.length, 0);
  console.log(`  Folders scanned:  ${folders.length}`);
  console.log(`  Matched:          ${matched.length} (${totalPhotos} photos)`);
  console.log(`  Unmatched:        ${unmatched.length}`);
  console.log(`  Products updated: ${Object.keys(imageUpdates).length}`);

  if (unmatched.length > 0) {
    console.log(`\n  ⚠  ${unmatched.length} folders need manual product entries.`);
    console.log(`     Add them to products.ts, then re-run this script.`);
  }

  if (DRY_RUN) {
    console.log(`\n  ℹ  This was a dry run. Run without --dry-run to apply changes.`);
  }

  console.log('');
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
