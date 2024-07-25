import Image from 'next/image'
import React from 'react'
import Employees from '@/assets/images/employees.jpg'
import RegisterForm from './LoginForm'

const page = () => {
  return (
    <div className="h-screen">
      <div className="h-full">
        <div className="flex items-center justify-center h-full">
          <div className="flex-1 px-4">
            <h1 className="text-4xl mb-4">Login</h1>
            <RegisterForm />
          </div>
          <div className="flex-1">
            <Image src={Employees} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
