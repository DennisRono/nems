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
        <div className="grid grid-cols-[1fr,5fr] min-h-[calc(100vh-56px)]">
          <div className="w-full h-full bg-orange-200">
            <Sidebar />
          </div>
          <div className="h-full">
            <Playarea />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
