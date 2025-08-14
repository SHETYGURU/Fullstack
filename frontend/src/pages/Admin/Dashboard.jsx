import React, { useEffect, useState } from 'react'
import AdminStatsCard from '../../components/admin/AdminStatsCard'
import api from '../../api/axiosInstance'

export default function AdminDashboard(){
  const [stats, setStats] = useState({ users:0, stores:0, ratings:0 })
  useEffect(()=>{
    let mounted = true
    api.get('/admin/stats').then(r=>{ if(mounted) setStats(r.data) }).catch(()=>{})
    return ()=> mounted = false
  },[])
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div style={{display:'flex',gap:12}}>
        <AdminStatsCard label="Users" value={stats.users} />
        <AdminStatsCard label="Stores" value={stats.stores} />
        <AdminStatsCard label="Ratings" value={stats.ratings} />
      </div>
    </div>
  )
}
