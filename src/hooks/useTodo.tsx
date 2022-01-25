import { ITodo } from 'interfaces';
import { useCallback, useState } from 'react';
import { TodoService } from 'services';

export const useTodo = () => {
  const [tasks, setTasks] = useState<ITodo[]>([]);

  const getAll = useCallback(async () => {
    const { status, data } = await TodoService.getAll();

    if (status !== 200) throw new Error();

    setTasks(data);
  }, []);

  return {
    tasks,
    getAll,
  };
};
