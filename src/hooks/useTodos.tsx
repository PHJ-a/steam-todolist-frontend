import { Todo } from '../models/type';
import { useAuth } from '../context/AuthContext';
import { deleteTodo, fetchTodos, updateTodo } from '../api/fetchs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useTodos = () => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();

  const { data: todos } = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    enabled: isLoggedIn,
  });

  const removeTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const removeTodo = (id: number) => {
    removeTodoMutation.mutate(id);
  };
  const updateTodoItem = async (id: number) => {
    await updateTodoMutation.mutateAsync(id);
  };
  return { todos, removeTodo, updateTodoItem };
};

export default useTodos;
