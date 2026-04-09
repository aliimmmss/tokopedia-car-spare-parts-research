import { NextRequest, NextResponse } from 'next/server'
import { readProducts, addProduct } from '@/lib/csv-handler'
import { Product } from '@/lib/types'

export async function GET() {
  try {
    const products = readProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error('Failed to read products:', error)
    return NextResponse.json({ error: 'Failed to read products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const product = body.product as Product

    if (!product || !product.part_number) {
      return NextResponse.json({ error: 'Invalid product data' }, { status: 400 })
    }

    addProduct({
      ...product,
      date_added: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: 'Product added' })
  } catch (error) {
    console.error('Failed to add product:', error)
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 })
  }
}
