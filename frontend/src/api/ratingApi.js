// frontend/src/api/ratingApi.js
import api from './axiosInstance'

// Get current user ratings (if needed)
export const getMyRatings = () => api.get('/ratings/my')

// Create rating for a store
export const createRating = ({ storeId, rating }) => 
  api.post(`/stores/${storeId}/ratings`, { rating })

// Update existing rating by rating ID
export const updateRating = (ratingId, data) => 
  api.put(`/ratings/${ratingId}`, data)

// Alias for backward compatibility
export const submitRating = (data) => createRating(data)
