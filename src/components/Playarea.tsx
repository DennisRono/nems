'use client'
import Dashboard from '@/pages/Dashboard'
import Employees from '@/pages/Employees'
import { useAppSelector } from '@/store/hooks'
import React from 'react'

const Playarea = () => {
  const playtab = useAppSelector((state) => state.tab).tab
  return (
    <div className="bg-green-700">
      {' '}
      <div className="p-2">
        {playtab === 'dashboard' ? (
          <Dashboard />
        ) : playtab === 'employees' ? (
          <Employees />
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  )
}

export default Playarea
