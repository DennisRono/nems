'use client'
import { useState } from 'react'
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

type Job = {
  id: number
  title: string
  company: string
  location: string
  type: string
  salary: string
  postedDate: string
}

const jobsData: Job[] = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$80,000 - $120,000',
    postedDate: '2023-05-15',
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'DataSystems',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$100,000 - $150,000',
    postedDate: '2023-05-14',
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'CreativeSolutions',
    location: 'Chicago, IL',
    type: 'Contract',
    salary: '$70 - $100 per hour',
    postedDate: '2023-05-13',
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'AIInnovate',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$90,000 - $140,000',
    postedDate: '2023-05-12',
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$110,000 - $160,000',
    postedDate: '2023-05-11',
  },
]

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [jobType, setJobType] = useState('all')
  const [location, setLocation] = useState('')
  const [salaryRange, setSalaryRange] = useState([0, 200000])
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 5

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

  console.log('Filtered Jobs:', filteredJobs)
  console.log('Current Page:', currentPage)
  console.log('Jobs on Current Page:', currentJobs)

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
            <Card key={job.id}>
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
                <Button variant="outline">Apply Now</Button>
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
