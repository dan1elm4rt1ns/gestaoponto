import axios from 'axios';

export async function getDashboardData() {
  try {
    const response = await axios.get('http://localhost:3000/dashboard', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data; // Exemplo: { totalPontosHoje: 15 }
  } catch (error) {
    throw error;
  }
}
