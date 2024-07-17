import { Todo } from '../models/type';
import axiosInstance from './axios';

const fetchCompletedTodos = async () => {
  const res = await axiosInstance.get<Todo[]>('/todo', {
    params: {
      complete: true,
    },
  });
  return res.data;
};

const fetchTodos = async () => {
  const res = await axiosInstance.get<Todo[]>('/todo', {
    params: {
      complete: false,
    },
  });
  return res.data;
};

const deleteTodo = async (id: number) => {
  await axiosInstance.delete(`/todo/${id}`);
};

const updateTodo = async (id: number) => {
  await axiosInstance.patch(`/todo/${id}`);
};

const createTodo = async (achievementId: number) => {
  await axiosInstance.post('/todo', {
    id: achievementId,
  });
};

export { fetchCompletedTodos, fetchTodos, deleteTodo, updateTodo, createTodo };
