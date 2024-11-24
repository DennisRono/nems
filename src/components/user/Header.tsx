'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl uppercase font-bold text-black">
          nullchemy careers
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/jobs" className="hover:text-blue-600">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-blue-600">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-blue-600">
                  Resources
                </Link>
              </li>
            </ul>
          </nav>
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <nav className="container mx-auto px-4">
            <ul className="space-y-4">
              <li>
                <Link href="/jobs" className="block hover:text-blue-600">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/companies" className="block hover:text-blue-600">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/resources" className="block hover:text-blue-600">
                  Resources
                </Link>
              </li>
              <li>
                <div className="relative mt-4">
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </li>
              <li>
                <Link
                  href="/post-job"
                  className="block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 text-center mt-4"
                >
                  Post a Job
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
