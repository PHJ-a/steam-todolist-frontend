import { Todo } from '../models/type';
import { useAuth } from '../context/AuthContext';
import { deleteTodo, fetchTodos } from '../api/fetchs';
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

  const removeTodo = (id: number) => {
    removeTodoMutation.mutate(id);
  };
  return { todos, removeTodo };
};

export default useTodos;
