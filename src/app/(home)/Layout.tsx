'use client'
import React from 'react'
import Footer from '@/components/Footer'
import Playarea from '@/components/Playarea'
import Sidebar from '@/components/Sidebar'
import { useAppSelector } from '@/store/hooks'

const Layout = () => {
  const sidebar = useAppSelector((state) => state.sidebar).size
  return (
    <div
      className={`${
        sidebar === 'min' ? 'flex px-[2%]' : 'grid grid-cols-[1fr,5fr]'
      } min-h-[calc(100vh-56px)] `}
    >
      <div
        className={`h-full max-w-[250px] ${
          sidebar === 'min' ? '!w-[60px]' : 'w-full'
        }`}
      >
        <Sidebar />
      </div>
      <div className="h-full w-full">
        <Playarea />
        <Footer />
      </div>
    </div>
  )
}

export default Layout
