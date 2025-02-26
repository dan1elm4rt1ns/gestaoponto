#!/bin/bash

# Criando o diretório src/services
echo "Criando o diretório src/services..."
mkdir -p src/services

# Criando o arquivo api.js
echo "Criando o arquivo api.js..."
cat <<EOL > src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // URL do backend
});

// Interceptador para adicionar o token a todas as requisições, se disponível
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
EOL

# Criando o arquivo authService.js
echo "Criando o arquivo authService.js..."
cat <<EOL > src/services/authService.js
import API from './api';

export const loginUser = async (email, password) => {
  try {
    const response = await API.post('/auth/login', { email, password });
    return response.data; // Espera receber { token: '...'}
  } catch (error) {
    throw error;
  }
};
EOL

# Criando o arquivo pontoService.js
echo "Criando o arquivo pontoService.js..."
cat <<EOL > src/services/pontoService.js
import API from './api';

export const registerPonto = async (type, timestamp) => {
  try {
    const response = await API.post('/ponto', { type, timestamp });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPontos = async () => {
  try {
    const response = await API.get('/ponto');
    return response.data;
  } catch (error) {
    throw error;
  }
};
EOL

# Criando o arquivo correcaoService.js
echo "Criando o arquivo correcaoService.js..."
cat <<EOL > src/services/correcaoService.js
import API from './api';

export const corrigirPontos = async (userIds, startDate, endDate, padrao) => {
  try {
    const response = await API.put('/correcao', { userIds, startDate, endDate, padrao });
    return response.data;
  } catch (error) {
    throw error;
  }
};
EOL

echo "Arquivos e serviços criados com sucesso!"

