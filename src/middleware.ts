'use server'
import { NextRequest, NextResponse } from 'next/server'
import CustomError from '@/lib/CustomError'

export default async function middleware(request: NextRequest) {
  try {
    console.log('middleware')
  } catch (error: any) {
    console.log('Error in Middleware')
    const statusCode = error instanceof CustomError ? error.statusCode : 500
    return NextResponse.json({ message: error.message }, { status: statusCode })
  }
}

export const config = {
  matcher: ['/api/:path*'],
}
