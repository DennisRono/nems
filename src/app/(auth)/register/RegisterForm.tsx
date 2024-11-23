'use client'
import { useState } from 'react'
import { useFormState } from 'react-dom'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface FormState {
  errors?: {
    full_name?: string[]
    email?: string[]
    password?: string[]
    confirm_password?: string[]
  }
  message?: string
}

const initialState: FormState = {}

async function loginAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const full_name = formData.get('full_name')
  const email = formData.get('email')
  const password = formData.get('password')
  const confirm_password = formData.get('confirm_password')

  const errors: FormState['errors'] = {}

  if (
    !full_name ||
    typeof full_name !== 'string' ||
    full_name.trim().length === 0
  ) {
    errors.full_name = ['Full name is required']
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    errors.email = ['Please enter a valid email address']
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.password = ['Password must be at least 6 characters long']
  }

  if (password !== confirm_password) {
    errors.confirm_password = ['Passwords do not match']
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  // Here you would typically make an API call to authenticate the user
  // For this example, we'll just simulate a successful login
  return { message: 'Login successful!' }
}

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          id="full_name"
          name="full_name"
          type="text"
          required
          className={state.errors?.full_name ? 'border-red-500' : ''}
        />
        {state.errors?.full_name && (
          <p className="text-sm text-red-500">{state.errors.full_name[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={state.errors?.email ? 'border-red-500' : ''}
        />
        {state.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            className={
              state.errors?.password ? 'border-red-500 pr-10' : 'pr-10'
            }
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" aria-hidden="true" />
            )}
          </button>
        </div>
        {state.errors?.password && (
          <p className="text-sm text-red-500">{state.errors.password[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirm_password"
            name="confirm_password"
            type={showPassword ? 'text' : 'password'}
            required
            className={
              state.errors?.confirm_password ? 'border-red-500 pr-10' : 'pr-10'
            }
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" aria-hidden="true" />
            )}
          </button>
        </div>
        {state.errors?.confirm_password && (
          <p className="text-sm text-red-500">
            {state.errors.confirm_password[0]}
          </p>
        )}
      </div>

      <div>
        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800 h-12"
        >
          Sign up
        </Button>
      </div>

      {state.message && (
        <p className="text-sm text-center text-green-500">{state.message}</p>
      )}
    </form>
  )
}
