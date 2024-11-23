import Image from 'next/image'
import Link from 'next/link'
import RegisterForm from './RegisterForm'
import LoginImage from '@/assets/images/employees.jpg'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={LoginImage}
          alt="Employees working together"
          width={1920}
          height={1080}
        />
      </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              Register to N-EMS
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-black hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}
