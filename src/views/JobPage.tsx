'use client'
import api from '@/api'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Mail,
  FileSearch,
} from 'lucide-react'
import format from '@/lib/formatCurrency'
import Link from 'next/link'

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

export default function JobPage({ job_form_id }: { job_form_id: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [job, setJob] = useState<JobDb | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (
    endpoint: string,
    errorMsg: string,
    callback: (data: any) => void
  ) => {
    try {
      setIsLoading(true)
      const res: any = await api('GET', endpoint)
      const data = await res.json()

      if (res.ok) {
        callback(data)
      } else {
        throw new Error(data.message || errorMsg)
      }
    } catch (error: any) {
      toast(error.message, { type: 'error' })
      setError('job error ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchJobs = async (job_id: string) => {
    if (!job && job_id) {
      await fetchData(`job/${job_id}`, 'Failed to fetch job details.', setJob)
    }
  }

  const fetchJobID = async () => {
    if (!job && job_form_id) {
      await fetchData(
        `job/form/${job_form_id}`,
        'Failed to fetch job form.',
        (data) => {
          if (data.job) {
            fetchJobs(data.job)
          }
        }
      )
    }
  }

  useEffect(() => {
    fetchJobID()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job_form_id])

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

  if (job) {
    return (
      <article className="overflow-hidden bg-gradient-to-br from-[alicewhite] to-green-100">
        <header className="bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto h-full py-24 px-3">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl mb-1">{job.title}</h1>
                <p className="text-sm opacity-90">{job.company}</p>
              </div>
              <Link href={`/apply?job=${job_form_id}`}>
                <Button variant="secondary">Apply to this Job</Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-primary-foreground/10 text-primary-foreground"
              >
                <MapPin className="w-4 h-4" /> {job.location}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-primary-foreground/10 text-primary-foreground"
              >
                <Briefcase className="w-4 h-4" /> {job.employmentType}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-primary-foreground/10 text-primary-foreground"
              >
                {job.salary
                  .split(' - ')
                  .map((val: string) => format(parseInt(val)))
                  .join(' - ')}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-primary-foreground/10 text-primary-foreground"
              >
                <GraduationCap className="w-4 h-4" /> {job.educationLevel}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-primary-foreground/10 text-primary-foreground"
              >
                <Calendar className="w-4 h-4" /> Deadline:{' '}
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </Badge>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto py-12 p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-primary">
              Job Summary
            </h2>
            <p className="text-muted-foreground">{job.summary}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-primary">
              Requirements
            </h2>
            <ul className="!list-disc pl-5 space-y-2 text-muted-foreground">
              {job.requirements.map((req, index) => (
                <li key={index} className="list-disc">
                  {req}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-primary">
              Responsibilities
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {job.responsibilities.map((resp, index) => (
                <li key={index} className="list-disc">
                  {resp}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-primary capitalize">
              About {job.company}
            </h2>
            <p className="text-muted-foreground">{job.aboutCompany}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-primary">
              Benefits
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="list-disc">
                  {benefit}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="p-6">
          <div className="w-full flex items-center justify-between">
            <Link
              href={`/apply?job=${job_form_id}`}
              className="min-w-min mx-auto"
            >
              <Button className="min-w-min px-10 mb-4 mx-auto">
                Apply for this position
              </Button>
            </Link>
          </div>
          <p className="text-center text-muted-foreground">
            Or contact us at{' '}
            <a
              href={`mailto:${job.contactEmail}`}
              className="text-primary hover:underline inline-flex items-center"
            >
              <Mail className="w-4 h-4 mr-1" />
              {job.contactEmail}
            </a>
          </p>
        </footer>
      </article>
    )
  }
}
