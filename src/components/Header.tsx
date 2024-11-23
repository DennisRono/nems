'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Bell, ChevronsRight, CircleUser, LogOut } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setIdentity } from '@/store/slices/identitySlice'
import { toast } from 'react-toastify'
import Link from 'next/link'
import api from '@/api'

interface HeaderProps {
  minified: boolean
  setMinified: (value: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ minified, setMinified }) => {
  const [profiledrop, setProfileDrop] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const profileDropRef = useRef<HTMLDivElement | null>(null)

  const identity = useAppSelector((state) => state.identity)
  const dispatch = useAppDispatch()

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      profileDropRef.current &&
      !profileDropRef.current.contains(event.target as Node)
    ) {
      setProfileDrop(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = async (): Promise<void> => {
    try {
      setLoading(true)
      const res = await api(`/auth/logout`)
      setLoading(false)

      if (res.status === 200 || res.status === 401) {
        dispatch(
          setIdentity({
            islogged: false,
            user: {
              username: '',
              email: '',
              phone_number: '',
              user_role: '',
            },
          })
        )
        toast('Logout successful', { type: 'success' })
      } else {
        toast('Logout unsuccessful', { type: 'error' })
      }
    } catch (error) {
      setLoading(false)
      console.error('Logout error:', error)
      toast('Network error. Please try again.', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full">
      <div className="h-full flex items-center justify-between">
        <div className="pl-4 flex items-center justify-start gap-2">
          <ChevronsRight
            style={{ color: '#000', fontSize: 24 }}
            className={`cursor-pointer ${
              minified ? '' : 'rotate-180'
            } transition-all`}
            onClick={() => setMinified(!minified)}
          />
          <Link
            href="/"
            className="text-black text-2xl font-extrabold uppercase text-nowrap ml-2"
            style={{ fontFamily: 'Itim, cursive' }}
          >
            N-EMS
          </Link>
        </div>
        <div className="pr-4 flex items-center justify-end gap-4">
          <Bell
            style={{ color: '#000', fontSize: 24 }}
            className={`cursor-pointer`}
            onClick={() => {}}
          />
          {identity.islogged ? (
            <div
              ref={profileDropRef}
              className="flex items-center justify-center gap-2 relative"
            >
              <div
                className="flex flex-nowrap items-center justify-center gap-2 bg-black p-1 pl-3 cursor-pointer rounded-full"
                onClick={() => setProfileDrop(!profiledrop)}
              >
                <span className="text-white text-xs">
                  {identity.user?.username}
                </span>
                <CircleUser
                  style={{ color: '#fff', fontSize: 18 }}
                  className="cursor-pointer"
                />
              </div>
              {profiledrop && (
                <div
                  className="absolute top-8 right-0 bg-white h-auto w-[100px] rounded shadow z-50 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ul>
                    <li
                      className="p-2 cursor-pointer hover:bg-[#0005] flex items-center justify-start gap-2"
                      onClick={handleLogout}
                    >
                      {loading ? (
                        <span
                          className="mr-2 inline-block w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin"
                          role="status"
                        ></span>
                      ) : (
                        <LogOut style={{ color: '#000', fontSize: 18 }} />
                      )}
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="border border-slate-600 py-2 px-4 rounded-md cursor-pointer text-black text-xs"
            >
              Sign in / Sign up
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
