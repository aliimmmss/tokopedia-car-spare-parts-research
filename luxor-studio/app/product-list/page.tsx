'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/lib/types'
import StatusBadge from '@/components/status-badge'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<Product['status'] | ''>('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    let result = products
    
    if (search) {
      const term = search.toLowerCase()
      result = result.filter(p => 
        p.product_name.toLowerCase().includes(term) ||
        p.part_number.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term)
      )
    }
    
    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter)
    }
    
    if (statusFilter) {
      result = result.filter(p => p.status === statusFilter)
    }
    
    setFiltered(result)
  }, [products, search, categoryFilter, statusFilter])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
      setFiltered(data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSelect = (partNumber: string) => {
    const newSelected = new Set(selected)
    if (newSelected.has(partNumber)) {
      newSelected.delete(partNumber)
    } else {
      newSelected.add(partNumber)
    }
    setSelected(newSelected)
  }

  const toggleSelectAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map(p => p.part_number)))
    }
  }

  const updateStatus = async (status: Product['status']) => {
    try {
      await fetch('/api/products/batch-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partNumbers: Array.from(selected), status }),
      })
      fetchProducts()
      setSelected(new Set())
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const categories = [...new Set(products.map(p => p.category))]

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-text-secondary font-mono text-sm">LOADING...</div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-display font-semibold mb-2">Product List</h1>
        <p className="text-text-secondary font-body">{products.length} products in database</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, part number, or brand..."
            className="w-full"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="w-48"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as Product['status'] | '')}
          className="w-32"
        >
          <option value="">All Status</option>
          <option value="Draft">Draft</option>
          <option value="Ready">Ready</option>
          <option value="Published">Published</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selected.size > 0 && (
        <div className="flex items-center gap-4 mb-4 p-4 bg-bg-tertiary border border-border">
          <span className="font-mono text-xs text-text-secondary">
            {selected.size} selected
          </span>
          <button
            onClick={() => updateStatus('Ready')}
            className="btn-outline text-xs py-1 px-3 border-accent-secondary text-accent-secondary"
          >
            MARK READY
          </button>
          <button
            onClick={() => updateStatus('Draft')}
            className="btn-outline text-xs py-1 px-3"
          >
            MARK DRAFT
          </button>
          <button
            onClick={() => setSelected(new Set())}
            className="font-mono text-xs text-text-tertiary hover:text-text-primary"
          >
            CLEAR
          </button>
        </div>
      )}

      {/* Table */}
      <div className="flex-1 overflow-auto border border-border">
        <table className="w-full">
          <thead className="bg-bg-tertiary sticky top-0">
            <tr>
              <th className="w-12">
                <input
                  type="checkbox"
                  checked={filtered.length > 0 && selected.size === filtered.length}
                  onChange={toggleSelectAll}
                  className="accent-accent"
                />
              </th>
              <th className="w-16">Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Part Number</th>
              <th>Brand</th>
              <th className="w-28">Price</th>
              <th className="w-16">Stock</th>
              <th className="w-24">Status</th>
              <th className="w-32">Date Added</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product.part_number}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.has(product.part_number)}
                    onChange={() => toggleSelect(product.part_number)}
                    className="accent-accent"
                  />
                </td>
                <td>
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.product_name}
                      className="w-10 h-10 object-cover border border-border"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-bg-tertiary border border-border flex items-center justify-center">
                      <span className="text-text-tertiary text-xs">-</span>
                    </div>
                  )}
                </td>
                <td>
                  <div className="font-body text-sm">{product.product_name}</div>
                  {product.oem_number && (
                    <div className="font-mono text-xs text-text-tertiary mt-1">
                      OEM: {product.oem_number}
                    </div>
                  )}
                </td>
                <td className="font-mono text-xs text-text-secondary">{product.category}</td>
                <td className="font-mono text-xs">{product.part_number}</td>
                <td className="font-mono text-xs text-text-secondary">{product.brand}</td>
                <td className="font-mono text-xs">
                  Rp {(product.price_retail || 0).toLocaleString('id-ID')}
                </td>
                <td className="font-mono text-xs text-center">
                  <span className={product.stock_qty < 10 ? 'text-accent' : 'text-text-primary'}>
                    {product.stock_qty}
                  </span>
                </td>
                <td>
                  <StatusBadge status={product.status || 'Draft'} />
                </td>
                <td className="font-mono text-xs text-text-secondary">
                  {product.date_added ? new Date(product.date_added).toLocaleDateString('id-ID') : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && !loading && (
        <div className="flex-1 flex flex-col items-center justify-center text-text-tertiary">
          <span className="font-mono text-xs uppercase mb-4">No products found</span>
          <span className="font-body text-sm text-text-secondary">
            Adjust filters or add new products via Product Writer
          </span>
        </div>
      )}
    </div>
  )
}
