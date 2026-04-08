export interface Todo {
  title: string;
  priority: number;
  id: string;
  completed: boolean
}

export type TodoFilter = 'all' | 'completed' | 'pending';
