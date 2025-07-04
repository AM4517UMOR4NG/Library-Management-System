import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, Calendar, BookOpen, User } from 'lucide-react'
import axios from 'axios'

const Loans = () => {
  const [loans, setLoans] = useState([])
  const [books, setBooks] = useState([])
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingLoan, setEditingLoan] = useState(null)
  const [form, setForm] = useState({
    bookId: '',
    memberId: '',
    loanDate: '',
    dueDate: '',
    returnDate: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('jwt_token')
      const [loansRes, booksRes, membersRes] = await Promise.all([
        axios.get('/api/loans', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/books', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/members', { headers: { Authorization: `Bearer ${token}` } })
      ])
      setLoans(loansRes.data)
      setBooks(booksRes.data)
      setMembers(membersRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('jwt_token')
      if (editingLoan) {
        await axios.put(`/api/loans/${editingLoan.id}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post('/api/loans', form, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      fetchData()
      setShowForm(false)
      setEditingLoan(null)
      setForm({ bookId: '', memberId: '', loanDate: '', dueDate: '', returnDate: '' })
    } catch (error) {
      console.error('Error saving loan:', error)
    }
  }

  const handleEdit = (loan) => {
    setEditingLoan(loan)
    setForm({
      bookId: loan.book?.id || '',
      memberId: loan.member?.id || '',
      loanDate: loan.loanDate || '',
      dueDate: loan.dueDate || '',
      returnDate: loan.returnDate || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this loan record?')) {
      try {
        const token = localStorage.getItem('jwt_token')
        await axios.delete(`/api/loans/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        fetchData()
      } catch (error) {
        console.error('Error deleting loan:', error)
      }
    }
  }

  const getBookTitle = (bookId) => {
    const book = books.find(b => b.id === bookId)
    return book ? book.title : 'Unknown Book'
  }

  const getMemberName = (memberId) => {
    const member = members.find(m => m.id === memberId)
    return member ? member.name : 'Unknown Member'
  }

  const isOverdue = (dueDate, returnDate) => {
    if (returnDate) return false
    return new Date(dueDate) < new Date()
  }

  const filteredLoans = loans.filter(loan => {
    const bookTitle = getBookTitle(loan.bookId)
    const memberName = getMemberName(loan.memberId)
    return (
      bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memberName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Loans Management</h1>
          <p className="text-white/60">Manage book loans and returns</p>
        </div>
        <motion.button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          New Loan
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <input
            type="text"
            placeholder="Search loans by book title or member name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field w-full pl-10"
          />
        </div>
      </div>

      {/* Loans Table */}
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-white/60">Loading loans...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-white font-semibold">Book</th>
                  <th className="px-6 py-3 text-left text-white font-semibold">Member</th>
                  <th className="px-6 py-3 text-left text-white font-semibold">Loan Date</th>
                  <th className="px-6 py-3 text-left text-white font-semibold">Due Date</th>
                  <th className="px-6 py-3 text-left text-white font-semibold">Return Date</th>
                  <th className="px-6 py-3 text-left text-white font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.map((loan, index) => (
                  <motion.tr
                    key={loan.id}
                    className="border-b border-white/10 hover:bg-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 text-white">{getBookTitle(loan.bookId)}</td>
                    <td className="px-6 py-4 text-white/80">{getMemberName(loan.memberId)}</td>
                    <td className="px-6 py-4 text-white/80">{loan.loanDate}</td>
                    <td className="px-6 py-4 text-white/80">{loan.dueDate}</td>
                    <td className="px-6 py-4 text-white/80">{loan.returnDate || '-'}</td>
                    <td className="px-6 py-4">
                      {loan.returnDate ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                          Returned
                        </span>
                      ) : isOverdue(loan.dueDate, loan.returnDate) ? (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                          Overdue
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleEdit(loan)}
                          className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit className="w-4 h-4 text-blue-400" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(loan.id)}
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
              {editingLoan ? 'Edit Loan' : 'New Loan'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/80 mb-2">Book</label>
                <select
                  value={form.bookId}
                  onChange={(e) => setForm({...form, bookId: e.target.value})}
                  className="input-field w-full"
                  required
                >
                  <option value="">Select a book</option>
                  {books.map(book => (
                    <option key={book.id} value={book.id}>{book.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/80 mb-2">Member</label>
                <select
                  value={form.memberId}
                  onChange={(e) => setForm({...form, memberId: e.target.value})}
                  className="input-field w-full"
                  required
                >
                  <option value="">Select a member</option>
                  {members.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/80 mb-2">Loan Date</label>
                <input
                  type="date"
                  value={form.loanDate}
                  onChange={(e) => setForm({...form, loanDate: e.target.value})}
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">Due Date</label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm({...form, dueDate: e.target.value})}
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">Return Date (Optional)</label>
                <input
                  type="date"
                  value={form.returnDate}
                  onChange={(e) => setForm({...form, returnDate: e.target.value})}
                  className="input-field w-full"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  {editingLoan ? 'Update' : 'Create'} Loan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingLoan(null)
                    setForm({ bookId: '', memberId: '', loanDate: '', dueDate: '', returnDate: '' })
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

export default Loans 