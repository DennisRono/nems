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
