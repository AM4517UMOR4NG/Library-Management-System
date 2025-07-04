import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import axios from 'axios'

const Books = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    publicationYear: '',
    quantity: ''
  })

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('jwt_token')
      const response = await axios.get('/api/books', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setBooks(response.data)
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('jwt_token')
      if (editingBook) {
        await axios.put(`/api/books/${editingBook.id}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post('/api/books', form, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      fetchBooks()
      setShowForm(false)
      setEditingBook(null)
      setForm({ title: '', author: '', isbn: '', publicationYear: '', quantity: '' })
    } catch (error) {
      console.error('Error saving book:', error)
    }
  }

  const handleEdit = (book) => {
    setEditingBook(book)
    setForm({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publicationYear: book.publicationYear,
      quantity: book.quantity
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const token = localStorage.getItem('jwt_token')
        await axios.delete(`/api/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        fetchBooks()
      } catch (error) {
        console.error('Error deleting book:', error)
      }
    }
  }

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Books Management</h1>
          <p className="text-white/60">Manage your library collection</p>
        </div>
        <motion.button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          Add Book
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <input
            type="text"
            placeholder="Search books by title, author, or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field w-full pl-10"
          />
        </div>
      </div>

      {/* Books Table */}
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-white/60">Loading books...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-white font-semibold">Title</th>
                  <th className="px-6 py-3 text-left text-white font-semibold">Author</th>
                  <th className="px-6 py-3 text-left text-white font-semibold">ISBN</th>
                  <th className="px-6 py-3 text-left text-white font-semibold">Year</th>
                  <th className="px-6 py-3 text-left text-white font-semibold">Quantity</th>
                  <th className="px-6 py-3 text-left text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book, index) => (
                  <motion.tr
                    key={book.id}
                    className="border-b border-white/10 hover:bg-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 text-white">{book.title}</td>
                    <td className="px-6 py-4 text-white/80">{book.author}</td>
                    <td className="px-6 py-4 text-white/80">{book.isbn}</td>
                    <td className="px-6 py-4 text-white/80">{book.publicationYear}</td>
                    <td className="px-6 py-4 text-white/80">{book.quantity}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleEdit(book)}
                          className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit className="w-4 h-4 text-blue-400" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(book.id)}
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
              {editingBook ? 'Edit Book' : 'Add New Book'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/80 mb-2">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({...form, title: e.target.value})}
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">Author</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({...form, author: e.target.value})}
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">ISBN</label>
                <input
                  type="text"
                  value={form.isbn}
                  onChange={(e) => setForm({...form, isbn: e.target.value})}
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">Publication Year</label>
                <input
                  type="number"
                  value={form.publicationYear}
                  onChange={(e) => setForm({...form, publicationYear: e.target.value})}
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">Quantity</label>
                <input
                  type="number"
                  value={form.quantity}
                  onChange={(e) => setForm({...form, quantity: e.target.value})}
                  className="input-field w-full"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  {editingBook ? 'Update' : 'Add'} Book
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingBook(null)
                    setForm({ title: '', author: '', isbn: '', publicationYear: '', quantity: '' })
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

export default Books 