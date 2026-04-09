export interface Product {
  id?: string
  product_name: string
  part_number: string
  brand: string
  category: string
  vehicle_compatibility: string
  material: string
  weight_kg: number
  price_retail: number
  price_wholesale: number
  stock_qty: number
  condition: string
  oem_number: string
  key_features: string
  notes: string
  status: 'Draft' | 'Ready' | 'Published'
  date_added: string
  image_url?: string
}

export interface GeneratedDescription {
  tokopedia_title: string
  tokopedia_description: string
  tiktok_title: string
  tiktok_description: string
  seo_tags: string[]
  hashtags: string[]
}

export interface PhotoJob {
  id: string
  originalName: string
  status: 'pending' | 'processing' | 'done' | 'error'
  originalUrl?: string
  processedUrl?: string
  error?: string
}

export type Panel = 'photo-studio' | 'product-writer' | 'product-list'

export const CATEGORIES = [
  'Filters',
  'Brake',
  'Engine',
  'Electrical',
  'Drivetrain',
  'Body',
  'Fluids',
  'Cooling',
  'Suspension',
]

export const BRANDS = [
  'Hino',
  'Isuzu',
  'Mitsubishi Fuso',
  'Toyota',
  'Scania',
  'Volvo',
  'MAN',
  'Mercedes-Benz',
  'UD Trucks',
  'Generic',
]
