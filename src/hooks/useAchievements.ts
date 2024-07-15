// src/hooks/useAchievements.ts
import { useQuery } from '@tanstack/react-query';
import { fetchAchievements } from '../api/achievements';
import { Game } from './useGames';
import { useState } from 'react';

export interface Achievement {
  id: number;
  displayName: string;
  description: string;
  achieved: number;
  img: string;
  completedRate: string;
  unlockTime: string;
}

const useAchievements = (game: Game) => {
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const { data, error, isLoading } = useQuery<Achievement[], Error>({
    queryKey: ['achievements', game.appid],
    queryFn: () => fetchAchievements(game.appid),
    enabled: !!game,
  });

  const achievements = data || [];

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
