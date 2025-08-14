export const validateEmail = (s='') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
export const validateName = (s='') => typeof s==='string' && s.trim().length>=3 && s.trim().length<=60
export const validatePassword = (s='') => /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/.test(s)
export const validateAddress = (s='') => typeof s==='string' && s.length<=400
