import axiosInstance from './axios';

export const fetchGames = async () => {
  const response = await axiosInstance.get('/game');
  return response.data;
};
