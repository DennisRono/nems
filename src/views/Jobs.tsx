'use client'
import { useEffect, useState } from 'react'
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
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Search,
  Bookmark,
} from 'lucide-react'
import { useAppDispatch } from '@/store/hooks'
import { setTab } from '@/store/slices/tabSlice'
import api from '@/api'
import { toast } from 'react-toastify'
import { setCache } from '@/store/slices/stackcacheSlice'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import formatDate from '@/lib/formatDate'
import format from '@/lib/formatCurrency'

function JobSearchSkeleton() {
  return (
    <div className="h-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Skeleton className="h-10 w-64 mb-8" />

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <Skeleton className="h-12 w-full md:w-3/4" />
            <Skeleton className="h-12 w-full md:w-1/4" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-12" />
          ))}
        </div>

        <div className="space-y-6 pb-6">
          {[...Array(5)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, innerIndex) => (
                    <div key={innerIndex} className="flex items-center">
                      <Skeleton className="h-5 w-5 mr-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-40" />
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Jobs() {
  const [jobsData, setJobData] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [jobType, setJobType] = useState('all')
  const [location, setLocation] = useState('')
  const [salaryRange, setSalaryRange] = useState([0, 200000])
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const jobsPerPage = 5

  const dispatch = useAppDispatch()
  const router = useRouter()

  const fetchJobs = async () => {
    try {
      setIsLoading(true)
      const res: any = await api('GET', 'job')
      const data = await res.json()
      if (res.ok) {
        setJobData(data)
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
  }, [])

  const parseSalary = (salary: string) => {
    const matches = salary.match(/\d+/g)
    if (!matches) return [0, 0]
    return matches.map(Number)
  }

  console.log(jobsData)

  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      searchTerm === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType =
      jobType === 'all' ||
      job.employmentType.toLowerCase() === jobType.toLowerCase()

    const matchesLocation =
      location === '' ||
      job.location.toLowerCase().includes(location.toLowerCase())

    const [minSalary, maxSalary] = parseSalary(job.salary)
    const matchesSalary =
      minSalary >= salaryRange[0] && maxSalary <= salaryRange[1]

    const matchesRemote =
      !remoteOnly || job.location.toLowerCase().includes('remote')

    return (
      matchesSearch &&
      matchesType &&
      matchesLocation &&
      matchesSalary &&
      matchesRemote
    )
  })

  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

  if (isLoading) {
    return <JobSearchSkeleton />
  }

  console.log(jobsData)
  return (
    <div className="h-full py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-100 via-blue-100 to-pink-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Find Your Dream Job</h1>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-black outline-none"
              />
            </div>
            <Button className="w-full md:w-auto h-12">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-1/4">
            <div>
              <Label htmlFor="jobType">Job Type</Label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger
                  id="jobType"
                  className="text-black border border-black"
                >
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-9 border border-black text-black"
              />
            </div>
            <div>
              <Label>Salary Range</Label>
              <Slider
                min={0}
                max={200000}
                step={10000}
                value={salaryRange}
                onValueChange={setSalaryRange}
                className="mt-2 border-black"
              />
              <div className="flex justify-between mt-1 text-sm text-black">
                <span>Ksh. {salaryRange[0].toLocaleString()}</span>
                <span>Ksh. {salaryRange[1].toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="remote-only"
                checked={remoteOnly}
                onCheckedChange={setRemoteOnly}
              />
              <Label htmlFor="remote-only">Remote Only</Label>
            </div>
          </div>

          <div className="space-y-6 pb-6 flex-1">
            {currentJobs.map((job: any) => {
              const salrange = job.salary
                .split(' - ')
                .map((val: string) => format(parseInt(val)))
                .join(' - ')
              return (
                <Card
                  key={job._id}
                  onClick={() =>
                    job.application_form
                      ? router.push(`/job/${job.application_form?._id}`, {
                          scroll: true,
                        })
                      : () => {}
                  }
                  className="cursor-pointer"
                  title={job.title}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-bold">
                        {job.title}
                      </CardTitle>
                      <div className="p-2" onClick={(e) => e.stopPropagation()}>
                        <Bookmark className="w-6 h-6 cursor-pointer" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <Briefcase className="w-5 h-5 mr-2" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        <span>{job.employmentType}</span>
                      </div>
                      <div className="flex items-center">
                        <span>{salrange}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-start justify-start text-start gap-2">
                      <div className="">
                        <span className="text-sm text-gray-500 mb-2 pr-2">
                          Posted on {formatDate(job.createdAt)}
                        </span>
                      </div>
                      <div className="border-l border-gray-500 pl-2">
                        <span className="text-sm text-gray-500">
                          Deadline {formatDate(job.applicationDeadline)}
                        </span>
                      </div>
                    </div>

                    {!job.application_form ? (
                      <Button
                        variant="outline"
                        onClick={() => {
                          dispatch(setTab({ tab: 'new-job-form' }))
                          dispatch(setCache({ cache: job }))
                        }}
                      >
                        Create Application Form
                      </Button>
                    ) : null}
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>

        {filteredJobs.length > jobsPerPage && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
