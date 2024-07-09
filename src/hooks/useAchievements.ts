import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { Achievement, Game } from '../pages/CreateTodo';
import axios from 'axios';

const useAchievements = (game: Game | null) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!game) return;
      try {
        const response = await axiosInstance.get(`/achievement/${game.appid}`);
        setAchievements(response.data.achievements);
      } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
          setAchievements([]);
          console.log(error);
        }
      }
      setSelectedAchievement(null);
    };

    fetchAchievements();
  }, [game]);

  return {
    achievements,
    selectedAchievement,
    setSelectedAchievement,
  };
};

export default useAchievements;
