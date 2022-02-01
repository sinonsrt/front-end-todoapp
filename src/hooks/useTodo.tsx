import { ITodo } from 'interfaces';
import { useCallback, useState } from 'react';
import { TodoService } from 'services';

export const useTodo = () => {
  const [tasks, setTasks] = useState<ITodo[]>([]);

  const getAll = useCallback(async () => {
    try {
      const { status, data } = await TodoService.getAll();

      if (status !== 200) throw new Error();

      setTasks(data);
    } catch (error) {
      return error;
    }
  }, []);

  const createTodo = useCallback(async (todo: Pick<ITodo, 'task' | 'is_done'>) => {
    try {
      const { status } = await TodoService.createTodo(todo).catch((error) => error);

      if (status !== 201) throw new Error();
    } catch (error) {
      return error;
    }
  }, []);

  const updateTodo = useCallback(async (_id: string, todo: Pick<ITodo, 'task' | 'is_done'>) => {
    try {
      const { status } = await TodoService.updateTodo(_id, todo);
      if (status !== 201) throw new Error();
    } catch (error) {
      return error;
    }
  }, []);

  return {
    tasks,
    getAll,
    createTodo,
    updateTodo,
  };
};
