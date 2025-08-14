import * as api from '../api/authApi';

export const login = (data) => api.login(data);
export const signup = (data) => api.signup(data);
export const updatePassword = (data) => api.updatePassword(data);
