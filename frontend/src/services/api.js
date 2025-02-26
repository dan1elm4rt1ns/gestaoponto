import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // URL do backend
});

// Intercepta as requisições para adicionar o token de autenticação
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
