import React from 'react'
import Header from '@/components/Header'
import Layout from './Layout'

const page = () => {
  return (
    <div className="h-full w-full">
      <div className="h-full w-full">
        <div className="w-full">
          <Header />
        </div>
        <Layout />
      </div>
    </div>
  )
}

export default page
