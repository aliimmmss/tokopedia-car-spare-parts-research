const { readdir, stat, mkdir } = require('fs/promises');
const { join } = require('path');
const sharp = require('sharp');

const SOURCE = join(__dirname, '..', '..', 'photos-source');
const TARGET = join(__dirname, '..', 'public', 'products');

const FOLDER_TO_SLUG = {
  'armature': 'armature-mitsubishi-ganjo-me701446',
  'as kopling': 'as-kopling-l300',
  'ball joint': 'ball-joint-mazda-mr90-vantren',
  'brake master assy dyna': 'brake-master-assy-dyna-bu30',
  'brake master assy nmr71': 'brake-master-assy-nmr71',
  'brake master assy suzuki carry extra': 'brake-master-assy-suzuki-carry-extra',
  'brake master assy suzuki carry st100': 'brake-master-assy-suzuki-carry-st100',
  'brake master assy suzuki carry st20': 'brake-master-assy-suzuki-st20',
  'bushing kingpin isuzu nkr71': 'bushing-kingpin-isuzu-nkr71-66',
  'diaphragm assy mitsubishi canter': 'diaphragm-assy-mitsubishi-canter',
  'hanger spring mitsubishi ps120': 'hanger-spring-mitsubishi-ps120-mc114412',
  'kit valve governor h07c hino': 'kit-valve-governor-h07c-hino',
  'packing cylinder head mitsubishi galant': 'packing-cylinder-head-mitsubishi-galant-eterna',
  'packing cylinder head panther 2300cc': 'packing-cylinder-head-panther-2300cc',
  'packing cylinder head panther 2500cc': 'packing-cylinder-head-panther-2500cc',
  'pulley alternator innova diesel': 'pulley-alternator-innova-diesel',
  'pulley water pump hino dutro': 'pulley-water-pump-hino-dutro',
  'rack end mazda e2000': 'rack-end-mazda-e2000',
  'repair kit air master isuzu giga frr': 'repair-kit-air-master-isuzu-giga-frr',
  'sedimeter isuzu nmr81': 'sedimeter-isuzu-nmr81',
  'selenoid switch starter isuzu giga ftr240 24v': 'selenoid-switch-starter-isuzu-giga-ftr240-24v',
  'selenoid switch starter isuzu nkr71 24v': 'selenoid-switch-starter-isuzu-nkr71-24v',
  'shuckle spring front ps120': 'shuckle-spring-front-ps120',
  'tie rod end daihatsu zebra fan': 'tie-rod-end-daihatsu-zebra-fan',
  'tie rod end isuzu tld56': 'tie-rod-end-isuzu-tld56',
  'tie rod end mitsubishi lancer dangan 1988 up': 'tie-rod-end-mitsubishi-lancer-dangan',
  'tie rod end mitsubishi ps100': 'tie-rod-end-mitsubishi-ps100',
  'tie rod end timor s515': 'tie-rod-end-timor-s515',
  'timing belt troopeer diesel 4jb1 turbo': 'timing-belt-trooper-diesel-4jb1-turbo',
};

async function main() {
  await mkdir(TARGET, { recursive: true });

  const entries = await readdir(SOURCE);
  let totalProcessed = 0;
  const slugImages = {};

  for (const entry of entries) {
    const entryPath = join(SOURCE, entry);
    const entryStat = await stat(entryPath);
    if (!entryStat.isDirectory()) continue;

    const slug = FOLDER_TO_SLUG[entry.toLowerCase()];
    if (!slug) {
      console.log(`⚠ No slug mapping for folder: ${entry}`);
      continue;
    }

    const files = (await readdir(entryPath))
      .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
      .sort();

    console.log(`\n📁 ${entry} → ${slug} (${files.length} photos)`);

    const outputFiles = [];

    for (let i = 0; i < files.length; i++) {
      const src = join(entryPath, files[i]);
      const outName = `${slug}-${i + 1}.webp`;
      const outPath = join(TARGET, outName);

      await sharp(src)
        .resize(800, 800, { fit: 'cover', position: 'center' })
        .webp({ quality: 80 })
        .toFile(outPath);

      console.log(`  ✅ ${files[i]} → ${outName}`);
      outputFiles.push(`/products/${outName}`);
      totalProcessed++;
    }

    slugImages[slug] = outputFiles;
  }

  console.log(`\n========== SUMMARY ==========`);
  console.log(`Total photos processed: ${totalProcessed}`);
  console.log(`Products with photos: ${Object.keys(slugImages).length}`);

  // Print images arrays for products.ts update
  console.log(`\n========== products.ts image arrays ==========\n`);
  for (const [slug, files] of Object.entries(slugImages)) {
    const formatted = files.map(f => `"${f}"`).join(', ');
    console.log(`${slug}: [${formatted}],`);
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
