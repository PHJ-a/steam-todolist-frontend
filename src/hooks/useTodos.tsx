import { useEffect, useState } from 'react';
import { Todo } from '../models/type';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const useTodos = () => {
  const { isLoggedIn } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([
    {
      todoId: 1,
      achieveName: '엘든링 도전과제 1',
      achieveId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: null,
      isFinished: false,
    },
    {
      todoId: 2,
      achieveName: '나의 도전과제 2',
      achieveId: 102,
      gameId: 202,
      gameName: '엘든링',
      start: new Date('2024-06-28T00:00:00'),
      end: null,
      isFinished: false,
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
