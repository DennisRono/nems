'use client'

import { useState, useMemo } from 'react'
import { generateMockData } from '@/Data/attendance'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Download,
  Filter,
  Search,
  AlertTriangle,
  ThumbsUp,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function EmployeeAttendancePage() {
  const [employees] = useState<EmployeeAttendance[]>(() => generateMockData(50))
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('all')
  const [date, setDate] = useState<string>('')
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeAttendance | null>(null)

  const filteredEmployees = useMemo(() => {
    return employees.filter(
      (employee) =>
        (employee.name.toLowerCase().includes(search.toLowerCase()) ||
          employee.id.toLowerCase().includes(search.toLowerCase())) &&
        (department === 'all' || employee.department === department) &&
        (date
          ? employee.attendance.some((record) => record.date === date)
          : true)
    )
  }, [employees, search, department, date])

  const handleExport = () => {
    // Implement CSV export logic here
    console.log('Exporting data...')
  }

  const handleAction = (
    action: 'warn' | 'praise',
    employee: EmployeeAttendance
  ) => {
    console.log(
      `${action === 'warn' ? 'Warning' : 'Praising'} employee:`,
      employee.id
    )
    // Implement the logic for warning or praising an employee
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Good Standing':
        return 'bg-green-500 hover:bg-green-600'
      case 'Warning':
        return 'bg-yellow-500 hover:bg-yellow-600'
      case 'Probation':
        return 'bg-red-500 hover:bg-red-600'
      default:
        return 'bg-gray-500 hover:bg-gray-600'
    }
  }

  const clearFilters = () => {
    setSearch('')
    setDepartment('all')
    setDate('')
  }

  return (
    <Card className="w-full max-w-7xl mx-auto my-4">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          Employee Attendance
        </CardTitle>
        <div className="mt-6 flex justify-between items-center">
          <div className="flex space-x-2">
            <Badge
              variant="outline"
              className="text-green-500 border-green-500"
            >
              <CheckCircle2 className="mr-1 h-3 w-3" /> Present
            </Badge>
            <Badge variant="outline" className="text-red-500 border-red-500">
              <XCircle className="mr-1 h-3 w-3" /> Absent
            </Badge>
            <Badge
              variant="outline"
              className="text-yellow-500 border-yellow-500"
            >
              <AlertTriangle className="mr-1 h-3 w-3" /> Late
            </Badge>
          </div>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center w-full md:w-auto space-x-2">
            <Input
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm h-9"
            />
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center w-full md:w-auto space-x-2">
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-[180px] h-9"
            />
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
        <div className="rounded-md border shadow-sm overflow-hidden">
          <Table className="border-none">
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-800 border-none">
                <TableHead className="w-[100px] font-bold">
                  Employee ID
                </TableHead>
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Department</TableHead>
                <TableHead className="font-bold">Position</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow
                  key={employee.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${getStatusColor(employee.status.status)}`}
                    >
                      {employee.status.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedEmployee(employee)}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Employee Actions: {employee.name}
                            </DialogTitle>
                            <DialogDescription>
                              Choose an action for this employee.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <Button
                              onClick={() => handleAction('warn', employee)}
                              className="bg-yellow-500 hover:bg-yellow-600"
                            >
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Send Warning
                            </Button>
                            <Button
                              onClick={() => handleAction('praise', employee)}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <ThumbsUp className="mr-2 h-4 w-4" />
                              Praise Employee
                            </Button>
                            <div className="space-y-2">
                              <Label htmlFor="note">Add a note</Label>
                              <Textarea
                                id="note"
                                placeholder="Enter any additional notes here..."
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
