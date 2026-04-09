import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    const removeBg = formData.get('removeBg') === 'true'

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    // Save uploaded file to temp directory
    const tmpDir = path.join('/tmp', 'luxor-uploads')
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true })
    }

    const inputPath = path.join(tmpDir, image.name)
    const bytes = await image.arrayBuffer()
    fs.writeFileSync(inputPath, Buffer.from(bytes))

    // Create output directory
    const outputDir = path.join(tmpDir, 'processed', Date.now().toString())
    fs.mkdirSync(outputDir, { recursive: true })

    // Call the Python photo processor
    const processorPath = path.join(process.cwd(), '..', 'tools', 'photo-processor', 'process_photos.py')
    
    return new Promise((resolve) => {
      const args = [
        processorPath,
        '--input', tmpDir,
        '--output', outputDir,
      ]
      
      if (removeBg) {
        args.push('--remove-bg')
      }

      const pythonProcess = spawn('python3', args, {
        cwd: path.dirname(processorPath),
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
        // Clean up input file
        try {
          fs.unlinkSync(inputPath)
        } catch {}

        if (code !== 0) {
          console.error('Photo processor error:', stderr)
          resolve(NextResponse.json({ error: 'Processing failed', details: stderr }, { status: 500 }))
          return
        }

        // Find the processed image
        const processedDir = path.join(outputDir, 'general')
        if (fs.existsSync(processedDir)) {
          const files = fs.readdirSync(processedDir).filter(f => f.endsWith('_gen.jpg'))
          if (files.length > 0) {
            const processedPath = path.join(processedDir, files[0])
            const imageBuffer = fs.readFileSync(processedPath)
            const base64 = imageBuffer.toString('base64')
            
            // Clean up output directory
            try {
              fs.rmSync(outputDir, { recursive: true })
            } catch {}

            resolve(NextResponse.json({ 
              success: true, 
              processedUrl: `data:image/jpeg;base64,${base64}` 
            }))
            return
          }
        }

        resolve(NextResponse.json({ error: 'Output file not found' }, { status: 500 }))
      })
    })
  } catch (error) {
    console.error('Photo process error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
