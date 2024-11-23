'use client'
import Header from '@/components/Header'
import Playarea from '@/components/Playarea'
import Sidebar from '@/components/Sidebar'
import React, { useState } from 'react'

const Layout = () => {
  const [minified, setMinified] = useState<boolean>(false)
  return (
    <div className="mx-auto">
      <div className="h-screen flex flex-col">
        <div className="flex flex-1 h-screen overflow-hidden">
          <div
            className={`${
              minified ? 'w-[7%]' : 'w-[20%]'
            } border-r border-slate-500 transition-all bg-gradient-to-b from-indigo-500 to-indigo-500`}
          >
            <Sidebar minified={minified} />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="h-16 border-b border-slate-500">
              <Header minified={minified} setMinified={setMinified} />
            </div>
            <div className="flex-1">
              <Playarea />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
