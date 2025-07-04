import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Users, FileText, TrendingUp, Clock, CheckCircle } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    { 
      title: 'Total Books', 
      value: '1,234', 
      icon: BookOpen, 
      color: 'blue',
      change: '+12%',
      changeType: 'positive'
    },
    { 
      title: 'Active Members', 
      value: '567', 
      icon: Users, 
      color: 'green',
      change: '+8%',
      changeType: 'positive'
    },
    { 
      title: 'Active Loans', 
      value: '89', 
      icon: FileText, 
      color: 'purple',
      change: '-3%',
      changeType: 'negative'
    },
    { 
      title: 'Overdue Books', 
      value: '12', 
      icon: Clock, 
      color: 'red',
      change: '-15%',
      changeType: 'positive'
    }
  ]

  const recentActivities = [
    { action: 'Book returned', item: 'The Great Gatsby', time: '2 minutes ago', type: 'return' },
    { action: 'New member registered', item: 'John Doe', time: '15 minutes ago', type: 'member' },
    { action: 'Book borrowed', item: '1984', time: '1 hour ago', type: 'borrow' },
    { action: 'Book added', item: 'To Kill a Mockingbird', time: '2 hours ago', type: 'add' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-white/60">Monitor your library's performance and activities</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="glass-card p-6 dashboard-card"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-500/20`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <div className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-white/60 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              className="p-4 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors text-left"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BookOpen className="w-6 h-6 text-blue-400 mb-2" />
              <p className="text-white font-medium">Add Book</p>
              <p className="text-white/60 text-sm">Register new book</p>
            </motion.button>
            
            <motion.button
              className="p-4 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-colors text-left"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Users className="w-6 h-6 text-green-400 mb-2" />
              <p className="text-white font-medium">Add Member</p>
              <p className="text-white/60 text-sm">Register new member</p>
            </motion.button>
            
            <motion.button
              className="p-4 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors text-left"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FileText className="w-6 h-6 text-purple-400 mb-2" />
              <p className="text-white font-medium">New Loan</p>
              <p className="text-white/60 text-sm">Create loan record</p>
            </motion.button>
            
            <motion.button
              className="p-4 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 transition-colors text-left"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CheckCircle className="w-6 h-6 text-orange-400 mb-2" />
              <p className="text-white font-medium">Return Book</p>
              <p className="text-white/60 text-sm">Process return</p>
            </motion.button>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className={`w-2 h-2 rounded-full bg-${
                  activity.type === 'return' ? 'green' : 
                  activity.type === 'member' ? 'blue' : 
                  activity.type === 'borrow' ? 'purple' : 'orange'
                }-400`}></div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-white/60 text-sm">{activity.item}</p>
                </div>
                <span className="text-white/40 text-xs">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard 