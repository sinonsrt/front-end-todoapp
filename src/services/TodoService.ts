import { ITodo } from 'interfaces';
import { Api } from 'providers';

const getAll = () => Api.get<ITodo[]>('todo');

export const TodoService = {
  getAll,
};
