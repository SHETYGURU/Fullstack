import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './routes/PrivateRoute'
import RoleRoute from './routes/RoleRoute'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import AdminDashboard from './pages/Admin/Dashboard'
import UsersList from './pages/Admin/UsersList'
import StoresList from './pages/Admin/StoresList'
import StoreList from './pages/User/StoreList'
import StoreDetail from './pages/User/StoreDetail'
import OwnerDashboard from './pages/Owner/OwnerDashboard'
import Navbar from './components/common/Navbar'
import UserDetail from './pages/Admin/UserDetail'
import AdminPage from './pages/Admin/AdminPage'
import NormalUserRatings from './pages/User/NormalUserRatings'
import ResetPassword from './pages/Auth/ResetPassword'

import ProfilePage from './components/common/Profile'

export default function App(){
  return (
    <AuthProvider>
      <Navbar />
      <div style={{padding:20}}>
        <Routes>
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/" element={<Navigate to="/stores" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/admin" element={
            <PrivateRoute>
              <RoleRoute role="admin">
                <AdminPage />
              </RoleRoute>
            </PrivateRoute>
          } />
          <Route path="/admin/users" element={
            <PrivateRoute>
              <RoleRoute role="admin">
                <UsersList />
              </RoleRoute>
            </PrivateRoute>
          } />
          <Route path="/admin/stores" element={
            <PrivateRoute>
              <RoleRoute role="admin">
                <StoresList />
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="/stores" element={
            <PrivateRoute>
              <RoleRoute role="user">
                <StoreList />
              </RoleRoute>
            </PrivateRoute>
          } />
          <Route path="/stores/:id" element={
            <PrivateRoute>
              <RoleRoute role="user">
                <StoreDetail />
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="/owner" element={
            <PrivateRoute>
              <RoleRoute role="owner">
                <OwnerDashboard />
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="/admin/users/:id" element={
            <PrivateRoute>
              <RoleRoute role="admin">
                <UserDetail />
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="/my-ratings" element={
            <PrivateRoute>
              <RoleRoute role="normal">
                <NormalUserRatings />
              </RoleRoute>
            </PrivateRoute>
          } />

          {/* Profile Route */}
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />

        </Routes>
      </div>
    </AuthProvider>
  )
}
