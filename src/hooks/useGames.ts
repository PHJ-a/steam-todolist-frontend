// src/hooks/useGames.ts
import { useQuery } from '@tanstack/react-query';
import { fetchGames } from '../api/games';

export interface Game {
  appid: number;
  name: string;
  playTime: number;
}

const useGames = () => {
  const { data, error, isLoading } = useQuery<Game[], Error>({
    queryKey: ['games'],
    queryFn: fetchGames,
  });

  return {
    games: data || [],
    isLoading,
    error: !!error,
  };
};

export default useGames;
