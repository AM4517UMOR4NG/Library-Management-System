import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, User } from 'lucide-react'
import axios from 'axios'

const Members = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem('jwt_token')
      const response = await axios.get('/api/members', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMembers(response.data)
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('jwt_token')
      if (editingMember) {
        await axios.put(`/api/members/${editingMember.id}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post('/api/members', form, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      fetchMembers()
      setShowForm(false)
      setEditingMember(null)
      setForm({ name: '', email: '', phone: '', address: '' })
    } catch (error) {
      console.error('Error saving member:', error)
    }
  }

  const handleEdit = (member) => {
    setEditingMember(member)
    setForm({
      name: member.name,
      email: member.email,
      phone: member.phone,
      address: member.address
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        const token = localStorage.getItem('jwt_token')
        await axios.delete(`/api/members/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        fetchMembers()
      } catch (error) {
        console.error('Error deleting member:', error)
      }
    }
  }

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Members Management</h1>
          <p className="text-white/60">Manage library members</p>
        </div>
        <motion.button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          Add Member
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <input
            type="text"
            placeholder="Search members by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field w-full pl-10"
          />
        </div>
      </div>

      {/* Members Table */}
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-white/60">Loading members...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-white font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-white font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-white font-semibold">Phone</th>
                  <th className="px-6 py-3 text-left text-white font-semibold">Address</th>
                  <th className="px-6 py-3 text-left text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member, index) => (
                  <motion.tr
                    key={member.id}
                    className="border-b border-white/10 hover:bg-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 text-white">{member.name}</td>
                    <td className="px-6 py-4 text-white/80">{member.email}</td>
                    <td className="px-6 py-4 text-white/80">{member.phone}</td>
                    <td className="px-6 py-4 text-white/80">{member.address}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleEdit(member)}
                          className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit className="w-4 h-4 text-blue-400" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(member.id)}
                          className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            className="glass-card p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              {editingMember ? 'Edit Member' : 'Add New Member'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/80 mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({...form, phone: e.target.value})}
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">Address</label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({...form, address: e.target.value})}
                  className="input-field w-full resize-none"
                  rows="3"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  {editingMember ? 'Update' : 'Add'} Member
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingMember(null)
                    setForm({ name: '', email: '', phone: '', address: '' })
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Members 