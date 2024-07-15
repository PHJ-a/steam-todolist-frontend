import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import axios from 'axios';
import { Game } from './useGames';

export interface Achievement {
  id: number;
  displayName: string;
  description: string;
  achieved: number;
  img: string;
  completedRate: string;
  unlockTime: string;
}

const useAchievements = (game: Game | null) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!game) return;
      try {
        const response = await axiosInstance.get(`/achievement/${game.appid}`);
        setAchievements(response.data.achievements);
      } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
          setError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, [game]);

  // 도전과제가 달성된 순서대로 정렬 그리고 달성률 낮은순으로 정렬
  achievements.sort((a, b) => {
    // achived가 같으면 completedRate로 정렬
    if (a.achieved === b.achieved) {
      return a.completedRate.localeCompare(
        // completedRate는 0.00 형식이므로 반올림
        b.completedRate,
        undefined,
        { numeric: true },
      );
    }
    return b.achieved - a.achieved;
  });

  return {
    achievements,
    selectedAchievement,
    setSelectedAchievement,
    isLoading,
    error,
  };
};

export default useAchievements;
