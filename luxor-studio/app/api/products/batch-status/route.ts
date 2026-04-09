import { NextRequest, NextResponse } from 'next/server'
import { batchUpdateStatus } from '@/lib/csv-handler'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { partNumbers, status } = body

    if (!partNumbers || !Array.isArray(partNumbers) || partNumbers.length === 0) {
      return NextResponse.json({ error: 'No part numbers provided' }, { status: 400 })
    }

    if (!status) {
      return NextResponse.json({ error: 'No status provided' }, { status: 400 })
    }

    batchUpdateStatus(partNumbers, status)

    return NextResponse.json({ 
      success: true, 
      message: `${partNumbers.length} products updated to ${status}` 
    })
  } catch (error) {
    console.error('Failed to update status:', error)
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
  }
}
