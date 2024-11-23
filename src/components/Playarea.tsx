import React, { useEffect, useRef } from 'react'
import { useAppSelector } from '@/store/hooks'
import Dash from '@/pages/Dashboard'
import Employees from '@/pages/Employees'
import NewJob from '@/pages/NewJob'
import Jobs from '@/pages/Jobs'
import Salaries from '@/pages/Salaries'

const Playarea = () => {
  const playtab = useAppSelector((state) => state.tab).tab
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
      ) : (
        <Dash />
      )}
    </div>
  )
}

export default Playarea
