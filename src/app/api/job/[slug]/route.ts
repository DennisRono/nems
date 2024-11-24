'use server'
import { NextRequest, NextResponse } from 'next/server'
import CustomError from '@/lib/CustomError'
import connectDB from '@/config/database_connect'
import Job from '@/schemas/mongoose/JobsSchema'

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await props.params
    const slug: string = params.slug
    if (!slug) {
      throw new CustomError('no id in URL', 500)
    }
    const isConnected = await connectDB()
    if (!isConnected) {
      throw new CustomError('Failed to connect to database', 500)
    }

    const jobs = await Job.findById(slug)
    if (!jobs) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 })
    } else {
      return NextResponse.json(jobs)
    }
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
    const statusCode = error instanceof CustomError ? error.statusCode : 500
    return NextResponse.json(
      { message: error.message || 'An unexpected error occurred' },
      { status: statusCode }
    )
  }
}
