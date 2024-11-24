import mongoose, { Schema, Document } from 'mongoose'

// Interfaces
interface IFormField {
  id: string
  label: string
  type: 'input' | 'textarea' | 'select' | 'upload'
  required: boolean
  options?: string[]
}

interface IFormStep {
  id: string
  title: string
  fields: IFormField[]
}

interface IJobApplicationForm extends Document {
  id: string
  title: string
  steps: IFormStep[]
  job: mongoose.Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

// Schemas
const FormFieldSchema = new Schema<IFormField>({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: {
    type: String,
    enum: ['input', 'textarea', 'select', 'upload'],
    required: true,
  },
  required: { type: Boolean, default: false },
  options: [{ type: String }],
})

const FormStepSchema = new Schema<IFormStep>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  fields: [FormFieldSchema],
})

const JobApplicationFormSchema = new Schema<IJobApplicationForm>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    steps: [FormStepSchema],
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Jobs',
      required: true,
    },
  },
  { timestamps: true }
)

// Model
const JobApplicationForm =
  mongoose.models?.JobApplicationForm ||
  mongoose.model<IJobApplicationForm>(
    'JobApplicationForm',
    JobApplicationFormSchema
  )

export default JobApplicationForm
