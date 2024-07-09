import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { Game } from '../pages/CreateTodo';
import axios from 'axios';

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axiosInstance.get('/game');
        setGames(response.data);
      } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
          console.log(error);
        }
      }
    };

    fetchGames();
  }, []);

  return { games, selectedGame, setSelectedGame };
};

export default useGames;
