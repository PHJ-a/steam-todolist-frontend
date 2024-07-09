import { useEffect, useState } from 'react';
import { Todo } from '../models/type';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const useTodos = () => {
  const { isLoggedIn } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      achievementTitle: '엘든링 도전과제 1',
      achievementId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: null,
      isFinished: false,
      userId: 1,
    },
    {
      id: 2,
      achievementTitle: '나의 도전과제 2',
      achievementId: 102,
      gameId: 202,
      gameName: '엘든링',
      start: new Date('2024-06-28T00:00:00'),
      end: null,
      isFinished: false,
      userId: 2,
    },
  ]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axiosInstance.get('/todo', {
          params: {
            completed: false,
          },
        });
        const todos = res.data;
        console.log(todos);
      } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
          console.error(error);
        }
      }
    };

    if (isLoggedIn) {
      fetchTodos();
    }
  }, [isLoggedIn]);

  return { todos };
};

export default useTodos;
