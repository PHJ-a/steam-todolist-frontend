import { Todo } from '../models/type';
import axiosInstance from './axios';

const fetchCompletedTodos = async () => {
  const res = await axiosInstance.get<Todo[]>('/todo', {
    params: {
      completed: true,
    },
  });
  return res.data;
};

const fetchTodos = async () => {
  const res = await axiosInstance.get<Todo[]>('/todo', {
    params: {
      completed: false,
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

export { fetchCompletedTodos, fetchTodos, deleteTodo, updateTodo };
