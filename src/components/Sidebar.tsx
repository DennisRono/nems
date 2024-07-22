import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
  return (
    <div className="h-full w-full bg-cyan-600">
      <div className="w-full py-4 h-full">
        <ul className="flex flex-col justify-start gap-4 h-full">
          <li className="bg-black mx-auto w-[90%] py-2 px-4 rounded-sm cursor-pointer hover:bg-[#242424]">
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
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
