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
} from 'lucide-react'
import { useAppDispatch } from '@/store/hooks'
import { setTab } from '@/store/slices/tabSlice'
import api from '@/api'
import { toast } from 'react-toastify'
import { setCache } from '@/store/slices/stackcacheSlice'

type Job = {
  _id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  postedDate: string
}

export default function Jobs() {
  const [jobsData, setJobData] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [jobType, setJobType] = useState('all')
  const [location, setLocation] = useState('')
  const [salaryRange, setSalaryRange] = useState([0, 200000])
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 5

  const dispatch = useAppDispatch()

  const fetchJobs = async () => {
    try {
      const res: any = await api('GET', 'job')
      const data = await res.json()
      if (res.ok) {
        setJobData(data)
      } else {
        throw new Error(data.message)
      }
    } catch (error: any) {
      toast(error.message, { type: 'error' })
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

  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      searchTerm === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType =
      jobType === 'all' || job.type.toLowerCase() === jobType.toLowerCase()

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

  return (
    <div className="h-full py-8 px-4 sm:px-6 lg:px-8">
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
                className="w-full"
              />
            </div>
            <Button className="w-full md:w-auto h-12">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div>
            <Label htmlFor="jobType">Job Type</Label>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger id="jobType">
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
              className="h-9"
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
              className="mt-2"
            />
            <div className="flex justify-between mt-1 text-sm text-gray-500">
              <span>${salaryRange[0].toLocaleString()}</span>
              <span>${salaryRange[1].toLocaleString()}</span>
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

        <div className="space-y-6 pb-6">
          {currentJobs.map((job) => (
            <Card key={job._id}>
              <CardHeader>
                <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
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
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    <span>{job.salary}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Posted on {job.postedDate}
                </span>
                <Button
                  variant="outline"
                  onClick={() => {
                    dispatch(setTab({ tab: 'new-job-form' }))
                    dispatch(setCache({ cache: job._id }))
                  }}
                >
                  Create Application Form
                </Button>
              </CardFooter>
            </Card>
          ))}
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
