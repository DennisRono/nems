import mongoose, { Schema, Document } from 'mongoose'

interface IGroupField {
  label: string
  type: 'input' | 'select' | 'textarea'
  description?: string
  options?: string[]
}

interface IFormField {
  id: string
  label: string
  type:
    | 'input'
    | 'textarea'
    | 'select'
    | 'upload'
    | 'radio'
    | 'checkbox'
    | 'input-group'
  required: boolean
  description?: string
  options?: string[]
  groupFields?: IGroupField[]
  isRepeatable?: boolean
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

const GroupFieldSchema = new Schema<IGroupField>({
  label: { type: String, required: true },
  type: {
    type: String,
    enum: ['input', 'select', 'textarea'],
    required: true,
  },
  description: { type: String },
  options: [{ type: String }],
})

const FormFieldSchema = new Schema<IFormField>({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: {
    type: String,
    enum: [
      'input',
      'textarea',
      'select',
      'upload',
      'radio',
      'checkbox',
      'input-group',
    ],
    required: true,
  },
  required: { type: Boolean, default: false },
  description: { type: String },
  options: [{ type: String }],
  groupFields: [GroupFieldSchema],
  isRepeatable: { type: Boolean, default: false },
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

const JobApplicationForm =
  mongoose.models?.JobApplicationForm ||
  mongoose.model<IJobApplicationForm>(
    'JobApplicationForm',
    JobApplicationFormSchema
  )

export default JobApplicationForm
