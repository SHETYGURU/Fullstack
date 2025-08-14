import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'

export default function PrivateRoute({ children }){
  const { user, token } = useAuth()
  const location = useLocation()
  if(!token) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}
