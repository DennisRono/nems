'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, ArrowRight, Plus, Trash2, Loader2 } from 'lucide-react'
import { newJobSchema } from '@/schemas/yup/newjob'
import api from '@/api'
import { toast } from 'react-toastify'

export default function JobPostingForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      company: '',
      location: '',
      employmentType: '',
      salary: '',
      summary: '',
      responsibilities: [''],
      requirements: [''],
      educationLevel: '',
      aboutCompany: '',
      benefits: [''],
      applicationDeadline: '',
      contactEmail: '',
    },
    validationSchema: newJobSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true)
      try {
        const res: any = await api('POST', 'job', values)
        const data = await res.json()
        if (res.ok) {
          toast(data.message, { type: 'success' })
        } else {
          throw new Error(
            data.message || 'An error occurred while submitting the job posting'
          )
        }
      } catch (error) {
        toast.error('Error submitting job posting. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  const { errors, touched, values, handleChange, handleSubmit, setFieldValue } =
    formik

  const addListItem = (field: keyof typeof values) => {
    setFieldValue(field, [...(values[field] as string[]), ''])
  }

  const updateListItem = (
    field: keyof typeof values,
    index: number,
    value: string
  ) => {
    const updatedList = [...(values[field] as string[])]
    updatedList[index] = value
    setFieldValue(field, updatedList)
  }

  const removeListItem = (field: keyof typeof values, index: number) => {
    const updatedList = (values[field] as string[]).filter(
      (_, i) => i !== index
    )
    setFieldValue(field, updatedList)
  }

  const handleNext = () => {
    const fieldsToValidate = getFieldsForStep(step)
    formik.validateForm().then((stepErrors) => {
      const hasErrors = fieldsToValidate.some(
        (field) =>
          Object.prototype.hasOwnProperty.call(stepErrors, field) &&
          stepErrors[field as keyof typeof stepErrors]
      )
      if (!hasErrors) {
        setStep((prev) => Math.min(prev + 1, 4))
      } else {
        // Touch all fields in the current step to show errors
        fieldsToValidate.forEach((field) => formik.setFieldTouched(field, true))
      }
    })
  }

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1))

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1:
        return ['title', 'company', 'location', 'employmentType', 'salary']
      case 2:
        return ['summary', 'responsibilities', 'requirements', 'educationLevel']
      case 3:
        return ['aboutCompany', 'benefits']
      case 4:
        return ['applicationDeadline', 'contactEmail']
      default:
        return []
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Post a New Job
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-1/4 h-2 ${
                    i <= step ? 'bg-black' : 'bg-gray-200'
                  } ${i < 4 ? 'mr-1' : ''}`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs">Basic Info</span>
              <span className="text-xs">Details</span>
              <span className="text-xs">Company</span>
              <span className="text-xs">Finish</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    className={
                      errors.title && touched.title ? 'border-red-500' : ''
                    }
                  />
                  {touched.title && errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    value={values.company}
                    onChange={handleChange}
                    className={
                      errors.company && touched.company ? 'border-red-500' : ''
                    }
                  />
                  {touched.company && errors.company && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.company}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    className={
                      errors.location && touched.location
                        ? 'border-red-500'
                        : ''
                    }
                  />
                  {touched.location && errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <Select
                    value={values.employmentType}
                    onValueChange={(value) =>
                      setFieldValue('employmentType', value)
                    }
                  >
                    <SelectTrigger
                      id="employmentType"
                      className={
                        errors.employmentType && touched.employmentType
                          ? 'border-red-500'
                          : ''
                      }
                    >
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                  {touched.employmentType && errors.employmentType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.employmentType}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="salary">Salary Range (Optional)</Label>
                  <Input
                    id="salary"
                    name="salary"
                    value={values.salary}
                    onChange={handleChange}
                    placeholder="e.g., Ksh 50,000 - Ksh 70,000"
                    className={
                      errors.salary && touched.salary ? 'border-red-500' : ''
                    }
                  />
                  {touched.salary && errors.salary && (
                    <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="summary">Job Summary</Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    value={values.summary}
                    onChange={handleChange}
                    className={
                      errors.summary && touched.summary ? 'border-red-500' : ''
                    }
                  />
                  {touched.summary && errors.summary && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.summary}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Responsibilities</Label>
                  {values.responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-center mt-2">
                      <Input
                        value={responsibility}
                        onChange={(e) =>
                          updateListItem(
                            'responsibilities',
                            index,
                            e.target.value
                          )
                        }
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          removeListItem('responsibilities', index)
                        }
                        className="ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addListItem('responsibilities')}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Responsibility
                  </Button>
                </div>
                <div>
                  <Label>Requirements</Label>
                  {values.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center mt-2">
                      <Input
                        value={requirement}
                        onChange={(e) =>
                          updateListItem('requirements', index, e.target.value)
                        }
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeListItem('requirements', index)}
                        className="ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addListItem('requirements')}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Requirement
                  </Button>
                </div>
                <div>
                  <Label htmlFor="educationLevel">Education Level</Label>
                  <Select
                    value={values.educationLevel}
                    onValueChange={(value) =>
                      setFieldValue('educationLevel', value)
                    }
                  >
                    <SelectTrigger
                      id="educationLevel"
                      className={
                        errors.educationLevel && touched.educationLevel
                          ? 'border-red-500'
                          : ''
                      }
                    >
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="associate">
                        Associate's Degree
                      </SelectItem>
                      <SelectItem value="bachelor">
                        Bachelor's Degree
                      </SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="doctorate">Doctorate</SelectItem>
                    </SelectContent>
                  </Select>
                  {touched.educationLevel && errors.educationLevel && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.educationLevel}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="aboutCompany">About the Company</Label>
                  <Textarea
                    id="aboutCompany"
                    name="aboutCompany"
                    value={values.aboutCompany}
                    onChange={handleChange}
                    className={
                      errors.aboutCompany && touched.aboutCompany
                        ? 'border-red-500'
                        : ''
                    }
                  />
                  {touched.aboutCompany && errors.aboutCompany && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.aboutCompany}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Benefits (Optional)</Label>
                  {values.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center mt-2">
                      <Input
                        value={benefit}
                        onChange={(e) =>
                          updateListItem('benefits', index, e.target.value)
                        }
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeListItem('benefits', index)}
                        className="ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addListItem('benefits')}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Benefit
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="applicationDeadline">
                    Application Deadline (Optional)
                  </Label>
                  <Input
                    id="applicationDeadline"
                    name="applicationDeadline"
                    type="date"
                    value={values.applicationDeadline}
                    onChange={handleChange}
                    className={
                      errors.applicationDeadline && touched.applicationDeadline
                        ? 'border-red-500'
                        : ''
                    }
                  />
                  {touched.applicationDeadline &&
                    errors.applicationDeadline && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.applicationDeadline}
                      </p>
                    )}
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={values.contactEmail}
                    onChange={handleChange}
                    className={
                      errors.contactEmail && touched.contactEmail
                        ? 'border-red-500'
                        : ''
                    }
                  />
                  {touched.contactEmail && errors.contactEmail && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactEmail}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the terms and conditions
                  </label>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handlePrev} disabled={step === 1} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          {step < 4 ? (
            <Button onClick={handleNext}>
              Next <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={() => handleSubmit()}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Job Posting'
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
