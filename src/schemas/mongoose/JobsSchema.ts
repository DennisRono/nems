import mongoose, { Schema, Document } from 'mongoose'

interface IJob extends Document {
  title: string
  company: string
  location: string
  employmentType: string
  salary: string
  summary: string
  responsibilities: string[]
  requirements: string[]
  educationLevel: string
  aboutCompany: string
  benefits: string[]
  applicationDeadline: Date
  job_form_id: mongoose.Schema.Types.ObjectId
  contactEmail: string
}

const JobSchema: Schema = new Schema<IJob>(
  {
    title: { type: String, required: [true, 'Job title is required.'] },
    company: { type: String, required: [true, 'Company name is required.'] },
    location: { type: String, required: [true, 'Job location is required.'] },
    employmentType: {
      type: String,
      required: [true, 'Employment type is required.'],
    },
    salary: {
      type: String,
      required: [true, 'Salary information is required.'],
    },
    summary: { type: String, required: [true, 'Job summary is required.'] },
    responsibilities: {
      type: [String],
      required: [true, 'At least one responsibility is required.'],
    },
    requirements: {
      type: [String],
      required: [true, 'At least one requirement is required.'],
    },
    educationLevel: {
      type: String,
      required: [true, 'Education level is required.'],
    },
    aboutCompany: {
      type: String,
      required: [true, 'Information about the company is required.'],
    },
    benefits: {
      type: [String],
      required: [true, 'At least one benefit must be specified.'],
    },
    applicationDeadline: {
      type: Date,
      required: [true, 'Application deadline is required.'],
    },
    contactEmail: {
      type: String,
      required: [true, 'Contact email is required.'],
      validate: {
        validator: function (email: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        },
        message: 'Please provide a valid email address.',
      },
    },
  },
  { timestamps: true }
)

const Job = mongoose.models?.Jobs || mongoose.model<IJob>('Jobs', JobSchema)

export default Job
