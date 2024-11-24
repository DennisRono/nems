'use client'

import api from '@/api'
import SingleJob from '@/components/SingleJob'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const JobApplicationForm = dynamic(
  () => import('@/components/job-application-form'),
  { ssr: false }
)

export default function JobApplicationPage({ jobid }: { jobid: string }) {
  const [jobForm, setJobForm] = useState<JobApplicationForm | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [active, setIsActive] = useState<string>('description')

  const fetchJobs = async () => {
    try {
      setIsLoading(true)
      const res: any = await api('GET', `job/form/${jobid}`)
      const data = await res.json()
      if (res.ok) {
        setJobForm(data)
      } else {
        throw new Error(data.message)
      }
    } catch (error: any) {
      toast(error.message, { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [jobid])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!jobForm) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card>
          <CardContent>
            <p className="text-center">No job application form found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative w-full min-h-screen h-auto overflow-hidden">
      <div className="flex items-center justify-center py-10">
        <div className="w-full max-w-4xl">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform:
                  active === 'description'
                    ? 'translateX(0%)'
                    : 'translateX(-50%)',
                width: '200%',
              }}
            >
              <div className="w-full flex-shrink-0">
                <SingleJob jobid={jobForm.job} setIsActive={setIsActive} />
              </div>
              <div className="w-full flex-shrink-0">
                <JobApplicationForm form={jobForm} setIsActive={setIsActive} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
