import React, { useEffect, useRef } from 'react'
import { useAppSelector } from '@/store/hooks'
import Dash from '@/pages/Dashboard'
import Employees from '@/pages/Employees'
import NewJob from '@/pages/NewJob'
import Jobs from '@/pages/Jobs'
import Salaries from '@/pages/Salaries'
import Attendance from '@/pages/Attendance'
import CreateJobApplicationForm from '@/pages/CreateJobApplicationForm'

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
