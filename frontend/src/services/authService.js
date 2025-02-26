import API from './api';

export const loginUser = async (email, password) => {
  try {
    const response = await API.post('/auth/login', { email, password });
    return response.data; // Espera receber { token: '...'}
  } catch (error) {
    throw error;
  }
};
