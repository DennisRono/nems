'use client'
import { useState } from 'react'
import JobSearch from '@/components/user/JobSearch'

const Landing = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)

  return (
    <div className="bg-gradient-to-r from-indigo-300 to-purple-300 text-black">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
          Find Your Dream Job
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center">
          Discover opportunities that match your skills and aspirations
        </p>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="flex-grow pl-6 pr-4 py-2 border rounded-l-full focus:outline-none outline-none text-black"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-r-full">
                Search
              </button>
            </div>
            <div className="flex justify-between items-center px-3">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              >
                {showAdvancedSearch ? 'Hide' : 'Show'} Advanced Search
              </button>
              <p className="text-gray-600">100,000+ jobs available</p>
            </div>
          </div>
        </div>
      </div>
      {showAdvancedSearch && (
        <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <JobSearch />
          </div>
        </div>
      )}
    </div>
  )
}

export default Landing
