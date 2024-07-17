import axiosInstance from './axios';

export const fetchAchievements = async (gameId: number) => {
  const response = await axiosInstance.get(`/achievement/${gameId}`);
  return response.data.achievements;
};
