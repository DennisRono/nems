'use client'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'

const LoginForm = () => {
  const [formData, setFormData] = useState<FormType>({
    email: '',
    password: '',
  })

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    try {
    } catch (error: any) {}
  }
  return (
    <form className="" onSubmit={handleLogin}>
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
      <button
        type="submit"
        className="px-4 py-2 rounded-sm bg-blue-600 text-white w-full cursor-pointer h-10"
      >
        Login
      </button>
      <p className="my-2">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-blue-600 underline">
          register here
        </Link>
      </p>
    </form>
  )
}

export default LoginForm
