import api from './axiosInstance'
export const getStats = () => api.get('/admin/stats')
