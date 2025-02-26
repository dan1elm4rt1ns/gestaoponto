import axios from 'axios';

const API_URL = 'http://localhost:3000'; // URL do backend

// Função para registrar um ponto
export async function registerPonto(type, timestamp) {
  try {
    const response = await axios.post(
      `${API_URL}/ponto`,
      { type, timestamp },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Função para buscar os pontos (exportada para uso em outras telas)
export async function getPontos() {
  try {
    const response = await axios.get(`${API_URL}/ponto`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
