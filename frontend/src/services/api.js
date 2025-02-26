import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // URL do backend
});

// Interceptador para adicionar o token a todas as requisições, se disponível
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
