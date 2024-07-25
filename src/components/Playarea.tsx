'use client'
import Dashboard from '@/pages/Dashboard'
import Employees from '@/pages/Employees'
import Jobs from '@/pages/Jobs'
import NewJob from '@/pages/NewJob'
import Salaries from '@/pages/Salaries'
import { useAppSelector } from '@/store/hooks'
import React from 'react'

const Playarea = () => {
  const playtab = useAppSelector((state) => state.tab).tab
  return (
    <div className="">
      {' '}
      <div className="p-2">
        {playtab === 'dashboard' ? (
          <Dashboard />
        ) : playtab === 'employees' ? (
          <Employees />
        ) : playtab === 'newjob' ? (
          <NewJob />
        ) : playtab === 'jobs' ? (
          <Jobs />
        ) : playtab === 'salaries' ? (
          <Salaries />
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  )
}

export default Playarea
