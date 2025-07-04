import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Import pages
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import Members from './pages/Members'
import Loans from './pages/Loans'
import Profile from './pages/Profile'
import Login from './pages/Login'

// Import components
import Sidebar from './components/Sidebar'
import Header from './components/Header'

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('jwt_token')
    if (token) {
      setIsAuthenticated(true)
      // TODO: Fetch user data from /api/auth/me
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('jwt_token')
    setIsAuthenticated(false)
    setUser(null)
  }

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />
  }

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
            </Routes>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default App 