import React from 'react'

const Footer = () => {
  return (
    <div className="p-2 flex items-center justify-center">
      <p className="">
        copyright &copy; {new Date().getFullYear()} -{' '}
        <a
          href="http://denniskibet.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dennis Kibet
        </a>
      </p>
    </div>
  )
}

export default Footer
