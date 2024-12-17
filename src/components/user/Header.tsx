'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Logo from '@/assets/images/Circle_Logo.svg'
import { Button } from '@/components/ui/button'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: '/jobs', label: 'Jobs' },
    { href: '/companies', label: 'Companies' },
    { href: '/about', label: 'About' },
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const NavItems = () => (
    <>
      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </>
  )

  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center justify-start gap-2">
            <Image
              src={Logo}
              alt="logo"
              height={10}
              width={10}
              className="h-8 w-8"
            />
            <div className="flex flex-col items-start justify-start text-base border-l-2 border-black pl-2">
              <span className="text-base leading-4">nullchemy</span>
              <span className="text-base leading-4">careers</span>
            </div>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <NavItems />
            </ul>
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline">Log In</Button>
          <Button>Create Account</Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </div>
      <div
        id="mobile-menu"
        className={`fixed inset-y-0 left-0 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } w-[300px] bg-white shadow-lg transition duration-300 ease-in-out z-40 md:hidden h-screen`}
      >
        <nav className="flex flex-col h-full">
          <div className="px-6 py-3 flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">Navigation</h2>
            <X className="h-6 w-6 cursor-pointer" onClick={toggleMenu} />
          </div>
          <div className="h-[50vh] overflow-y-auto py-6 px-6">
            <ul className="space-y-4">
              <NavItems />
            </ul>
          </div>
          <div className="mt-auto p-6 border-t space-y-4">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </Button>
            <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
              Create Account
            </Button>
          </div>
        </nav>
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </header>
  )
}

export default Header
