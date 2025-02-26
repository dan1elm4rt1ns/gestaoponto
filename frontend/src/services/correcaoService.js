import API from './api';

export const corrigirPontos = async (userIds, startDate, endDate, padrao) => {
  try {
    const response = await API.put('/correcao', { userIds, startDate, endDate, padrao });
    return response.data;
  } catch (error) {
    throw error;
  }
};
