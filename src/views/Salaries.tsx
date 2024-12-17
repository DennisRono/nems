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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Search, DollarSign, MapPin, Briefcase } from 'lucide-react'

type SalaryData = {
  id: number
  jobTitle: string
  company: string
  location: string
  salaryRange: string
  averageSalary: number
  experience: string
}

const salaryData: SalaryData[] = [
  {
    id: 1,
    jobTitle: 'Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salaryRange: '$80,000 - $150,000',
    averageSalary: 115000,
    experience: '3-5 years',
  },
  {
    id: 2,
    jobTitle: 'Data Scientist',
    company: 'DataTech',
    location: 'New York, NY',
    salaryRange: '$90,000 - $160,000',
    averageSalary: 125000,
    experience: '2-4 years',
  },
  {
    id: 3,
    jobTitle: 'Product Manager',
    company: 'InnovateCo',
    location: 'Seattle, WA',
    salaryRange: '$100,000 - $180,000',
    averageSalary: 140000,
    experience: '5-7 years',
  },
  {
    id: 4,
    jobTitle: 'UX Designer',
    company: 'DesignHub',
    location: 'Austin, TX',
    salaryRange: '$70,000 - $130,000',
    averageSalary: 100000,
    experience: '2-5 years',
  },
  {
    id: 5,
    jobTitle: 'DevOps Engineer',
    company: 'CloudSys',
    location: 'Chicago, IL',
    salaryRange: '$85,000 - $155,000',
    averageSalary: 120000,
    experience: '3-6 years',
  },
]

export default function Salaries() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedExperience, setSelectedExperience] = useState('')

  const filteredData = salaryData.filter(
    (item) =>
      (item.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedLocation === '' || item.location.includes(selectedLocation)) &&
      (selectedExperience === '' ||
        item.experience.includes(selectedExperience))
  )

  const locations = Array.from(new Set(salaryData.map((item) => item.location)))
  const experienceLevels = Array.from(
    new Set(salaryData.map((item) => item.experience))
  )

  return (
    <div className="h-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Salary Explorer</h1>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-2">
            <Input
              type="text"
              placeholder="Search job titles or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9"
            />
          </div>
          <div>
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              value={selectedExperience}
              onValueChange={setSelectedExperience}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Experience Levels</SelectItem>
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Salary Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Salary Range</TableHead>
                  <TableHead>Experience</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.jobTitle}
                    </TableCell>
                    <TableCell>{item.company}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.salaryRange}</TableCell>
                    <TableCell>{item.experience}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
