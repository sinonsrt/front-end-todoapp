import { ITodo } from 'interfaces';
import { Api } from 'providers';

const getAll = () => Api.get<ITodo[]>('todo');

const createTodo = (todo: Pick<ITodo, 'task' | 'is_done'>) => Api.post('todo', todo);

const updateTodo = (_id: string, todo: Pick<ITodo, 'task' | 'is_done'>) => Api.patch(`todo/${_id}`, todo);

export const TodoService = {
  getAll,
  createTodo,
  updateTodo,
};
