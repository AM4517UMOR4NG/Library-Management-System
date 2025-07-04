import React from 'react'
import { motion } from 'framer-motion'
import { Bell, LogOut, User } from 'lucide-react'

const Header = ({ user, onLogout }) => {
  return (
    <motion.header 
      className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-white/60 text-sm">Welcome back!</p>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <motion.button
            className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{user?.username || 'User'}</p>
                <p className="text-white/60 text-xs">{user?.role || 'Member'}</p>
              </div>
            </div>

            {/* Logout Button */}
            <motion.button
              onClick={onLogout}
              className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-red-400" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header 