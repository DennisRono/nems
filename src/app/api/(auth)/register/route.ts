'use server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.json()
  try {
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    )
  }
}
