import Footer from '@/components/user/Footer'
import Header from '@/components/user/Header'
import JobApplicationPage from '@/pages/JobApplicationForm'
import React from 'react'

const page = async (props: any) => {
  const params = await props.params
  const { slug } = params
  return (
    <>
      <Header />
      <JobApplicationPage jobid={slug as string} />
      <Footer />
    </>
  )
}

export default page
