'use client'
import { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import api from '@/api'
import { toast } from 'react-toastify'
import { transformToJobApplicationPayload } from '@/lib/transform'

interface JobApplicationFormProps {
  form: JobApplicationForm
  setIsActive: (value: any) => void
}

type ValidationSchema = Yup.ObjectSchema<any>

export default function JobApplicationForm({
  form,
  setIsActive,
}: JobApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const generateValidationSchema = (fields: FormField[]): ValidationSchema => {
    const schema: Record<string, any> = {}
    fields.forEach((field) => {
      let fieldSchema: any = Yup.string()
      if (field.required) {
        fieldSchema = fieldSchema.required(`${field.label} is required`)
      }
      if (field.type === 'upload') {
        fieldSchema = Yup.mixed().test(
          'fileSize',
          'File is too large',
          (value: any) => {
            if (!value) return true // Allow empty files if not required
            return value && value.size <= 5000000 // 5MB limit
          }
        )
        if (field.required) {
          fieldSchema = fieldSchema.required(`${field.label} is required`)
        }
      }
      schema[field.id] = fieldSchema
    })
    return Yup.object().shape(schema)
  }

  const initialValues: Record<string, any> = {}
  form.steps.forEach((step) => {
    step.fields.forEach((field) => {
      initialValues[field.id] = ''
    })
  })

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'input':
        return (
          <Field name={field.id}>
            {({ field: formikField, meta }: any) => (
              <div>
                <Input id={field.id} {...formikField} className="mt-1" />
                {meta.touched && meta.error && (
                  <div className="text-red-500 text-sm mt-1">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
        )
      case 'textarea':
        return (
          <Field name={field.id}>
            {({ field: formikField, meta }: any) => (
              <div>
                <Textarea id={field.id} {...formikField} className="mt-1" />
                {meta.touched && meta.error && (
                  <div className="text-red-500 text-sm mt-1">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
        )
      case 'select':
        return (
          <Field name={field.id}>
            {({ field: formikField, form, meta }: any) => (
              <div>
                <Select
                  onValueChange={(value) => form.setFieldValue(field.id, value)}
                  value={formikField.value}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {meta.touched && meta.error && (
                  <div className="text-red-500 text-sm mt-1">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
        )
      case 'upload':
        return (
          <Field name={field.id}>
            {({ field: formikField, form, meta }: any) => (
              <div>
                <Input
                  id={field.id}
                  type="file"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0]
                    form.setFieldValue(field.id, file)
                  }}
                  className="mt-1"
                />
                {meta.touched && meta.error && (
                  <div className="text-red-500 text-sm mt-1">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
        )
      default:
        return null
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateValidationSchema(
        form.steps[currentStep].fields
      )}
      onSubmit={async (values, { setSubmitting }) => {
        if (currentStep < form.steps.length - 1) {
          setCurrentStep((prev) => prev + 1)
          setSubmitting(false)
        } else {
          // save user application for the job
          const application = transformToJobApplicationPayload(
            form?._id || 'noformidfound',
            form?.job || 'nojobidfound',
            '67419e53d43663014896a4f4',
            form.steps,
            values
          )
          console.log(application)
          try {
            const res: any = await api('POST', `job/application`, application)
            const data = await res.json()
            if (res.ok) {
              toast(data.message, { type: 'success' })
            } else {
              throw new Error(data.message)
            }
          } catch (error: any) {
            toast(error.message, { type: 'error' })
          }
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="container mx-auto py-8">
          <div className="w-full flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">{form.title}</h1>
            <Button
              type="button"
              onClick={() => {
                setIsActive('description')
              }}
            >
              Job Description
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{form.steps[currentStep].title}</CardTitle>
            </CardHeader>
            <CardContent>
              {form.steps[currentStep].fields.map((field) => (
                <div key={field.id} className="mb-4">
                  <Label htmlFor={field.id}>
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </Label>
                  {renderField(field)}
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              {currentStep > 0 && (
                <Button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  variant="outline"
                >
                  Previous
                </Button>
              )}
              <Button
                type="submit"
                className="ml-auto bg-black text-white"
                disabled={isSubmitting}
              >
                {currentStep < form.steps.length - 1
                  ? 'Next'
                  : 'Submit Application'}
              </Button>
            </CardFooter>
          </Card>
        </Form>
      )}
    </Formik>
  )
}
