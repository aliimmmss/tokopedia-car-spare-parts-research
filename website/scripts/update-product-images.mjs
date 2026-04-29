import { readdir } from 'fs/promises';
import { join, parse } from 'path';

const PRODUCTS_DIR = 'public/products';

// All 29 product slugs in order
const SLUGS = [
  'rack-end-mazda-e2000',
  'tie-rod-end-timor-s515',
  'ball-joint-mazda-mr90',
  'as-kopling-mitsubishi-l300',
  'tie-rod-end-mitsubishi-lancer',
  'packing-cylinder-head-galant-eterna',
  'packing-cylinder-head-panther-2500',
  'pulley-water-pump-hino-dutro',
  'pulley-alternator-innova-diesel',
  'tie-rod-end-daihatsu-zebra',
  'diaphragm-mitsubishi-canter',
  'armature-mitsubishi-ganjo',
  'packing-cylinder-head-panther-2300',
  'selenoid-starter-isuzu-nkr71',
  'selenoid-starter-isuzu-giga-ftr240',
  'brake-master-assy-isuzu-nmr71',
  'brake-master-assy-suzuki-carry-st100',
  'brake-master-assy-suzuki-carry-extra',
  'filter-fuel-sedimenter-isuzu-nmr81',
  'brake-master-assy-dyna-bu30',
  'tie-rod-end-isuzu-bison',
  'tie-rod-end-mitsubishi-ps100',
  'brake-master-assy-suzuki-st20',
  'hanger-spring-mitsubishi-ps120',
  'shackle-spring-front-ps120',
  'timing-belt-trooper-4jb1',
  'repair-kit-air-master-isuzu-giga-frr',
  'kit-valve-governor-hino-h07c',
  'bushing-kingpin-isuzu-nkr71',
];

const NAMES = [
  'Rack End Long Tie Rod Mazda E2000',
  'Tie Rod End Timor S515 SOHC DOHC Set',
  'Ball Joint Mazda MR90/Vantren',
  'As Kopling Main Drive Gear Mitsubishi L300',
  'Tie Rod End Mitsubishi Lancer Dangan 1988 Up',
  'Packing Cylinder Head Graphite Galant Eterna G63B',
  'Packing Cylinder Head Graphite Panther 2500cc',
  'Pulley Water Pump Hino Dutro',
  'Pulley Alternator Innova Diesel',
  'Tie Rod End Daihatsu Zebra Fan',
  'Diaphragm Assy Mitsubishi Canter',
  'Armature Mitsubishi Ganjo ME701446',
  'Packing Cylinder Head Graphite Panther 2300cc',
  'Selenoid Switch Starter Isuzu NKR71 24V',
  'Selenoid Switch Starter Isuzu Giga FTR240 24V',
  'Brake Master Assy Master Rem Atas Isuzu NMR71',
  'Brake Master Assy Suzuki Carry ST100',
  'Brake Master Assy Suzuki Carry Extra',
  'Filter Asm Fuel Sedimenter Pompa Solar Isuzu NMR81',
  'Brake Master Assy Dyna BU30',
  'Tie Rod End Isuzu Bison TLD56 TLD58 KAD',
  'Tie Rod End Mitsubishi PS100',
  'Brake Master Assy Suzuki ST20',
  'Hanger Spring Mitsubishi PS120 MC114412',
  'Shuckle Spring Front PS120',
  'Timing Belt Trooper Diesel 4JB1 Turbo',
  'Repair Kit Air Master Isuzu Giga FRR',
  'Kit Valve Governor H07C Hino',
  'Bushing Kingpin Isuzu NKR71 66',
];

async function main() {
  const files = await readdir(PRODUCTS_DIR);
  const webpFiles = files.filter(f => f.endsWith('.webp'));

  // Group by slug: strip -1, -2, -3 suffix
  const slugMap = new Map();
  for (const file of webpFiles) {
    const { name } = parse(file);
    // Match {slug}-{number} pattern
    const match = name.match(/^(.+)-(\d+)$/);
    let slug;
    if (match) {
      slug = match[1];
    } else {
      // Single image without number suffix
      slug = name;
    }
    if (!slugMap.has(slug)) {
      slugMap.set(slug, []);
    }
    slugMap.get(slug).push(`/products/${file}`);
  }

  // Sort each slug's images
  for (const [slug, images] of slugMap) {
    images.sort();
  }

  console.log('// Auto-generated — paste into products.ts');
  console.log('// Run: node scripts/update-product-images.mjs\n');

  let found = 0;
  let missing = 0;

  for (let i = 0; i < SLUGS.length; i++) {
    const slug = SLUGS[i];
    const images = slugMap.get(slug) || [];
    if (images.length > 0) {
      const formatted = images.map(p => `"${p}"`).join(', ');
      console.log(`// ${NAMES[i]}`);
      console.log(`images: [${formatted}],`);
      console.log('');
      found++;
    } else {
      console.log(`// ${NAMES[i]}`);
      console.log(`images: [],  // ⚠ NO PHOTOS FOUND`);
      console.log('');
      missing++;
    }
  }

  console.log(`// Summary: ${found} products with photos, ${missing} without`);
}

main().catch(console.error);
