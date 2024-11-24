'use server'
import { NextRequest, NextResponse } from 'next/server'
import CustomError from '@/lib/CustomError'
import connectDB from '@/config/database_connect'
import Job from '@/schemas/mongoose/JobsSchema'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const isConnected = await connectDB()
    if (!isConnected) {
      throw new CustomError('Failed to connect to database', 500)
    }
    const newJob = new Job(data)
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

export async function GET(request: NextRequest) {
  try {
    const isConnected = await connectDB()
    if (!isConnected) {
      throw new CustomError('Failed to connect to database', 500)
    }

    const jobsWithForms = await Job.aggregate([
      {
        $lookup: {
          from: 'jobapplicationforms',
          localField: '_id',
          foreignField: 'job',
          as: 'application_form',
        },
      },
      {
        $addFields: {
          application_form: { $arrayElemAt: ['$application_form', 0] },
        },
      },
    ])

    return NextResponse.json(jobsWithForms)
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
