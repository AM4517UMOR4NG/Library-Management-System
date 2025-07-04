import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Shield, Settings, Key, LogOut } from 'lucide-react'
import axios from 'axios'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('jwt_token')
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!')
      return
    }

    try {
      const token = localStorage.getItem('jwt_token')
      await axios.post('/api/auth/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      alert('Password changed successfully!')
      setShowPasswordForm(false)
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      console.error('Error changing password:', error)
      alert('Failed to change password. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
        <p className="text-white/60">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">{user?.username}</h2>
            <p className="text-white/60">{user?.role}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <Mail className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white font-medium">Email</p>
                <p className="text-white/60 text-sm">{user?.email || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <Shield className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-white font-medium">Role</p>
                <p className="text-white/60 text-sm">{user?.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <Settings className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">Account Status</p>
                <p className="text-white/60 text-sm">Active</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Password Change */}
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">Change Password</h3>
                <p className="text-white/60 text-sm">Update your account password</p>
              </div>
              <motion.button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="btn-secondary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Key className="w-4 h-4" />
                {showPasswordForm ? 'Cancel' : 'Change Password'}
              </motion.button>
            </div>

            {showPasswordForm && (
              <motion.form 
                onSubmit={handlePasswordChange}
                className="space-y-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div>
                  <label className="block text-white/80 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    className="input-field w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    className="input-field w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    className="input-field w-full"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Update Password
                </button>
              </motion.form>
            )}
          </motion.div>

          {/* Account Statistics */}
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Account Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-blue-500/20">
                <div className="text-2xl font-bold text-blue-400 mb-1">0</div>
                <div className="text-white/60 text-sm">Books Borrowed</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-500/20">
                <div className="text-2xl font-bold text-green-400 mb-1">0</div>
                <div className="text-white/60 text-sm">Books Returned</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-purple-500/20">
                <div className="text-2xl font-bold text-purple-400 mb-1">0</div>
                <div className="text-white/60 text-sm">Overdue Books</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-orange-500/20">
                <div className="text-2xl font-bold text-orange-400 mb-1">0</div>
                <div className="text-white/60 text-sm">Total Loans</div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">Account created</p>
                  <p className="text-white/40 text-xs">Just now</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">First login</p>
                  <p className="text-white/40 text-xs">Just now</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Profile 