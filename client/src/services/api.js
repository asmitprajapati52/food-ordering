import axios from 'axios';

// Base URL configured via environment variable
const rawBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
// Ensure /api suffix is present
const baseURL = rawBaseURL.endsWith('/api') 
  ? rawBaseURL 
  : `${rawBaseURL.replace(/\/+$/, '')}/api`;

const api = axios.create({
  baseURL,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('hunger_rush_user');
    if (user) {
      const parsed = JSON.parse(user);
      if (parsed.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
