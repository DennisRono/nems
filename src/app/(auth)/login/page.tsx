import Image from 'next/image'
import Link from 'next/link'
import LoginForm from './LoginForm'
import LoginImage from '@/assets/images/employees.jpg'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              Login to your account
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-black hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={LoginImage}
          alt="Employees working together"
          width={1920}
          height={1080}
        />
      </div>
    </div>
  )
}
