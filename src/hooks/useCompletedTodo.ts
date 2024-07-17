import { Todo } from '../models/type';
import { useQuery } from '@tanstack/react-query';
import { fetchCompletedTodos } from '../api/fetchs';

const useCompletedTodos = () => {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery<Todo[]>({
    queryKey: ['completedTodos'],
    queryFn: fetchCompletedTodos,
  });

  return { todos, isLoading, error };
};

export default useCompletedTodos;
