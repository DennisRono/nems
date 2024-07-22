import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Playarea from '@/components/Playarea'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className="h-full w-full">
      <div className="h-full w-full">
        <div className="w-full">
          <Header />
        </div>
        <div className="flex items-start justify-start min-h-[calc(100vh-56px)]">
          <div className="w-[20%]">
            <Sidebar />
          </div>
          <div className="flex-1">
            <Playarea />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
