type FieldResponse = {
  fieldId: string
  value: string | string[]
}

type StepResponse = {
  stepId: string
  responses: FieldResponse[]
}

type JobApplicationPayload = {
  formId: string
  jobId: string
  applicantId: string
  stepResponses: StepResponse[]
  submittedAt: Date
}

export const transformToJobApplicationPayload = (
  formId: string,
  jobId: string,
  applicantId: string,
  steps: any[],
  answers: Record<string, string>
): JobApplicationPayload => {
  const stepResponses: StepResponse[] = steps.map((step) => ({
    stepId: step.id,
    responses: step.fields.map((field: any) => ({
      fieldId: field.id,
      value: answers[field.id],
    })),
  }))

  return {
    formId,
    jobId,
    applicantId,
    stepResponses,
    submittedAt: new Date(),
  }
}
