import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import axios from 'axios';

export interface Game {
  appid: number;
  name: string;
  playTime: number;
  lastPlayedTime: string;
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axiosInstance.get('/game');
        setGames(response.data);
      } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
          setError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, isLoading, error };
};

export default useGames;
