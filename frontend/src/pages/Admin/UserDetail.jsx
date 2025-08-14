// frontend/src/pages/Admin/UserDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserDetails } from '../../api/userApi'

export default function UserDetail() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getUserDetails(id).then(r => { if (mounted) setData(r.data) }).catch(e => console.error(e)).finally(() => { if (mounted) setLoading(false) })
    return () => mounted = false
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!data) return <div>User not found</div>

  const { user, stores } = data

  return (
    <div>
      <h2>User details</h2>
      <div style={{ border: '1px solid #eee', padding: 12, maxWidth: 700 }}>
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Address:</strong> {user.address}</div>
        <div><strong>Role:</strong> {user.role}</div>
      </div>

      {user.role === 'store_owner' && (
        <div style={{ marginTop: 16 }}>
          <h3>Store(s) & ratings</h3>
          {stores.length === 0 ? <div>No stores for this owner</div> :
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr><th>Name</th><th>Average rating</th></tr>
              </thead>
              <tbody>
                {stores.map(s => (
                  <tr key={s.id}><td style={{ padding: 8 }}>{s.name}</td><td style={{ padding: 8 }}>{s.avgRating ?? 'N/A'}</td></tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      )}
    </div>
  )
}
