import axios from 'axios';
import { store } from '../store'; // Asumsi store redux sudah dibuat

const api = axios.create({
  baseURL: 'https://social-media-be-400174736012.asia-southeast2.run.app', // [cite: 31]
});

// Request Interceptor: Attach Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Persist session 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;