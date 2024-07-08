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
        const response = await axiosInstance.get(`/achievement/${game.appid}`);
        setAchievements(response.data.achievements);
      } catch (err) {
        setAchievements([]);
        console.error(err);
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
