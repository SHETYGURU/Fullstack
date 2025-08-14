// frontend/src/pages/Admin/UsersList.jsx
import React, { useEffect, useState } from 'react'
import { getUsers, createUser } from '../../api/userApi'
import Table from '../../components/common/Table'
import Modal from '../../components/common/Modal'
import { Link } from 'react-router-dom'

export default function UsersList() {
  const [rows, setRows] = useState([])
  const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' })
  const [loading, setLoading] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', address: '', password: '', role: 'normal' })
  const [error, setError] = useState('')

  const fetch = async (params = {}) => {
    setLoading(true)
    try {
      const res = await getUsers(params)
      setRows(res.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const applyFilters = (e) => {
    e?.preventDefault()
    const q = {}
    Object.keys(filters).forEach(k => { if (filters[k]) q[k] = filters[k] })
    fetch(q)
  }

  const clearFilters = () => {
    setFilters({ name: '', email: '', address: '', role: '' })
    fetch()
  }

  const submitNewUser = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createUser(newUser)
      setOpenAdd(false)
      setNewUser({ name: '', email: '', address: '', password: '', role: 'normal' })
      fetch()
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create user')
    }
  }

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'address', label: 'Address' },
    { key: 'role', label: 'Role' },
    { label: 'Actions', render: (row) => <Link to={`/admin/users/${row.id}`}>View</Link> }
  ]

  return (
    <div>
      <h2>Users</h2>

      <div style={{ marginBottom: 12 }}>
        <form onSubmit={applyFilters} style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <input placeholder="Name" value={filters.name} onChange={e => setFilters(f => ({ ...f, name: e.target.value }))} />
          <input placeholder="Email" value={filters.email} onChange={e => setFilters(f => ({ ...f, email: e.target.value }))} />
          <input placeholder="Address" value={filters.address} onChange={e => setFilters(f => ({ ...f, address: e.target.value }))} />
          <select value={filters.role} onChange={e => setFilters(f => ({ ...f, role: e.target.value }))}>
            <option value="">Any role</option>
            <option value="normal">Normal</option>
            <option value="admin">Admin</option>
            <option value="store_owner">Store Owner</option>
          </select>
          <button type="submit">Apply</button>
          <button type="button" onClick={clearFilters}>Clear</button>
          <div style={{ marginLeft: 'auto' }}>
            <button type="button" onClick={() => setOpenAdd(true)}>Add User</button>
          </div>
        </form>
      </div>

      {loading ? <div>Loading...</div> : <Table columns={columns} data={rows} />}

      <Modal open={openAdd} title="Add New User" onClose={() => setOpenAdd(false)}>
        <form onSubmit={submitNewUser} style={{ display: 'grid', gap: 8 }}>
          <input placeholder="Name (20-60 chars)" value={newUser.name} onChange={e => setNewUser(n => ({ ...n, name: e.target.value }))} required />
          <input placeholder="Email" value={newUser.email} onChange={e => setNewUser(n => ({ ...n, email: e.target.value }))} required />
          <textarea placeholder="Address" value={newUser.address} onChange={e => setNewUser(n => ({ ...n, address: e.target.value }))} />
          <input placeholder="Password" type="password" value={newUser.password} onChange={e => setNewUser(n => ({ ...n, password: e.target.value }))} required />
          <select value={newUser.role} onChange={e => setNewUser(n => ({ ...n, role: e.target.value }))}>
            <option value="normal">Normal</option>
            <option value="admin">Admin</option>
            <option value="store_owner">Store Owner</option>
          </select>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit">Create</button>
            <button type="button" onClick={() => setOpenAdd(false)}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
