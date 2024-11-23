interface User {
  name?: string
  user_id?: string
  state?: string
  [key: string]: any
}

interface FormType {
  full_name?: string
  email: string
  password: string
  confirm_password?: string
}

interface JobData {
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
}

interface Employee {
  id: string
  name: string
  department: string
  position: string
}

interface AttendanceRecord {
  id: string
  employeeId: string
  date: string
  checkIn: string
  checkOut: string
  status: 'Present' | 'Absent' | 'Late' | 'Early Leave'
}

interface EmployeeStatus {
  id: string
  employeeId: string
  status: 'Good Standing' | 'Warning' | 'Probation'
  lastUpdated: string
}

interface EmployeeAttendance extends Employee {
  attendance: AttendanceRecord[]
  status: EmployeeStatus
}
