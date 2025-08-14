import React, { useEffect, useState } from 'react'
import { getMyRatings, createRating, updateRating } from '../../api/ratingApi'
import { listStores } from '../../api/storeApi'
import Table from '../../components/common/Table'
import Modal from '../../components/common/Modal'

export default function NormalUserRatings() {
  const [ratings, setRatings] = useState([])
  const [stores, setStores] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [newRating, setNewRating] = useState({ storeId: '', rating: 5 })
  const [editRating, setEditRating] = useState({ id: '', rating: 5 })

  const fetchRatings = async () => {
    try {
      const res = await getMyRatings()
      setRatings(res.data)
    } catch (err) {
      console.error('Failed to fetch ratings', err)
    }
  }

  const fetchStores = async () => {
    try {
      const res = await listStores()
      setStores(res.data)
    } catch (err) {
      console.error('Failed to fetch stores', err)
    }
  }

  useEffect(() => {
    fetchRatings()
    fetchStores()
  }, [])

  const handleAddRating = async (e) => {
    e.preventDefault()
    try {
      await createRating(newRating)
      alert('Rating submitted successfully!')
      setOpenAdd(false)
      setNewRating({ storeId: '', rating: 5 })
      fetchRatings()
    } catch (err) {
      alert('Failed to submit rating.')
    }
  }

  const handleEditRating = async (e) => {
    e.preventDefault()
    try {
      await updateRating(editRating.id, { rating: editRating.rating })
      alert('Rating updated successfully!')
      setOpenEdit(false)
      fetchRatings()
    } catch (err) {
      alert('Failed to update rating.')
    }
  }

  const columns = [
    { key: 'storeName', label: 'Store' },
    { key: 'rating', label: 'Rating' },
    {
      label: 'Actions',
      render: (row) => (
        <button onClick={() => { setEditRating({ id: row.id, rating: row.rating }); setOpenEdit(true) }}>
          Edit
        </button>
      )
    }
  ]

  return (
    <div>
      <h2>My Ratings</h2>
      <button onClick={() => setOpenAdd(true)}>Add Rating</button>
      <Table columns={columns} data={ratings} />

      {/* Add Rating Modal */}
      <Modal open={openAdd} title="Add Rating" onClose={() => setOpenAdd(false)}>
        <form onSubmit={handleAddRating} style={{ display: 'grid', gap: 8 }}>
          <select
            value={newRating.storeId}
            onChange={(e) => setNewRating({ ...newRating, storeId: e.target.value })}
            required
          >
            <option value="">Select Store</option>
            {stores.map(store => (
              <option key={store.id} value={store.id}>{store.name}</option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            max="5"
            value={newRating.rating}
            onChange={(e) => setNewRating({ ...newRating, rating: e.target.value })}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </Modal>

      {/* Edit Rating Modal */}
      <Modal open={openEdit} title="Edit Rating" onClose={() => setOpenEdit(false)}>
        <form onSubmit={handleEditRating} style={{ display: 'grid', gap: 8 }}>
          <input
            type="number"
            min="1"
            max="5"
            value={editRating.rating}
            onChange={(e) => setEditRating({ ...editRating, rating: e.target.value })}
            required
          />
          <button type="submit">Update</button>
        </form>
      </Modal>
    </div>
  )
}
