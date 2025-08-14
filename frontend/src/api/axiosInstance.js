import axios from 'axios'
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'
const instance = axios.create({ baseURL })
instance.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if(token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})
export default instance
