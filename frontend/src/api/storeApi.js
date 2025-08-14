import api from './axiosInstance'
export const listStores = (params) => api.get('/stores', { params })
export const getStore = (id) => api.get(`/stores/${id}`)
export const createStore = (data) => api.post('/admin/stores', data)
