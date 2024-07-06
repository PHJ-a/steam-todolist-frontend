import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { Achievement, Game } from '../pages/CreateTodo';

const useAchievements = (game: Game | null) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!game) return;
      try {
        const response = await axiosInstance.get(`/achievements/${game.appid}`);
        setAchievements(response.data.achievements);
        setSelectedAchievement(null); // Reset selected achievement when game changes
      } catch (err) {
        setAchievements([]);
        console.error(err);
      }
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
