import { useEffect, useState } from 'react';
import { Todo } from '../models/type';
import axiosInstance from '../api/axios';

const useCompletedTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      achievementTitle: '엘든링 도전과제 1',
      achievementId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
      userId: 1,
    },
    {
      id: 2,
      achievementTitle: '엘든링 도전과제 1',
      achievementId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
      userId: 1,
    },
    {
      id: 3,
      achievementTitle: '엘든링 도전과제 1',
      achievementId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
      userId: 1,
    },
    {
      id: 4,
      achievementTitle: '엘든링 도전과제 1',
      achievementId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
      userId: 1,
    },
    {
      id: 5,
      achievementTitle: '엘든링 도전과제 1',
      achievementId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
      userId: 1,
    },
    {
      id: 6,
      achievementTitle: '엘든링 도전과제 1',
      achievementId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
      userId: 1,
    },
    {
      id: 7,
      achievementTitle: '엘든링 도전과제 1',
      achievementId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
      userId: 1,
    },
    {
      id: 8,
      achievementTitle: '엘든링 도전과제 1',
      achievementId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
      userId: 1,
    },
    {
      id: 9,
      achievementTitle: '엘든링 도전과제 1',
      achievementId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
      userId: 1,
    },
    {
      id: 10,
      achievementTitle: '엘든링 도전과제 1',
      achievementId: 101,
      gameId: 201,
      gameName: '엘든링',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      isFinished: false,
      userId: 1,
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
      } catch (error) {
        console.error('투두 페치 에러:', error);
      }
    };

    fetchCompetedTodos();
  }, []);

  return { todos };
};

export default useCompletedTodos;
