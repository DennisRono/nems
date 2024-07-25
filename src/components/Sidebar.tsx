'use client'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faMoneyBill,
  faUserPlus,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTab } from '@/store/slices/tabSlice'

const Sidebar = () => {
  const playtab = useAppSelector((state) => state.tab)
  const sidebar = useAppSelector((state) => state.sidebar).size
  const dispatch = useAppDispatch()
  return (
    <div className={`h-full ${sidebar === 'min' ? '!w-[60px]' : 'w-full'}`}>
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
              {sidebar === 'full' ? (
                <div className="">
                  <span className="text-white select-none">Dashboard</span>
                </div>
              ) : null}
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
              {sidebar === 'full' ? (
                <div className="">
                  <span className="text-white select-none">Employees</span>
                </div>
              ) : null}
            </div>
          </li>
          <li
            className="bg-black mx-auto w-[90%] py-2 px-4 rounded-sm cursor-pointer hover:bg-[#242424]"
            onClick={() => {
              dispatch(
                setTab({
                  tab: 'newjob',
                })
              )
            }}
          >
            <div className="flexxer_center_start gap-2 w-full">
              <div className="">
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className="text-2xl text-white h-5 w-5"
                />
              </div>
              {sidebar === 'full' ? (
                <div className="">
                  <span className="text-white select-none">New Job</span>
                </div>
              ) : null}
            </div>
          </li>
          <li
            className="bg-black mx-auto w-[90%] py-2 px-4 rounded-sm cursor-pointer hover:bg-[#242424]"
            onClick={() => {
              dispatch(
                setTab({
                  tab: 'jobs',
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
              {sidebar === 'full' ? (
                <div className="">
                  <span className="text-white select-none">Jobs</span>
                </div>
              ) : null}
            </div>
          </li>
          <li
            className="bg-black mx-auto w-[90%] py-2 px-4 rounded-sm cursor-pointer hover:bg-[#242424]"
            onClick={() => {
              dispatch(
                setTab({
                  tab: 'salaries',
                })
              )
            }}
          >
            <div className="flexxer_center_start gap-2 w-full">
              <div className="">
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  className="text-2xl text-white h-5 w-5"
                />
              </div>
              {sidebar === 'full' ? (
                <div className="">
                  <span className="text-white select-none">Salaries</span>
                </div>
              ) : null}
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
