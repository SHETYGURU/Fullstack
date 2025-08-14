import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

export default function RoleRoute({ role, children }){
  const { user } = useAuth()
  if(!user) return null
  if(role === 'user' && user.role === 'normal') return children
  if(role === 'admin' && user.role === 'admin') return children
  if(role === 'owner' && user.role === 'store_owner') return children
  return <Navigate to="/" replace />
}
