import { useEffect, useState } from 'react';
import { Todo } from '../models/type';
import axiosInstance from '../api/axios';
import axios from 'axios';

const useCompletedTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      todoId: 1,
      achieveName: '엘든링 도전과제 1',
      achieveId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
    },
    {
      todoId: 2,
      achieveName: '엘든링 도전과제 1',
      achieveId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
    },
    {
      todoId: 3,
      achieveName: '엘든링 도전과제 1',
      achieveId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
    },
    {
      todoId: 4,
      achieveName: '엘든링 도전과제 1',
      achieveId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
    },
    {
      todoId: 5,
      achieveName: '엘든링 도전과제 1',
      achieveId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
    },
    {
      todoId: 6,
      achieveName: '엘든링 도전과제 1',
      achieveId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
    },
    {
      todoId: 7,
      achieveName: '엘든링 도전과제 1',
      achieveId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
    },
    {
      todoId: 8,
      achieveName: '엘든링 도전과제 1',
      achieveId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
    },
    {
      todoId: 9,
      achieveName: '엘든링 도전과제 1',
      achieveId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
    },
    {
      todoId: 10,
      achieveName: '엘든링 도전과제 1',
      achieveId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
    },
  ]);

  useEffect(() => {
    const fetchCompetedTodos = async () => {
      try {
        const res = await axiosInstance.get('/todo', {
          params: {
            completed: true,
          },
        });
        const todos = res.data;
        console.log(todos);
        setTodos(todos);
      } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
          console.log(error);
        }
      }
    };

    fetchCompetedTodos();
  }, []);

  return { todos };
};

export default useCompletedTodos;
