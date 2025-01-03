import Footer from '@/components/user/Footer'
import Header from '@/components/user/Header'
import Landing from '@/components/user/Landing'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Landing />
      </main>
      <Footer />
    </div>
  )
}

export default page
