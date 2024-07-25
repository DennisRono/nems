'use client'
import api from '@/api'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'

const RegisterForm = () => {
  const [formData, setFormData] = useState<FormType>({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
  })
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res: any = await api('POST', '', formData)
      if (!res.ok) {
        throw new Error('')
      }
    } catch (error: any) {}
  }
  return (
    <form className="" onSubmit={handleRegister}>
      <div className="mb-4">
        <label htmlFor="Full Name" className="">
          Full Name <span className="text-red-600">*</span>
        </label>
        <br />
        <input
          type="text"
          className="rounded-sm border border-slate-800 p-2 w-full outline-none"
          placeholder="Full Name"
          name="full_name"
          value={formData.full_name}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="Email" className="">
          Email <span className="text-red-600">*</span>
        </label>
        <br />
        <input
          type="text"
          className="rounded-sm border border-slate-800 p-2 w-full outline-none"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="Password" className="">
          Password <span className="text-red-600">*</span>
        </label>
        <br />
        <input
          type="text"
          className="rounded-sm border border-slate-800 p-2 w-full outline-none"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="Confirm Password" className="">
          Confirm Password <span className="text-red-600">*</span>
        </label>
        <br />
        <input
          type="text"
          className="rounded-sm border border-slate-800 p-2 w-full outline-none"
          placeholder="Confirm Password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 rounded-sm bg-blue-600 text-white w-full cursor-pointer h-10"
      >
        Register
      </button>
      <p className="my-2">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 underline">
          login here
        </Link>
      </p>
    </form>
  )
}

export default RegisterForm
