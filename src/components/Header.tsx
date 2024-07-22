import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Fox from '@/assets/images/fox.jpg'

const Header = () => {
  return (
    <div className="h-[56px] w-full bg-yellow-600">
      <div className="px-[2%] h-full flex items-center justify-between">
        <div className="">
          <Link href="/" className="text-4xl font-bold cursor-pointer">
            Null-EMS
          </Link>
        </div>
        <div className="">
          <div className="overflow-hidden rounded-full h-10 w-10 cursor-pointer">
            <Image src={Fox} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
