'use client'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Plus, Trash2, Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import api from '@/api'
import { toast } from 'react-toastify'

type Job = {
  _id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  postedDate: string
}

type FieldType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'upload'
  | 'radio'
  | 'checkbox'
  | 'input-group'
  | 'repeatable'

type GroupField = {
  label: string
  type: 'input' | 'select' | 'textarea'
  description?: string
}

type FormField = {
  id: string
  label: string
  type: FieldType
  required: boolean
  description?: string
  options?: string[]
  groupFields?: GroupField[]
  isRepeatable?: boolean
}

type JobApplicationForm = {
  id: string
  title: string
  steps: Array<{
    id: string
    title: string
    fields: FormField[]
  }>
  job: string
}

export default function CreateJobApplicationForm({ job }: { job: Job }) {
  const [form, setForm] = useState<JobApplicationForm>({
    id: uuidv4(),
    title: job?.title || '',
    steps: [{ id: uuidv4(), title: 'Step 1', fields: [] }],
    job: job?._id || '',
  })
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const addStep = () => {
    setForm((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        { id: uuidv4(), title: `Step ${prev.steps.length + 1}`, fields: [] },
      ],
    }))
  }

  const addField = (stepId: string) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              fields: [
                ...step.fields,
                {
                  id: uuidv4(),
                  label: '',
                  type: 'input',
                  required: false,
                  description: '',
                },
              ],
            }
          : step
      ),
    }))
  }

  const updateField = (
    stepId: string,
    fieldId: string,
    updates: Partial<FormField>
  ) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              fields: step.fields.map((field) =>
                field.id === fieldId ? { ...field, ...updates } : field
              ),
            }
          : step
      ),
    }))
  }

  const removeField = (stepId: string, fieldId: string) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              fields: step.fields.filter((field) => field.id !== fieldId),
            }
          : step
      ),
    }))
  }

  const addSelectOption = (stepId: string, fieldId: string) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              fields: step.fields.map((field) =>
                field.id === fieldId
                  ? { ...field, options: [...(field.options || []), ''] }
                  : field
              ),
            }
          : step
      ),
    }))
  }

  const updateSelectOption = (
    stepId: string,
    fieldId: string,
    index: number,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              fields: step.fields.map((field) =>
                field.id === fieldId && field.options
                  ? {
                      ...field,
                      options: field.options.map((opt, i) =>
                        i === index ? value : opt
                      ),
                    }
                  : field
              ),
            }
          : step
      ),
    }))
  }

  const removeSelectOption = (
    stepId: string,
    fieldId: string,
    index: number
  ) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              fields: step.fields.map((field) =>
                field.id === fieldId && field.options
                  ? {
                      ...field,
                      options: field.options.filter((_, i) => i !== index),
                    }
                  : field
              ),
            }
          : step
      ),
    }))
  }

  const addGroupField = (stepId: string, fieldId: string) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              fields: step.fields.map((field) =>
                field.id === fieldId
                  ? {
                      ...field,
                      groupFields: [
                        ...(field.groupFields || []),
                        { label: '', type: 'input', description: '' },
                      ],
                    }
                  : field
              ),
            }
          : step
      ),
    }))
  }

  const updateGroupField = (
    stepId: string,
    fieldId: string,
    index: number,
    updates: Partial<GroupField>
  ) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              fields: step.fields.map((field) =>
                field.id === fieldId && field.groupFields
                  ? {
                      ...field,
                      groupFields: field.groupFields.map((groupField, i) =>
                        i === index ? { ...groupField, ...updates } : groupField
                      ),
                    }
                  : field
              ),
            }
          : step
      ),
    }))
  }

  const removeGroupField = (stepId: string, fieldId: string, index: number) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              fields: step.fields.map((field) =>
                field.id === fieldId && field.groupFields
                  ? {
                      ...field,
                      groupFields: field.groupFields.filter(
                        (_, i) => i !== index
                      ),
                    }
                  : field
              ),
            }
          : step
      ),
    }))
  }

  const saveForm = async () => {
    console.log('Saving form:', form)
    try {
      setIsSaving(true)
      const res: any = await api('POST', 'job/form', form)
      const data = await res.json()
      if (res.ok) {
        toast(data.message, { type: 'success' })
      } else {
        throw new Error(data.message)
      }
    } catch (error: any) {
      toast(error.message, { type: 'error' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl mb-6">
        <span className="font-bold">
          {job?.title} (#ID:{job?._id.toUpperCase()})
        </span>
      </h1>

      {form.steps.map((step, stepIndex) => (
        <Card key={step.id} className="mb-6">
          <CardHeader>
            <CardTitle>
              <Input
                value={step?.title}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    steps: prev.steps.map((s) =>
                      s.id === step.id ? { ...s, title: e.target.value } : s
                    ),
                  }))
                }
                className="font-bold"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step.fields.map((field) => (
              <div key={field.id} className="mb-4 p-4 border rounded">
                <div className="flex justify-between items-center mb-2">
                  <Input
                    value={field.label}
                    onChange={(e) =>
                      updateField(step.id, field.id, { label: e.target.value })
                    }
                    placeholder="Field Label"
                    className="w-1/3"
                  />
                  <Select
                    value={field.type}
                    onValueChange={(value: FieldType) =>
                      updateField(step.id, field.id, { type: value })
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select field type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="input">Input</SelectItem>
                      <SelectItem value="textarea">Textarea</SelectItem>
                      <SelectItem value="select">Select</SelectItem>
                      <SelectItem value="upload">Upload</SelectItem>
                      <SelectItem value="input-group">Input Group</SelectItem>
                      <SelectItem value="radio">Radio</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center">
                    <Label htmlFor={`required-${field.id}`} className="mr-2">
                      Required
                    </Label>
                    <Switch
                      id={`required-${field.id}`}
                      checked={field.required}
                      onCheckedChange={(checked) =>
                        updateField(step.id, field.id, { required: checked })
                      }
                    />
                  </div>
                  {field.type === 'input-group' && (
                    <div className="flex items-center">
                      <Label
                        htmlFor={`repeatable-${field.id}`}
                        className="mr-2"
                      >
                        Repeatable
                      </Label>
                      <Switch
                        id={`repeatable-${field.id}`}
                        checked={field.isRepeatable}
                        onCheckedChange={(checked) =>
                          updateField(step.id, field.id, {
                            isRepeatable: checked,
                          })
                        }
                      />
                    </div>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeField(step.id, field.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  value={field.description}
                  onChange={(e) =>
                    updateField(step.id, field.id, {
                      description: e.target.value,
                    })
                  }
                  placeholder="Field Description"
                  className="w-full mt-2"
                />
                {(field.type === 'select' ||
                  field.type === 'radio' ||
                  field.type === 'checkbox') && (
                  <div className="mt-2">
                    <Label>Add Options</Label>
                    {field.options?.map((option, index) => (
                      <div key={index} className="flex items-center mt-2">
                        <Input
                          value={option}
                          onChange={(e) =>
                            updateSelectOption(
                              step.id,
                              field.id,
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
                            removeSelectOption(step.id, field.id, index)
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
                      onClick={() => addSelectOption(step.id, field.id)}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Option
                    </Button>
                  </div>
                )}
                {field.type === 'input-group' && (
                  <div className="mt-2">
                    <Label>Group Fields</Label>
                    {field.groupFields?.map((groupField, index) => (
                      <div
                        key={index}
                        className="flex flex-col mt-2 p-2 border rounded"
                      >
                        <div className="flex items-center">
                          <Input
                            value={groupField.label}
                            onChange={(e) =>
                              updateGroupField(step.id, field.id, index, {
                                label: e.target.value,
                              })
                            }
                            placeholder="Field Label"
                            className="flex-grow mr-2"
                          />
                          <Select
                            value={groupField.type}
                            onValueChange={(
                              value: 'input' | 'select' | 'textarea'
                            ) =>
                              updateGroupField(step.id, field.id, index, {
                                type: value,
                              })
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Field Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="input">Input</SelectItem>
                              <SelectItem value="select">Select</SelectItem>
                              <SelectItem value="textarea">Textarea</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              removeGroupField(step.id, field.id, index)
                            }
                            className="ml-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Textarea
                          value={groupField.description}
                          onChange={(e) =>
                            updateGroupField(step.id, field.id, index, {
                              description: e.target.value,
                            })
                          }
                          placeholder="Field Description"
                          className="w-full mt-2"
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addGroupField(step.id, field.id)}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Group Field
                    </Button>
                  </div>
                )}
              </div>
            ))}
            <Button onClick={() => addField(step.id)} className="mt-2">
              <Plus className="mr-2 h-4 w-4" /> Add Field
            </Button>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-between mt-6">
        <Button onClick={addStep}>
          <Plus className="mr-2 h-4 w-4" /> Add Step
        </Button>
        <Button
          onClick={saveForm}
          disabled={isSaving}
          className="bg-black text-white"
        >
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Form
        </Button>
      </div>
    </div>
  )
}
