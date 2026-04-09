import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product_name, category, brand, ...productData } = body

    if (!product_name || !category || !brand) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create a temporary CSV with the single product
    const tmpDir = path.join('/tmp', 'luxor-temp')
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true })
    }

    // Build CSV content
    const headers = [
      'product_name', 'part_number', 'brand', 'category', 'vehicle_compatibility',
      'material', 'weight_kg', 'price_retail', 'price_wholesale', 'stock_qty',
      'condition', 'oem_number', 'key_features', 'notes'
    ].join(',')

    const values = [
      `"${product_name}"`,
      `"${productData.part_number || ''}"`,
      `"${brand}"`,
      `"${category}"`,
      `"${productData.vehicle_compatibility || ''}"`,
      `"${productData.material || ''}"`,
      productData.weight_kg || 0,
      productData.price_retail || 0,
      productData.price_wholesale || 0,
      productData.stock_qty || 0,
      `"${productData.condition || 'Baru'}"`,
      `"${productData.oem_number || ''}"`,
      `"${productData.key_features || ''}"`,
      `"${productData.notes || ''}"`,
    ].join(',')

    const csvContent = `${headers}\n${values}`
    const csvPath = path.join(tmpDir, 'temp_product.csv')
    fs.writeFileSync(csvPath, csvContent, 'utf-8')

    // Call the Python description generator
    const generatorPath = path.join(process.cwd(), '..', 'tools', 'description-generator', 'generate_descriptions.py')
    const configPath = path.join(process.cwd(), '..', 'tools', 'description-generator', 'config.json')
    
    return new Promise((resolve) => {
      const pythonProcess = spawn('python3', [
        generatorPath,
        '--csv', csvPath,
        '--product', product_name,
        '--config', configPath,
      ], {
        cwd: path.dirname(generatorPath),
        env: {
          ...process.env,
          PYTHONUNBUFFERED: '1',
        }
      })

      let stdout = ''
      let stderr = ''

      pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString()
      })

      pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString()
      })

      pythonProcess.on('close', (code) => {
        // Clean up temp file
        try {
          fs.unlinkSync(csvPath)
        } catch {}

        // Read output files if they exist
        const outputDir = path.join(tmpDir, 'output')
        const tokopediaDir = path.join(outputDir, 'tokopedia')
        const tiktokDir = path.join(outputDir, 'tiktok')

        let tokopediaTitle = ''
        let tokopediaDesc = ''
        let tiktokTitle = ''
        let tiktokDesc = ''

        // Try to read generated files
        try {
          const safeName = product_name.replace(/[^\w\s-]/g, '').replace(/\s+/g, '_')
          
          const tkFile = path.join(tokopediaDir, `${safeName}_tkp.txt`)
          const tikFile = path.join(tiktokDir, `${safeName}_tik.txt`)

          if (fs.existsSync(tkFile)) {
            const tkContent = fs.readFileSync(tkFile, 'utf-8')
            const titleMatch = tkContent.match(/TITEL:\s*\n?(.+?)\n\n/)
            const descMatch = tkContent.match(/DESKRIPSI:\s*\n?([\s\S]+?)\n\n/)
            tokopediaTitle = titleMatch ? titleMatch[1].trim() : ''
            tokopediaDesc = descMatch ? descMatch[1].trim() : ''
          }

          if (fs.existsSync(tikFile)) {
            const tikContent = fs.readFileSync(tikFile, 'utf-8')
            const titleMatch = tikContent.match(/TITEL:\s*\n?(.+?)\n\n/)
            const descMatch = tikContent.match(/DESKRIPSI:\s*\n?([\s\S]+?)\n\n/)
            tiktokTitle = titleMatch ? titleMatch[1].trim() : ''
            tiktokDesc = descMatch ? descMatch[1].trim() : ''
          }
        } catch {
          // Fallback to parsing stdout
        }

        // Clean up output directory
        try {
          fs.rmSync(outputDir, { recursive: true, force: true })
        } catch {}

        // If we got no results from files, use fallback
        if (!tokopediaTitle && !tokopediaDesc) {
          tokopediaTitle = `${brand} ${product_name} ${productData.part_number || ''} - Original Part`
          tokopediaDesc = `Suku cadang ${category} original untuk kendaraan komersial.\n\nBrand: ${brand}\nKategori: ${category}\nKondisi: ${productData.condition || 'Baru'}\n\nDikirim dari Bandung dengan pengalaman 30 tahun. Hubungi kami untuk informasi lebih lanjut.`
        }

        if (!tiktokTitle && !tiktokDesc) {
          tiktokTitle = `${brand} ${product_name} 💯 Original 🔥 Ready Stok`
          tiktokDesc = `✨${brand} ${product_name}✨\n\n✅ Original parts\n✅ Ready stock\n✅ From Bandung\n✅ 30 years experience\n\n📦 Order sekarang!\n\n#SparePartTruk #${brand}Parts #SukuCadangKomersial`
        }

        // Parse SEO tags and hashtags from output or generate defaults
        const seoTags = [brand.toLowerCase(), category.toLowerCase().replace(' ', ''), 'spare part truk', 'original']
        const hashtags = [`#${brand}Parts`, '#SparePartTruk', '#TruckParts', '#SukuCadangKomersial', '#BengkelBandung']

        resolve(NextResponse.json({
          success: true,
          tokopedia_title: tokopediaTitle,
          tokopedia_description: tokopediaDesc,
          tiktok_title: tiktokTitle,
          tiktok_description: tiktokDesc,
          seo_tags: seoTags,
          hashtags: hashtags,
        }))
      })
    })
  } catch (error) {
    console.error('Description generation error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
