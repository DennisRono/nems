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
