import axios from 'axios';

export async function corrigirPontos(userIds, startDate, endDate, padrao) {
  try {
    const response = await axios.put(
      'http://localhost:3000/correcao',
      { userIds, startDate, endDate, padrao },
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
