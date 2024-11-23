import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTab } from '@/store/slices/tabSlice'
import {
  Home,
  Users,
  UserPlus,
  Briefcase,
  CircleDollarSign,
  Calendar,
  ClipboardList,
  BarChart,
  FileText,
  Settings,
  Bell,
  GraduationCap,
  AlertCircle,
  LogOut,
} from 'lucide-react'

const Sidebar = ({ minified = false }) => {
  const playtab = useAppSelector((state) => state.tab).tab
  const dispatch = useAppDispatch()

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <Home size={18} />,
      key: 'dashboard',
    },
    {
      name: 'Employees',
      icon: <Users size={18} />,
      key: 'employees',
    },
    {
      name: 'New Job',
      icon: <UserPlus size={18} />,
      key: 'new-job',
    },
    {
      name: 'Jobs',
      icon: <Briefcase size={18} />,
      key: 'jobs',
    },
    {
      name: 'Salaries',
      icon: <CircleDollarSign size={18} />,
      key: 'salaries',
    },
    {
      name: 'Attendance',
      icon: <Calendar size={18} />,
      key: 'attendance',
    },
    {
      name: 'Leave Management',
      icon: <ClipboardList size={18} />,
      key: 'leave-management',
    },
    {
      name: 'Performance',
      icon: <BarChart size={18} />,
      key: 'performance',
    },
    {
      name: 'Documents',
      icon: <FileText size={18} />,
      key: 'documents',
    },
    {
      name: 'Training',
      icon: <GraduationCap size={18} />,
      key: 'training',
    },
    {
      name: 'Notifications',
      icon: <Bell size={18} />,
      key: 'notifications',
    },
    {
      name: 'Policies',
      icon: <AlertCircle size={18} />,
      key: 'policies',
    },
    {
      name: 'Settings',
      icon: <Settings size={18} />,
      key: 'settings',
    },
    {
      name: 'Logout',
      icon: <LogOut size={18} />,
      key: 'logout',
    },
  ]
  return (
    <nav className="bg-gray-900 text-gray-100 h-full">
      <ul className="p-4 space-y-2">
        {menuItems.map((item) => (
          <li key={item.key}>
            <button
              className={`w-full flex items-center ${
                minified ? 'justify-center' : 'justify-start'
              } gap-3 p-3 rounded-lg transition-colors ${
                playtab === item.key
                  ? 'bg-white text-gray-900'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
              onClick={() => dispatch(setTab({ tab: item.key }))}
              aria-current={playtab === item.key ? 'page' : undefined}
            >
              {React.cloneElement(item.icon, {
                className: `${
                  playtab === item.key
                    ? 'text-gray-900'
                    : 'text-gray-400 group-hover:text-white'
                }`,
              })}
              {!minified && (
                <span
                  className={`text-sm font-medium ${minified ? 'sr-only' : ''}`}
                >
                  {item.name}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar
