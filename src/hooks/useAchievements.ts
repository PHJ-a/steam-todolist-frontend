import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
// import { Achievement, Game } from '../pages/CreateTodo';
import axios from 'axios';
import { Game } from './useGames';

export interface Achievement {
  id: number;
  displayName: string;
  description: string;
  achieved: number;
  img: string;
  completedRate: string;
}

const useAchievements = (game: Game | null) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!game) return;
      try {
        const response = await axiosInstance.get(`/achievement/${game.appid}`);
        console.log(response.data.achievements);
        setAchievements(response.data.achievements);
      } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
          console.log(error);
        }
      }
    };

    fetchAchievements();
  }, [game]);

  // 도전과제가 달성된 순서대로 정렬
  achievements.sort((a, b) => b.achieved - a.achieved);

  return {
    achievements,
    selectedAchievement,
    setSelectedAchievement,
  };
};

export default useAchievements;
