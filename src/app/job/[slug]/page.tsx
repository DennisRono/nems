import Footer from '@/components/user/Footer'
import Header from '@/components/user/Header'
import JobPage from '@/views/JobPage'
import React from 'react'

const page = async (props: any) => {
  const params = await props.params
  const { slug } = params
  return (
    <>
      <Header />
      <JobPage job_form_id={slug as string} />
      <Footer />
    </>
  )
}

export default page
