'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Fox from '@/assets/images/fox.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSidebar } from '@/store/slices/sidebarSlice'

const Header = () => {
  const dispatch = useAppDispatch()
  const sidebar = useAppSelector((state) => state.sidebar).size
  return (
    <div className="h-[56px] w-full">
      <div className="px-[2%] h-full flex items-center justify-between">
        <div className="h-full flex items-center gap-4">
          {sidebar === 'full' ? (
            <FontAwesomeIcon
              icon={faBars}
              className="text-2xl cursor-pointer"
              onClick={() =>
                dispatch(
                  setSidebar({
                    size: 'min',
                  })
                )
              }
            />
          ) : (
            <FontAwesomeIcon
              icon={faXmark}
              className="text-2xl cursor-pointer"
              onClick={() =>
                dispatch(
                  setSidebar({
                    size: 'full',
                  })
                )
              }
            />
          )}
          <Link
            href="/"
            className="text-4xl font-bold cursor-pointer select-none"
          >
            Null-EMS
          </Link>
        </div>
        <div className="flex items-center gap-4 h-full">
          <Link
            href="/login"
            className="border border-slate-900 rounded-sm py-1 px-3 select-none"
          >
            Sign in / Sign up
          </Link>
          <div className="overflow-hidden rounded-full h-10 w-10 cursor-pointer">
            <Image src={Fox} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
