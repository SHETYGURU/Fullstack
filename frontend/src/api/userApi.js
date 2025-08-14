import api from './axiosInstance'
export const getUsers = (params) => api.get('/admin/users', { params })
export const createUser = (data) => api.post('/admin/users', data)
export const getUserDetails = (id) => api.get(`/admin/users/${id}`)
