import api from './axiosInstance'
export const login = (payload) => api.post('/auth/login', payload)
export const signup = (payload) => api.post('/auth/signup', payload)
export const updatePassword = (payload) => api.post('/auth/update-password', payload)
