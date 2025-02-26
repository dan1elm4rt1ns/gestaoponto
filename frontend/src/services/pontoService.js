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
