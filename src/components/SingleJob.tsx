'use client'

import api from '@/api'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  MapPin,
  Briefcase,
  DollarSign,
  GraduationCap,
  Mail,
} from 'lucide-react'

interface JobDb {
  _id: string
  title: string
  company: string
  location: string
  employmentType: string
  salary: string
  summary: string
  responsibilities: string[]
  requirements: string[]
  educationLevel: string
  aboutCompany: string
  benefits: string[]
  applicationDeadline: string
  contactEmail: string
  createdAt: string
  updatedAt: string
}

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

const SingleJob = ({
  jobid,
  setIsActive,
}: {
  jobid: string
  setIsActive: (value: string) => void
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [job, setJob] = useState<JobDb | null>(null)

  const fetchJobs = async () => {
    try {
      if (!job && jobid) {
        setIsLoading(true)
        const res: any = await api('GET', `job/${jobid}`)
        const data = await res.json()
        if (res.ok) {
          setJob(data)
        } else {
          throw new Error(data.message)
        }
      }
    } catch (error: any) {
      toast(error.message, { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  if (isLoading) {
    return <SkeletonLoader />
  }

  if (!job) {
    return <div className="text-center py-10">No job found</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">
                {job.title}
              </CardTitle>
              <p className="text-xl text-muted-foreground">{job.company}</p>
            </div>
            <Button
              onClick={() => {
                setIsActive('apply-form')
              }}
            >
              Apply Now
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {job.location}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" /> {job.employmentType}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" /> {job.salary}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <GraduationCap className="w-4 h-4" /> {job.educationLevel}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Deadline:{' '}
              {new Date(job.applicationDeadline).toLocaleDateString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Job Summary</h2>
            <p>{job.summary}</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-1">
              {job.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Requirements</h2>
            <ul className="list-disc pl-5 space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">About {job.company}</h2>
            <p>{job.aboutCompany}</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Benefits</h2>
            <ul className="list-disc pl-5 space-y-1">
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <Button
              className="w-full"
              onClick={() => {
                setIsActive('apply-form')
              }}
            >
              Apply for this position
            </Button>
            <p className="text-center mt-4 text-muted-foreground">
              Or contact us at{' '}
              <a
                href={`mailto:${job.contactEmail}`}
                className="text-primary hover:underline"
              >
                <Mail className="w-4 h-4 inline mr-1" />
                {job.contactEmail}
              </a>
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}

export default SingleJob
