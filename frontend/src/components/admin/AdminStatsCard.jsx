import React from 'react'
export default function AdminStatsCard({ label, value }){
  return (
    <div style={{border:'1px solid #ddd', padding:12, borderRadius:8, minWidth:120}}>
      <div style={{fontSize:12,color:'#666'}}>{label}</div>
      <div style={{fontSize:20,fontWeight:700}}>{value}</div>
    </div>
  )
}
