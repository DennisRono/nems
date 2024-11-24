import JobApplicationPage from '@/pages/JobApplicationForm'
import React from 'react'

const page = ({ params: { slug } }: any) => {
  return <JobApplicationPage jobid={slug as string} />
}

export default page
