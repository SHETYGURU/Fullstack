import React, { createContext, useState, useEffect } from 'react'
export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  useEffect(()=> {
    if(user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])
  useEffect(()=> {
    if(token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])
  const login = (u, t) => { setUser(u); setToken(t) }
  const logout = () => { setUser(null); setToken(null) }
  return <AuthContext.Provider value={{user, token, login, logout}}>{children}</AuthContext.Provider>
}
