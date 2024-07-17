import { Todo } from '../models/type';
import { useAuth } from '../context/AuthContext';
import { createTodo, deleteTodo, fetchTodos, updateTodo } from '../api/fetchs';
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
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        return old?.filter((todo) => todo.todoId !== id);
      });

      return { previousTodos };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error, _, context) => {
      queryClient.setQueryData<Todo[]>(['todos'], context?.previousTodos);
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

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const updateTodoItem = async (id: number) => {
    await updateTodoMutation.mutateAsync(id);
  };

  return {
    todos,
    updateTodoItem,
    createTodoMutation,
    removeTodoMutation,
  };
};

export default useTodos;
