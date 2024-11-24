import mongoose, { Schema, Document } from 'mongoose'

interface IFormFieldResponse {
  fieldId: string
  value: string | string[]
}

interface IFormStepResponse {
  stepId: string
  responses: IFormFieldResponse[]
}

interface IJobApplication extends Document {
  formId: string
  jobId: mongoose.Schema.Types.ObjectId
  applicantId: mongoose.Schema.Types.ObjectId
  stepResponses: IFormStepResponse[]
  submittedAt: Date
}

const FormFieldResponseSchema = new Schema<IFormFieldResponse>({
  fieldId: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
})

const FormStepResponseSchema = new Schema<IFormStepResponse>({
  stepId: { type: String, required: true },
  responses: [FormFieldResponseSchema],
})

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    formId: { type: String, required: true, ref: 'JobApplicationForm' },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Jobs',
    },
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
    stepResponses: [FormStepResponseSchema],
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

const JobApplication =
  mongoose.models?.JobApplication ||
  mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema)

export default JobApplication
