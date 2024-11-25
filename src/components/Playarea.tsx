import React, { useEffect, useRef } from 'react'
import { useAppSelector } from '@/store/hooks'
import Dash from '@/views/Dashboard'
import Employees from '@/views/Employees'
import NewJob from '@/views/NewJob'
import Jobs from '@/views/Jobs'
import Salaries from '@/views/Salaries'
import Attendance from '@/views/Attendance'
import CreateJobApplicationForm from '@/views/CreateJobApplicationForm'

const Playarea = () => {
  const playtab = useAppSelector((state) => state.tab).tab
  const job = useAppSelector((state) => state.cache).cache
  const containerRef: any = useRef(null)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [playtab])

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-64px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-transparent"
    >
      {playtab === 'dashboard' ? (
        <Dash />
      ) : playtab === 'new-product' ? (
        <Employees />
      ) : playtab === 'new-job' ? (
        <NewJob />
      ) : playtab === 'jobs' ? (
        <Jobs />
      ) : playtab === 'salaries' ? (
        <Salaries />
      ) : playtab === 'attendance' ? (
        <Attendance />
      ) : playtab === 'new-job-form' ? (
        <CreateJobApplicationForm job={job} />
      ) : (
        <Dash />
      )}
    </div>
  )
}

export default Playarea
