import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'

// Import pages
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import Members from './pages/Members'
import Loans from './pages/Loans'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Landing from './pages/Landing'

// Import components
import Sidebar from './components/Sidebar'
import Header from './components/Header'

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('jwt_token')
      if (token) {
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(response.data)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      // If token is invalid, remove it
      localStorage.removeItem('jwt_token')
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchUserProfile()
  }, [])

  const handleLogin = async () => {
    await fetchUserProfile()
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt_token')
    setIsAuthenticated(false)
    setUser(null)
  }

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, show landing page or login
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Landing onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  // If authenticated, show dashboard layout
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header user={user} onLogout={handleLogout} />
        
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/books" element={<Books />} />
              <Route path="/members" element={<Members />} />
              <Route path="/loans" element={<Loans />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default App 