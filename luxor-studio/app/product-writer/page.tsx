'use client'

import { useState } from 'react'
import { CATEGORIES, BRANDS, Product, GeneratedDescription } from '@/lib/types'
import LoadingDots from '@/components/loading-dots'

export default function ProductWriter() {
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState<GeneratedDescription | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const fields: { key: keyof Product | string; label: string; type: string }[] = [
    { key: 'part_number', label: 'Part Number', type: 'text' },
    { key: 'oem_number', label: 'OEM Number', type: 'text' },
    { key: 'vehicle_compatibility', label: 'Vehicle Compatibility', type: 'text' },
    { key: 'material', label: 'Material', type: 'text' },
    { key: 'weight_kg', label: 'Weight (kg)', type: 'number' },
    { key: 'price_retail', label: 'Retail Price', type: 'number' },
    { key: 'price_wholesale', label: 'Wholesale Price', type: 'number' },
    { key: 'stock_qty', label: 'Stock Qty', type: 'number' },
    { key: 'condition', label: 'Condition', type: 'select' },
    { key: 'key_features', label: 'Key Features', type: 'textarea' },
    { key: 'notes', label: 'Notes', type: 'textarea' },
  ]

  const [formData, setFormData] = useState<Partial<Product>>({
    condition: 'Baru',
  })

  const handleGenerate = async () => {
    if (!productName || !category || !brand) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_name: productName,
          category,
          brand,
          ...formData
        }),
      })

      const data = await response.json()
      setGenerated(data)
    } catch (error) {
      console.error('Generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleSave = async () => {
    if (!generated) return

    const product: Product = {
      product_name: productName,
      category,
      brand,
      ...formData as Product,
      status: 'Draft',
      date_added: new Date().toISOString(),
    }

    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      })
      alert('Product saved to CSV!')
    } catch (error) {
      console.error('Save failed:', error)
    }
  }

  return (
    <div className="h-full flex flex-col p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold mb-2">Product Writer</h1>
        <p className="text-text-secondary font-body">Generate AI-powered product descriptions for Tokopedia and TikTok Shop.</p>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden">
        {/* Left Panel - Inputs */}
        <div className="w-1/2 flex flex-col gap-6 overflow-auto pr-4">
          <div className="border border-border p-6 bg-bg-tertiary">
            <h3 className="font-mono text-xs text-text-secondary uppercase tracking-wider mb-6">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-text-secondary uppercase mb-2">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  placeholder="e.g. Filter Oli Hino Ranger"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-text-secondary uppercase mb-2">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full"
                  >
                    <option value="">Select...</option>
                    {
                    CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-secondary uppercase mb-2">Brand</label>
                  <select
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    className="w-full"
                  >
                    <option value="">Select...</option>
                    {BRANDS.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-border p-6 bg-bg-tertiary">
            <h3 className="font-mono text-xs text-text-secondary uppercase tracking-wider mb-6">Product Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {fields.slice(0, 8).map(field => (
                <div key={field.key as string}>
                  <label className="block font-mono text-xs text-text-secondary uppercase mb-2">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      value={(formData as any)[field.key] || 'Baru'}
                      onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="w-full"
                    >
                      <option value="Baru">Baru</option>
                      <option value="Bekas">Bekas</option>
                      <option value="Rebuilt">Rebuilt</option>
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      value={(formData as any)[field.key] || ''}
                      onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      rows={3}
                      className="w-full resize-none"
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={(formData as any)[field.key] || ''}
                      onChange={e => setFormData({ ...formData, [field.key]: field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value })}
                      className="w-full"
                    />
                  )}
                </div>
              ))}
            </div>

            {fields.slice(8).map(field => (
              <div key={field.key as string} className="mt-4">
                <label className="block font-mono text-xs text-text-secondary uppercase mb-2">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={(formData as any)[field.key] || ''}
                    onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                    rows={3}
                    className="w-full resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={(formData as any)[field.key] || ''}
                    onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={!productName || !category || !brand || isGenerating}
            className="btn-filled w-full py-4"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                GENERATING <LoadingDots />
              </span>
            ) : (
              'GENERATE DESCRIPTIONS'
            )}
          </button>
        </div>

        {/* Right Panel - Output */}
        <div className="w-1/2 border border-border bg-bg-tertiary p-6 overflow-auto">
          <h3 className="font-mono text-xs text-text-secondary uppercase tracking-wider mb-6">Generated Content</h3>
          
          {!generated && !isGenerating && (
            <div className="h-full flex flex-col items-center justify-center text-text-tertiary">
              <span className="font-mono text-xs uppercase">Fill in product details and click Generate</span>
            </div>
          )}

          {(isGenerating || generated) && (
            <div className="space-y-8">
              {/* Tokopedia */}
              <div className="border-l-2 border-accent pl-4">
                <h4 className="font-mono text-xs text-text-secondary uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent"></span>
                  Tokopedia
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-xs text-text-tertiary uppercase">Title</span>
                      <button
                        onClick={() => generated && handleCopy(generated.tokopedia_title, 'tokopedia_title')}
                        className="font-mono text-xs text-accent hover:text-accent-secondary"
                      >
                        {copied === 'tokopedia_title' ? 'COPIED!' : 'COPY'}
                      </button>
                    </div>
                    <div className="p-3 bg-bg-code border border-border font-body text-sm text-text-primary min-h-[40px]">
                      {isGenerating ? <LoadingDots /> : generated?.tokopedia_title}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-xs text-text-tertiary uppercase">Description</span>
                      <button
                        onClick={() => generated && handleCopy(generated.tokopedia_description, 'tokopedia_desc')}
                        className="font-mono text-xs text-accent hover:text-accent-secondary"
                      >
                        {copied === 'tokopedia_desc' ? 'COPIED!' : 'COPY'}
                      </button>
                    </div>
                    <div className="p-3 bg-bg-code border border-border font-body text-sm text-text-primary whitespace-pre-wrap min-h-[200px]">
                      {isGenerating ? <LoadingDots /> : generated?.tokopedia_description}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-xs text-text-tertiary uppercase">SEO Tags</span>
                      <button
                        onClick={() => generated && handleCopy(generated.seo_tags.join(', '), 'tokopedia_tags')}
                        className="font-mono text-xs text-accent hover:text-accent-secondary"
                      >
                        {copied === 'tokopedia_tags' ? 'COPIED!' : 'COPY'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(isGenerating ? ['Loading...'] : generated?.seo_tags)?.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-bg-secondary border border-border font-mono text-xs text-text-secondary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* TikTok */}
              <div className="border-l-2 border-accent-secondary pl-4">
                <h4 className="font-mono text-xs text-text-secondary uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-secondary"></span>
                  TikTok Shop
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-xs text-text-tertiary uppercase">Title</span>
                      <button
                        onClick={() => generated && handleCopy(generated.tiktok_title, 'tiktok_title')}
                        className="font-mono text-xs text-accent hover:text-accent-secondary"
                      >
                        {copied === 'tiktok_title' ? 'COPIED!' : 'COPY'}
                      </button>
                    </div>
                    <div className="p-3 bg-bg-code border border-border font-body text-sm text-text-primary min-h-[40px]">
                      {isGenerating ? <LoadingDots /> : generated?.tiktok_title}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-xs text-text-tertiary uppercase">Description</span>
                      <button
                        onClick={() => generated && handleCopy(generated.tiktok_description, 'tiktok_desc')}
                        className="font-mono text-xs text-accent hover:text-accent-secondary"
                      >
                        {copied === 'tiktok_desc' ? 'COPIED!' : 'COPY'}
                      </button>
                    </div>
                    <div className="p-3 bg-bg-code border border-border font-body text-sm text-text-primary whitespace-pre-wrap min-h-[150px]">
                      {isGenerating ? <LoadingDots /> : generated?.tiktok_description}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-xs text-text-tertiary uppercase">Hashtags</span>
                      <button
                        onClick={() => generated && handleCopy(generated.hashtags.join(' '), 'tiktok_hashtags')}
                        className="font-mono text-xs text-accent hover:text-accent-secondary"
                      >
                        {copied === 'tiktok_hashtags' ? 'COPIED!' : 'COPY'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(isGenerating ? ['#Loading'] : generated?.hashtags)?.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-bg-secondary border border-border font-mono text-xs text-accent-secondary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {generated && (
                <button
                  onClick={handleSave}
                  className="btn-outline w-full py-3 border-accent-secondary text-accent-secondary"
                >
                  SAVE TO PRODUCT LIST
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
