// CSV Handler for reading/writing product data
// This runs server-side via API routes

import { Product } from './types'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const PRODUCTS_CSV = path.join(DATA_DIR, 'products.csv')

// Parse CSV to Products
export function parseProductsCSV(csvContent: string): Product[] {
  const lines = csvContent.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim())
  const products: Product[] = []
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    
    // Handle quoted values with commas
    const values: string[] = []
    let currentVal = ''
    let inQuotes = false
    
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        values.push(currentVal.trim())
        currentVal = ''
      } else {
        currentVal += char
      }
    }
    values.push(currentVal.trim())
    
    const product: Partial<Product> = {}
    headers.forEach((header, idx) => {
      const value = values[idx] || ''
      
      switch (header) {
        case 'weight_kg':
          product[header] = parseFloat(value) || 0
          break
        case 'price_retail':
        case 'price_wholesale':
        case 'stock_qty':
          product[header] = parseInt(value.replace(/[^\d]/g, '')) || 0
          break
        default:
          (product as any)[header] = value
      }
    })
    
    products.push(product as Product)
  }
  
  return products
}

// Convert Products to CSV
export function productsToCSV(products: Product[]): string {
  const headers = [
    'product_name',
    'part_number',
    'brand',
    'category',
    'vehicle_compatibility',
    'material',
    'weight_kg',
    'price_retail',
    'price_wholesale',
    'stock_qty',
    'condition',
    'oem_number',
    'key_features',
    'notes',
    'status',
    'date_added'
  ]
  
  const rows = products.map(p => {
    return headers.map(h => {
      const val = (p as any)[h] || ''
      if (typeof val === 'string' && (val.includes(',') || val.includes('"'))) {
        return `"${val.replace(/"/g, '""')}"`
      }
      return val
    }).join(',')
  })
  
  return [headers.join(','), ...rows].join('\n')
}

// Read products from CSV
export function readProducts(): Product[] {
  try {
    if (!fs.existsSync(PRODUCTS_CSV)) {
      return []
    }
    const content = fs.readFileSync(PRODUCTS_CSV, 'utf-8')
    return parseProductsCSV(content)
  } catch (error) {
    console.error('Error reading products:', error)
    return []
  }
}

// Write products to CSV
export function writeProducts(products: Product[]): void {
  try {
    // Ensure directory exists
    const dir = path.dirname(PRODUCTS_CSV)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    const csv = productsToCSV(products)
    fs.writeFileSync(PRODUCTS_CSV, csv, 'utf-8')
  } catch (error) {
    console.error('Error writing products:', error)
    throw error
  }
}

// Add a single product
export function addProduct(product: Product): void {
  const products = readProducts()
  products.push(product)
  writeProducts(products)
}

// Update a product
export function updateProduct(partNumber: string, updates: Partial<Product>): void {
  const products = readProducts()
  const idx = products.findIndex(p => p.part_number === partNumber)
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...updates }
    writeProducts(products)
  }
}

// Batch update product status
export function batchUpdateStatus(partNumbers: string[], status: Product['status']): void {
  const products = readProducts()
  products.forEach(p => {
    if (partNumbers.includes(p.part_number)) {
      p.status = status
    }
  })
  writeProducts(products)
}
