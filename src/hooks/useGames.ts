import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import axios from 'axios';

export interface Game {
  appid: number;
  name: string;
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axiosInstance.get('/game');
        setGames(response.data);
      } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
          console.log(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, isLoading };
};

export default useGames;
