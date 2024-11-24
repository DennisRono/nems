'use client'
import { useAppSelector } from '@/store/hooks'
import dynamic from 'next/dynamic'

const JobApplicationForm = dynamic(
  () => import('@/components/job-application-form'),
  { ssr: false }
)

const mockForm: JobApplicationForm = {
  id: '1',
  title: 'Software Developer Application',
  steps: [
    {
      id: '1',
      title: 'Personal Information',
      fields: [
        { id: 'name', label: 'Full Name', type: 'input', required: true },
        { id: 'email', label: 'Email', type: 'input', required: true },
        { id: 'phone', label: 'Phone Number', type: 'input', required: false },
      ],
    },
    {
      id: '2',
      title: 'Professional Information',
      fields: [
        {
          id: 'experience',
          label: 'Years of Experience',
          type: 'select',
          required: true,
          options: ['0-1', '1-3', '3-5', '5+'],
        },
        { id: 'skills', label: 'Skills', type: 'textarea', required: true },
        {
          id: 'resume',
          label: 'Upload Resume',
          type: 'upload',
          required: true,
        },
      ],
    },
  ],
}

export default function JobApplicationPage() {
  const job_id = useAppSelector((state) => state.cache).cache
  return <JobApplicationForm form={mockForm} />
}
