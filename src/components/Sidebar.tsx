'use client'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTab } from '@/store/slices/tabSlice'

const Sidebar = () => {
  const playtab = useAppSelector((state) => state.tab)
  const dispatch = useAppDispatch()
  return (
    <div className="h-full w-full bg-cyan-600">
      <div className="w-full py-4 h-full">
        <ul className="flex flex-col justify-start gap-4 h-full">
          <li
            className="bg-black mx-auto w-[90%] py-2 px-4 rounded-sm cursor-pointer hover:bg-[#242424]"
            onClick={() => {
              dispatch(
                setTab({
                  tab: 'dashboard',
                })
              )
            }}
          >
            <div className="flexxer_center_start gap-2 w-full">
              <div className="">
                <FontAwesomeIcon
                  icon={faHome}
                  className="text-2xl text-white h-5 w-5"
                />
              </div>
              <div className="">
                <span className="text-white select-none">Dashboard</span>
              </div>
            </div>
          </li>
          <li
            className="bg-black mx-auto w-[90%] py-2 px-4 rounded-sm cursor-pointer hover:bg-[#242424]"
            onClick={() => {
              dispatch(
                setTab({
                  tab: 'employees',
                })
              )
            }}
          >
            <div className="flexxer_center_start gap-2 w-full">
              <div className="">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="text-2xl text-white h-5 w-5"
                />
              </div>
              <div className="">
                <span className="text-white select-none">Employees</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
