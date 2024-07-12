import { useEffect, useState } from 'react';
import { Todo } from '../models/type';
import axiosInstance from '../api/axios';
import axios from 'axios';

const useCompletedTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchCompetedTodos = async () => {
      try {
        const res = await axiosInstance.get('/todo', {
          params: {
            completed: true,
          },
        });
        const todos = res.data;
        setTodos(todos);
      } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
          console.log(error);
          setTodos([]);
        }
      }
    };

    fetchCompetedTodos();
  }, []);

  return { todos };
};

export default useCompletedTodos;
