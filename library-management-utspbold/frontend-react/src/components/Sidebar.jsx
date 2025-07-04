import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  FileText, 
  User,
  Library
} from 'lucide-react'

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/books', icon: BookOpen, label: 'Books' },
    { path: '/members', icon: Users, label: 'Members' },
    { path: '/loans', icon: FileText, label: 'Loans' },
    { path: '/profile', icon: User, label: 'Profile' }
  ]

  return (
    <motion.div 
      className="w-64 bg-white/10 backdrop-blur-md border-r border-white/20 min-h-screen"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center gap-3">
          <Library className="w-8 h-8 text-blue-400" />
          <h1 className="text-xl font-bold text-white">Library System</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.path}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? 'active' : ''}`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="glass-card p-4 text-center">
          <p className="text-white/60 text-sm">Library Management System</p>
          <p className="text-white/40 text-xs">v1.0.0</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Sidebar 