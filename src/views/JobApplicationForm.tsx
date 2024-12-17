'use client'
import { useEffect, useState } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'
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
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import api from '@/api'
import { toast } from 'react-toastify'
import { transformToJobApplicationPayload } from '@/lib/transform'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FileSearch, Loader2, Plus, Trash2 } from 'lucide-react'

const SkeletonLoader = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  )
}

type ValidationSchema = Yup.ObjectSchema<any>

export default function JobApplicationForm() {
  const searchParams = useSearchParams()

  const job_form_id = searchParams.get('job')
  const [currentStep, setCurrentStep] = useState(0)
  const [form, setForm] = useState<JobApplicationForm | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const res: any = await api('GET', `job/form/${job_form_id}`)
        const data = await res.json()

        if (res.ok) {
          setForm(data)
        } else {
          throw new Error(data.message)
        }
      } catch (error: any) {
        toast(error.message, { type: 'error' })
        setError('Error Getting Form: ' + error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [job_form_id])

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
      if (field.type === 'input-group') {
        const groupSchema: Record<string, any> = {}
        field.groupFields?.forEach((groupField) => {
          groupSchema[groupField.label] = Yup.string().required(
            `${groupField.label} is required`
          )
        })
        fieldSchema = field.isRepeatable
          ? Yup.array().of(Yup.object().shape(groupSchema))
          : Yup.object().shape(groupSchema)
      }
      schema[field.id] = fieldSchema
    })
    return Yup.object().shape(schema)
  }

  const initialValues: Record<string, any> = {}
  if (form) {
    form.steps.forEach((step) => {
      step.fields.forEach((field) => {
        if (field.type === 'input-group') {
          initialValues[field.id] = field.isRepeatable ? [{}] : {}
          field.groupFields?.forEach((groupField) => {
            if (field.isRepeatable) {
              initialValues[field.id][0][groupField.label] = ''
            } else {
              initialValues[field.id][groupField.label] = ''
            }
          })
        } else {
          initialValues[field.id] = field.type === 'checkbox' ? [] : ''
        }
      })
    })
  }

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'input':
        return (
          <Field name={field.id}>
            {({ field: formikField, meta }: any) => (
              <div>
                <Input
                  id={field.id}
                  {...formikField}
                  className="mt-1 border border-black"
                />
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
                <Textarea
                  id={field.id}
                  {...formikField}
                  className="mt-1 border border-black min-h-40 max-h-40"
                />
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
                  <SelectTrigger className="w-full mt-1 border border-black">
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
                  className="mt-1 border border-black"
                />
                {meta.touched && meta.error && (
                  <div className="text-red-500 text-sm mt-1">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
        )
      case 'radio':
        return (
          <Field name={field.id}>
            {({ field: formikField, form, meta }: any) => (
              <div>
                <RadioGroup
                  onValueChange={(value) => form.setFieldValue(field.id, value)}
                  value={formikField.value}
                >
                  {field.options?.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option}
                        id={`${field.id}-${option}`}
                      />
                      <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {meta.touched && meta.error && (
                  <div className="text-red-500 text-sm mt-1">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
        )
      case 'checkbox':
        return (
          <Field name={field.id}>
            {({ field: formikField, form, meta }: any) => (
              <div>
                {field.options?.map((option) => (
                  <div
                    key={option}
                    className="flex items-center space-x-2 mt-2"
                  >
                    <Checkbox
                      id={`${field.id}-${option}`}
                      checked={formikField.value.includes(option)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          form.setFieldValue(field.id, [
                            ...formikField.value,
                            option,
                          ])
                        } else {
                          form.setFieldValue(
                            field.id,
                            formikField.value.filter(
                              (value: string) => value !== option
                            )
                          )
                        }
                      }}
                    />
                    <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
                  </div>
                ))}
                {meta.touched && meta.error && (
                  <div className="text-red-500 text-sm mt-1">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
        )
      case 'input-group':
        return (
          <FieldArray name={field.id}>
            {({ push, remove }: any) => (
              <div>
                {field.isRepeatable ? (
                  <Field name={field.id}>
                    {({ field: formikField }: any) => (
                      <>
                        {formikField.value.map((_: any, index: number) => (
                          <div key={index} className="mt-4 p-4 border rounded">
                            {field.groupFields?.map((groupField) => (
                              <div key={groupField.label} className="mt-2">
                                <Label
                                  htmlFor={`${field.id}.${index}.${groupField.label}`}
                                >
                                  {groupField.label}
                                </Label>
                                <Field
                                  name={`${field.id}.${index}.${groupField.label}`}
                                >
                                  {({ field: groupFormikField, meta }: any) => (
                                    <div>
                                      {groupField.type === 'input' && (
                                        <Input
                                          {...groupFormikField}
                                          className="mt-1 border border-black"
                                        />
                                      )}
                                      {groupField.type === 'select' && (
                                        <Select
                                          onValueChange={(value) =>
                                            groupFormikField.onChange({
                                              target: {
                                                name: groupFormikField.name,
                                                value,
                                              },
                                            })
                                          }
                                          value={groupFormikField.value}
                                        >
                                          <SelectTrigger className="w-full mt-1 border border-black">
                                            <SelectValue placeholder="Select an option" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {groupField.options?.map(
                                              (option) => (
                                                <SelectItem
                                                  key={option}
                                                  value={option}
                                                >
                                                  {option}
                                                </SelectItem>
                                              )
                                            )}
                                          </SelectContent>
                                        </Select>
                                      )}
                                      {groupField.type === 'textarea' && (
                                        <Textarea
                                          {...groupFormikField}
                                          className="mt-1 border border-black min-h-20"
                                        />
                                      )}
                                      {meta.touched && meta.error && (
                                        <div className="text-red-500 text-sm mt-1">
                                          {meta.error}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </Field>
                              </div>
                            ))}
                            {index > 0 && (
                              <Button
                                type="button"
                                onClick={() => remove(index)}
                                className="mt-2"
                                variant="destructive"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() => push({})}
                          className="mt-2"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add {field.label}
                        </Button>
                      </>
                    )}
                  </Field>
                ) : (
                  <div className="mt-4 p-4 border rounded">
                    {field.groupFields?.map((groupField) => (
                      <div key={groupField.label} className="mt-2">
                        <Label htmlFor={`${field.id}.${groupField.label}`}>
                          {groupField.label}
                        </Label>
                        <Field name={`${field.id}.${groupField.label}`}>
                          {({ field: groupFormikField, meta }: any) => (
                            <div>
                              {groupField.type === 'input' && (
                                <Input
                                  {...groupFormikField}
                                  className="mt-1 border border-black"
                                />
                              )}
                              {groupField.type === 'select' && (
                                <Select
                                  onValueChange={(value) =>
                                    groupFormikField.onChange({
                                      target: {
                                        name: groupFormikField.name,
                                        value,
                                      },
                                    })
                                  }
                                  value={groupFormikField.value}
                                >
                                  <SelectTrigger className="w-full mt-1 border border-black">
                                    <SelectValue placeholder="Select an option" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {groupField.options?.map((option) => (
                                      <SelectItem key={option} value={option}>
                                        {option}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                              {groupField.type === 'textarea' && (
                                <Textarea
                                  {...groupFormikField}
                                  className="mt-1 border border-black min-h-20"
                                />
                              )}
                              {meta.touched && meta.error && (
                                <div className="text-red-500 text-sm mt-1">
                                  {meta.error}
                                </div>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </FieldArray>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return <SkeletonLoader />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <FileSearch className="w-24 h-24 text-muted-foreground mb-8" />
        <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8 text-center max-w-md">
          We couldn't find the job you're looking for. It may have been removed
          or doesn't exist.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/jobs">Browse All Jobs</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (form) {
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
          <Form className="max-w-4xl mx-auto py-8">
            <div className="w-full flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">{form.title}</h1>
              <Link href={`/job/${job_form_id}`}>
                <Button type="button">Job Description</Button>
              </Link>
            </div>
            <Card className="outline-none border-none shadow-none">
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
                    {field.description && (
                      <p className="text-sm text-gray-500 mb-2">
                        {field.description}
                      </p>
                    )}
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
                  {currentStep < form.steps.length - 1 ? (
                    'Next'
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : null}
                      Submit Application
                    </div>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
    )
  }
}
