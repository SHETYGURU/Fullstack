import React from 'react'
export default function RatingList({ ratings=[] }){
  return (
    <div>
      <h3>Ratings</h3>
      <table style={{width:'100%'}}>
        <thead><tr><th>User</th><th>Rating</th><th>Comment</th></tr></thead>
        <tbody>
          {ratings.map((r,i)=> <tr key={i}><td>{r.userName}</td><td>{r.rating}</td><td>{r.comment??''}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
