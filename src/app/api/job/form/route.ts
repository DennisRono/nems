'use server'
import { NextRequest, NextResponse } from 'next/server'
import CustomError from '@/lib/CustomError'
import connectDB from '@/config/database_connect'
import JobApplicationForm from '@/schemas/mongoose/JobApplicationForm'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const isConnected = await connectDB()
    if (!isConnected) {
      throw new CustomError('Failed to connect to database', 500)
    }
    const newJob = new JobApplicationForm(data)
    await newJob.save()
    return NextResponse.json(
      { message: 'Job posted successfully!', job: newJob },
      { status: 201 }
    )
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

export async function GET() {
  try {
    const isConnected = await connectDB()
    if (!isConnected) {
      throw new CustomError('Failed to connect to database', 500)
    }
    const forms = await JobApplicationForm.find({})
    return NextResponse.json(forms)
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
