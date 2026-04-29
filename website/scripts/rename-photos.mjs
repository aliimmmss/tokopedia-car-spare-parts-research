#!/usr/bin/env node
/**
 * rename-photos.mjs — Batch-rename product photos to match slugs
 *
 * Supports TWO modes:
 *   1. Subfolder mode (recommended): Photos organized in subfolders
 *      e.g., photos/rack-end-mazda-e2000/IMG_001.jpg, IMG_002.jpg
 *   2. Flat mode (fallback): All photos in one folder, keyword matching
 *
 * Naming: {slug}-1.webp, {slug}-2.webp, {slug}-3.webp
 * This is a COPY script — originals are never modified or deleted.
 *
 * Usage:
 *   node scripts/rename-photos.mjs D:/LUXOR/photos/
 *   node scripts/rename-photos.mjs ./my-photos/
 */

import { readdir, stat, copyFile, mkdir } from 'fs/promises';
import { join, parse, extname, basename } from 'path';

// ─── Product data ────────────────────────────────────────────

const PRODUCTS = [
  { slug: 'rack-end-mazda-e2000', name: 'Rack End Long Tie Rod Mazda E2000' },
  { slug: 'tie-rod-end-timor-s515', name: 'Tie Rod End Timor S515 SOHC DOHC Set' },
  { slug: 'ball-joint-mazda-mr90', name: 'Ball Joint Mazda MR90/Vantren' },
  { slug: 'as-kopling-mitsubishi-l300', name: 'As Kopling Main Drive Gear Mitsubishi L300' },
  { slug: 'tie-rod-end-mitsubishi-lancer', name: 'Tie Rod End Mitsubishi Lancer Dangan 1988 Up' },
  { slug: 'packing-cylinder-head-galant-eterna', name: 'Packing Cylinder Head Graphite Galant Eterna G63B' },
  { slug: 'packing-cylinder-head-panther-2500', name: 'Packing Cylinder Head Graphite Panther 2500cc' },
  { slug: 'pulley-water-pump-hino-dutro', name: 'Pulley Water Pump Hino Dutro' },
  { slug: 'pulley-alternator-innova-diesel', name: 'Pulley Alternator Innova Diesel' },
  { slug: 'tie-rod-end-daihatsu-zebra', name: 'Tie Rod End Daihatsu Zebra Fan' },
  { slug: 'diaphragm-mitsubishi-canter', name: 'Diaphragm Assy Mitsubishi Canter' },
  { slug: 'armature-mitsubishi-ganjo', name: 'Armature Mitsubishi Ganjo ME701446' },
  { slug: 'packing-cylinder-head-panther-2300', name: 'Packing Cylinder Head Graphite Panther 2300cc' },
  { slug: 'selenoid-starter-isuzu-nkr71', name: 'Selenoid Switch Starter Isuzu NKR71 24V' },
  { slug: 'selenoid-starter-isuzu-giga-ftr240', name: 'Selenoid Switch Starter Isuzu Giga FTR240 24V' },
  { slug: 'brake-master-assy-isuzu-nmr71', name: 'Brake Master Assy Master Rem Atas Isuzu NMR71' },
  { slug: 'brake-master-assy-suzuki-carry-st100', name: 'Brake Master Assy Suzuki Carry ST100' },
  { slug: 'brake-master-assy-suzuki-carry-extra', name: 'Brake Master Assy Suzuki Carry Extra' },
  { slug: 'filter-fuel-sedimenter-isuzu-nmr81', name: 'Filter Asm Fuel Sedimenter Pompa Solar Isuzu NMR81' },
  { slug: 'brake-master-assy-dyna-bu30', name: 'Brake Master Assy Dyna BU30' },
  { slug: 'tie-rod-end-isuzu-bison', name: 'Tie Rod End Isuzu Bison TLD56 TLD58 KAD' },
  { slug: 'tie-rod-end-mitsubishi-ps100', name: 'Tie Rod End Mitsubishi PS100' },
  { slug: 'brake-master-assy-suzuki-st20', name: 'Brake Master Assy Suzuki ST20' },
  { slug: 'hanger-spring-mitsubishi-ps120', name: 'Hanger Spring Mitsubishi PS120 MC114412' },
  { slug: 'shackle-spring-front-ps120', name: 'Shuckle Spring Front PS120' },
  { slug: 'timing-belt-trooper-4jb1', name: 'Timing Belt Trooper Diesel 4JB1 Turbo' },
  { slug: 'repair-kit-air-master-isuzu-giga-frr', name: 'Repair Kit Air Master Isuzu Giga FRR' },
  { slug: 'kit-valve-governor-hino-h07c', name: 'Kit Valve Governor H07C Hino' },
  { slug: 'bushing-kingpin-isuzu-nkr71', name: 'Bushing Kingpin Isuzu NKR71 66' },
];

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// ─── Helpers ─────────────────────────────────────────────────

function isImageFile(filename) {
  return IMAGE_EXTENSIONS.includes(extname(filename).toLowerCase());
}

function normalizeForMatch(str) {
  return str.toLowerCase().replace(/[-_]/g, ' ');
}

/**
 * Fuzzy-match a folder/file name to a product slug.
 * Returns the slug if at least 2 words match, otherwise null.
 */
function matchToSlug(name) {
  const normalized = normalizeForMatch(name);
  let bestSlug = null;
  let bestScore = 0;

  for (const product of PRODUCTS) {
    const slugWords = product.slug.split('-').filter(w => w.length > 2);
    let score = 0;
    for (const word of slugWords) {
      if (normalized.includes(word)) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestSlug = product.slug;
    }
  }

  return bestScore >= 2 ? bestSlug : null;
}

/** Get image files from a directory, sorted by name */
async function getImageFiles(dirPath) {
  const entries = await readdir(dirPath);
  return entries
    .filter(f => isImageFile(f))
    .sort();
}

/** Check if a directory has any image files */
async function hasImages(dirPath) {
  try {
    const files = await getImageFiles(dirPath);
    return files.length > 0;
  } catch {
    return false;
  }
}

/** Pad string for table alignment */
function pad(str, len) {
  return str.length >= len ? str : str + ' '.repeat(len - str.length);
}

// ─── Keyword map for flat mode ───────────────────────────────

const KEYWORD_MAP = [
  { keywords: ['rack end', 'mazda'], slug: 'rack-end-mazda-e2000' },
  { keywords: ['rack end', 'long tie'], slug: 'rack-end-mazda-e2000' },
  { keywords: ['tie rod', 'timor'], slug: 'tie-rod-end-timor-s515' },
  { keywords: ['tie rod', 'lancer'], slug: 'tie-rod-end-mitsubishi-lancer' },
  { keywords: ['tie rod', 'zebra'], slug: 'tie-rod-end-daihatsu-zebra' },
  { keywords: ['tie rod', 'bison'], slug: 'tie-rod-end-isuzu-bison' },
  { keywords: ['tie rod', 'ps100'], slug: 'tie-rod-end-mitsubishi-ps100' },
  { keywords: ['ball joint', 'mazda'], slug: 'ball-joint-mazda-mr90' },
  { keywords: ['ball joint', 'mr90'], slug: 'ball-joint-mazda-mr90' },
  { keywords: ['kopling', 'l300'], slug: 'as-kopling-mitsubishi-l300' },
  { keywords: ['packing', 'galant'], slug: 'packing-cylinder-head-galant-eterna' },
  { keywords: ['packing', 'panther', '2500'], slug: 'packing-cylinder-head-panther-2500' },
  { keywords: ['packing', 'panther', '2300'], slug: 'packing-cylinder-head-panther-2300' },
  { keywords: ['packing', 'panther'], slug: 'packing-cylinder-head-panther-2300' },
  { keywords: ['pulley', 'water pump'], slug: 'pulley-water-pump-hino-dutro' },
  { keywords: ['pulley', 'dutro'], slug: 'pulley-water-pump-hino-dutro' },
  { keywords: ['pulley', 'alternator'], slug: 'pulley-alternator-innova-diesel' },
  { keywords: ['diaphragm', 'canter'], slug: 'diaphragm-mitsubishi-canter' },
  { keywords: ['armature', 'ganjo'], slug: 'armature-mitsubishi-ganjo' },
  { keywords: ['armature', 'me701446'], slug: 'armature-mitsubishi-ganjo' },
  { keywords: ['selenoid', 'nkr71'], slug: 'selenoid-starter-isuzu-nkr71' },
  { keywords: ['selenoid', 'giga'], slug: 'selenoid-starter-isuzu-giga-ftr240' },
  { keywords: ['selenoid', 'ftr'], slug: 'selenoid-starter-isuzu-giga-ftr240' },
  { keywords: ['brake master', 'nmr71'], slug: 'brake-master-assy-isuzu-nmr71' },
  { keywords: ['brake master', 'carry', 'st100'], slug: 'brake-master-assy-suzuki-carry-st100' },
  { keywords: ['brake master', 'carry', 'extra'], slug: 'brake-master-assy-suzuki-carry-extra' },
  { keywords: ['brake master', 'carry'], slug: 'brake-master-assy-suzuki-carry-st100' },
  { keywords: ['brake master', 'st20'], slug: 'brake-master-assy-suzuki-st20' },
  { keywords: ['brake master', 'dyna'], slug: 'brake-master-assy-dyna-bu30' },
  { keywords: ['filter', 'sedimenter'], slug: 'filter-fuel-sedimenter-isuzu-nmr81' },
  { keywords: ['sedimenter', 'nmr81'], slug: 'filter-fuel-sedimenter-isuzu-nmr81' },
  { keywords: ['hanger', 'ps120'], slug: 'hanger-spring-mitsubishi-ps120' },
  { keywords: ['shackle', 'ps120'], slug: 'shackle-spring-front-ps120' },
  { keywords: ['timing belt', 'trooper'], slug: 'timing-belt-trooper-4jb1' },
  { keywords: ['timing belt', '4jb1'], slug: 'timing-belt-trooper-4jb1' },
  { keywords: ['repair kit', 'air master'], slug: 'repair-kit-air-master-isuzu-giga-frr' },
  { keywords: ['kit valve', 'governor'], slug: 'kit-valve-governor-hino-h07c' },
  { keywords: ['bushing', 'kingpin'], slug: 'bushing-kingpin-isuzu-nkr71' },
];

function matchByKeywords(filename) {
  const lower = filename.toLowerCase();
  for (const entry of KEYWORD_MAP) {
    const allMatch = entry.keywords.every(kw => lower.includes(kw));
    if (allMatch) return entry.slug;
  }
  return null;
}

// ─── Subfolder mode ──────────────────────────────────────────

async function runSubfolderMode(sourceDir, targetDir) {
  console.log('\n=== SUBFOLDER MODE ===');
  console.log('Each subfolder maps to a product. Photos inside get numbered.\n');

  const entries = await readdir(sourceDir);
  const totalCopied = [];
  const summaryLines = [];
  const unmatchedFolders = [];

  for (const entry of entries) {
    const entryPath = join(sourceDir, entry);
    const entryStat = await stat(entryPath);

    if (!entryStat.isDirectory()) continue;
    if (entry.startsWith('.')) continue;

    const images = await getImageFiles(entryPath);
    if (images.length === 0) {
      console.log(`  SKIP: ${entry}/ (no images)`);
      continue;
    }

    const slug = matchToSlug(entry);
    if (!slug) {
      console.log(`  UNMATCHED FOLDER: ${entry}/`);
      unmatchedFolders.push(entry);
      continue;
    }

    const product = PRODUCTS.find(p => p.slug === slug);
    console.log(`  Processing folder: ${entry}/ → ${slug}`);

    const filenames = [];
    for (let i = 0; i < images.length; i++) {
      const srcFile = images[i];
      const ext = extname(srcFile).toLowerCase();
      const targetName = `${slug}-${i + 1}${ext}`;
      const srcPath = join(entryPath, srcFile);
      const destPath = join(targetDir, targetName);

      await copyFile(srcPath, destPath);
      filenames.push(targetName);
      totalCopied.push(targetName);
    }

    summaryLines.push({
      product: product ? product.name : slug,
      photos: filenames.join(', '),
    });
  }

  // Print summary table
  console.log('\n=== Summary ===\n');
  const nameCol = 48;
  console.log(`  ${pad('Product', nameCol)} | Photos`);
  console.log(`  ${pad('-'.repeat(nameCol), nameCol)} | ${'-'.repeat(30)}`);
  for (const line of summaryLines) {
    console.log(`  ${pad(line.product, nameCol)} | ${line.photos}`);
  }
  console.log(`\n  Total copied: ${totalCopied.length}`);

  if (unmatchedFolders.length > 0) {
    console.log(`\n  ⚠ Unmatched folders (rename to match a product):`);
    for (const f of unmatchedFolders) {
      console.log(`    - ${f}/`);
    }
  }

  return totalCopied.length;
}

// ─── Flat mode ───────────────────────────────────────────────

async function runFlatMode(sourceDir, targetDir) {
  console.log('\n=== FLAT MODE ===');
  console.log('All photos in one folder. Using keyword matching.\n');

  const allImages = await getImageFiles(sourceDir);
  if (allImages.length === 0) {
    console.log('ERROR: No image files found in source directory.');
    process.exit(1);
  }

  console.log(`Found ${allImages.length} image(s).\n`);

  const slugCount = {};  // track numbering per slug
  const matched = [];
  const unmatched = [];
  const copyOps = [];

  for (const filename of allImages) {
    const lower = filename.toLowerCase();
    const slug = matchByKeywords(filename);

    if (slug) {
      const count = (slugCount[slug] || 0) + 1;
      slugCount[slug] = count;
      const ext = extname(filename).toLowerCase();
      const targetName = `${slug}-${count}${ext}`;

      console.log(`  MATCHED: ${filename} → ${targetName}`);
      matched.push(filename);
      copyOps.push({
        src: join(sourceDir, filename),
        dest: join(targetDir, targetName),
      });
    } else {
      console.log(`  UNMATCHED: ${filename}`);
      unmatched.push(filename);
    }
  }

  console.log('\n--- Summary ---');
  console.log(`  Matched:   ${matched.length}`);
  console.log(`  Unmatched: ${unmatched.length}`);

  if (unmatched.length > 0) {
    console.log('\n  ⚠ Unmatched photos:');
    for (const f of unmatched) {
      console.log(`    - ${f}`);
    }
  }

  // Execute copies
  for (const op of copyOps) {
    await copyFile(op.src, op.dest);
  }

  console.log(`\n✅ Copied ${matched.length} photo(s) to ${targetDir}`);
  return matched.length;
}

// ─── Main ────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log('Usage: node scripts/rename-photos.mjs /path/to/source/photos');
    console.log('');
    console.log('Two modes:');
    console.log('  Subfolder: photos/product-name/IMG_001.jpg (recommended)');
    console.log('  Flat:      photos/IMG_rack_end_001.jpg (keyword matching)');
    console.log('');
    console.log('Output: {slug}-1.webp, {slug}-2.webp, ... in public/products/');
    console.log('Originals are NEVER modified or deleted.');
    process.exit(1);
  }

  const sourceDir = args[0];
  const scriptDir = parse(import.meta.url.replace('file:///', '')).dir;
  // Resolve target: ../public/products relative to script location
  // script is in website/scripts/, target is website/public/products/
  const projectRoot = join(scriptDir, '..');
  const targetDir = join(projectRoot, 'public', 'products');

  // Validate source directory
  let sourceStat;
  try {
    sourceStat = await stat(sourceDir);
  } catch {
    console.error(`ERROR: Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  if (!sourceStat.isDirectory()) {
    console.error(`ERROR: Source path is not a directory: ${sourceDir}`);
    process.exit(1);
  }

  // Ensure target exists
  await mkdir(targetDir, { recursive: true });

  console.log('=== Photo Rename & Copy Script ===');
  console.log(`Source: ${sourceDir}`);
  console.log(`Target: ${targetDir}`);

  // Detect mode: check if source has subdirectories with images
  let hasSubdirs = false;
  const sourceEntries = await readdir(sourceDir);
  for (const entry of sourceEntries) {
    const entryPath = join(sourceDir, entry);
    try {
      const entryStat = await stat(entryPath);
      if (entryStat.isDirectory() && !entry.startsWith('.')) {
        if (await hasImages(entryPath)) {
          hasSubdirs = true;
          break;
        }
      }
    } catch {
      // skip unreadable entries
    }
  }

  let copied;
  if (hasSubdirs) {
    copied = await runSubfolderMode(sourceDir, targetDir);
  } else {
    copied = await runFlatMode(sourceDir, targetDir);
  }

  console.log('\nNext steps:');
  console.log('  1. Run: node scripts/optimize.mjs');
  console.log('  2. Run: node scripts/update-product-images.mjs');
  console.log('  3. Paste output into lib/products.ts');
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
