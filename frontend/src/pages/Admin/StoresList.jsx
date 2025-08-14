// frontend/src/pages/Admin/StoresList.jsx
import React, { useEffect, useState } from 'react'
import { listStores, createStore } from '../../api/storeApi'
import { getUsers } from '../../api/userApi'
import Table from '../../components/common/Table'
import Modal from '../../components/common/Modal'

export default function StoresList() {
  const [rows, setRows] = useState([])
  const [filters, setFilters] = useState({ name: '', email: '', address: '' })
  const [loading, setLoading] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [owners, setOwners] = useState([])
  const [newStore, setNewStore] = useState({ name: '', email: '', address: '', ownerId: '' })
  const [error, setError] = useState('')

  const fetch = async (params = {}) => {
    setLoading(true)
    try {
      const res = await listStores(params)
      setRows(res.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
    // fetch owners (store_owner users) for owner select
    getUsers({ role: 'store_owner' }).then(r => setOwners(r.data)).catch(() => setOwners([]))
  }, [])

  const applyFilters = (e) => {
    e?.preventDefault()
    const q = {}
    Object.keys(filters).forEach(k => { if (filters[k]) q[k] = filters[k] })
    fetch(q)
  }

  const clearFilters = () => {
    setFilters({ name: '', email: '', address: '' })
    fetch()
  }

  const submitNewStore = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createStore(newStore)
      setOpenAdd(false)
      setNewStore({ name: '', email: '', address: '', ownerId: '' })
      fetch()
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create store')
    }
  }

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'address', label: 'Address' },
    { key: 'rating', label: 'Rating' }
  ]

  return (
    <div>
      <h2>Stores</h2>

      <div style={{ marginBottom: 12 }}>
        <form onSubmit={applyFilters} style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <input placeholder="Name" value={filters.name} onChange={e => setFilters(f => ({ ...f, name: e.target.value }))} />
          <input placeholder="Email" value={filters.email} onChange={e => setFilters(f => ({ ...f, email: e.target.value }))} />
          <input placeholder="Address" value={filters.address} onChange={e => setFilters(f => ({ ...f, address: e.target.value }))} />
          <button type="submit">Apply</button>
          <button type="button" onClick={clearFilters}>Clear</button>
          <div style={{ marginLeft: 'auto' }}>
            <button type="button" onClick={() => setOpenAdd(true)}>Add Store</button>
          </div>
        </form>
      </div>

      {loading ? <div>Loading...</div> : <Table columns={columns} data={rows} />}

      <Modal open={openAdd} title="Add New Store" onClose={() => setOpenAdd(false)}>
        <form onSubmit={submitNewStore} style={{ display: 'grid', gap: 8 }}>
          <input placeholder="Name" value={newStore.name} onChange={e => setNewStore(n => ({ ...n, name: e.target.value }))} required />
          <input placeholder="Email" value={newStore.email} onChange={e => setNewStore(n => ({ ...n, email: e.target.value }))} required />
          <textarea placeholder="Address" value={newStore.address} onChange={e => setNewStore(n => ({ ...n, address: e.target.value }))} />
          <select value={newStore.ownerId} onChange={e => setNewStore(n => ({ ...n, ownerId: e.target.value }))}>
            <option value="">No owner</option>
            {owners.map(o => <option key={o.id} value={o.id}>{o.name} ({o.email})</option>)}
          </select>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit">Create Store</button>
            <button type="button" onClick={() => setOpenAdd(false)}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
