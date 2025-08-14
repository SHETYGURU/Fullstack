import * as api from '../api/storeApi'
export const list = (params) => api.listStores(params)
export const get = (id) => api.getStore(id)
