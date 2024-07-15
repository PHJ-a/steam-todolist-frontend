import { useEffect, useState } from 'react';
import { Todo } from '../models/type';
import axiosInstance from '../api/axios';
import axios from 'axios';

const useCompletedTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      todoId: 1,
      achieveName: '첫 번째 용 처치',
      achieveId: 101,
      gameId: 201,
      gameName: '스카이림',
      start: '2024-06-22T09:00',
      end: '2024-06-22T14:30',
      isFinished: true,
    },
    {
      todoId: 2,
      achieveName: '100km 달리기',
      achieveId: 102,
      gameId: 202,
      gameName: '포르자 호라이즌 5',
      start: '2024-06-23T10:30',
      end: '2024-06-23T18:45',
      isFinished: true,
    },
    {
      todoId: 3,
      achieveName: '모든 무기 수집',
      achieveId: 103,
      gameId: 203,
      gameName: '데스 스트랜딩',
      start: '2024-06-24T08:15',
      end: '2024-06-25T02:30',
      isFinished: true,
    },
    {
      todoId: 4,
      achieveName: '최고 난이도 클리어',
      achieveId: 104,
      gameId: 204,
      gameName: '다크소울 3',
      start: '2024-06-25T11:45',
      end: '2024-06-26T07:15',
      isFinished: true,
    },
    {
      todoId: 5,
      achieveName: '모든 엔딩 보기',
      achieveId: 105,
      gameId: 205,
      gameName: '디트로이트: 비컴 휴먼',
      start: '2024-06-26T07:30',
      end: '2024-06-27T13:00',
      isFinished: true,
    },
    {
      todoId: 6,
      achieveName: '1000킬 달성',
      achieveId: 106,
      gameId: 206,
      gameName: '카운터-스트라이크: 글로벌 오펜시브',
      start: '2024-06-27T14:00',
      end: '2024-06-28T22:30',
      isFinished: true,
    },
    {
      todoId: 7,
      achieveName: '모든 포켓몬 잡기',
      achieveId: 107,
      gameId: 207,
      gameName: '포켓몬 소드',
      start: '2024-06-28T13:20',
      end: '2024-06-30T18:45',
      isFinished: true,
    },
    {
      todoId: 8,
      achieveName: '100% 완료',
      achieveId: 108,
      gameId: 208,
      gameName: '스파이더맨: 마일스 모랄레스',
      start: '2024-06-29T16:45',
      end: '2024-06-30T23:59',
      isFinished: true,
    },
    {
      todoId: 9,
      achieveName: '모든 보스 처치',
      achieveId: 109,
      gameId: 209,
      gameName: '홀로우 나이트',
      start: '2024-06-30T12:10',
      end: '2024-07-02T03:30',
      isFinished: true,
    },
    {
      todoId: 10,
      achieveName: '레전더리 등급 달성',
      achieveId: 110,
      gameId: 210,
      gameName: '오버워치 2',
      start: '2024-07-01T15:30',
      end: '2024-07-03T09:45',
      isFinished: true,
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
        setTodos((prev) => [...prev, ...todos]);
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
