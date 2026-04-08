import { computed, Injectable, signal } from "@angular/core";
import { Todo, TodoFilter } from "../models/todo";

@Injectable({
  providedIn: "root",
})
export class TodoStore {
  private _todos = signal<Array<Todo>>([]);
  private readonly _filter = signal<TodoFilter>("all");

  public todos = this._todos.asReadonly();

  public filteredTodos = computed(() => {
    const todos = this._todos();
    const filter = this._filter();

    if (filter !== "all") {
      const isCompleted = filter === "completed";
      return todos.filter((todo) => todo.completed === isCompleted);
    }
    return todos;
  });

  public addTodo = (title: string, priority: number) => {
    const todo: Todo = {
      title,
      priority,
      id: crypto.randomUUID(),
      completed: false,
    };
    this._todos.update((todos) => [...todos, todo]);
  };

  public deleteTodo = (id: string) => {
    this._todos.update((todos) => todos.filter((todo) => todo.id !== id));
  };

  public toggleComplete = (id: string) => {
    this._todos.update((todos) => {
      return todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );
    });
  };

  public setFilter = (filterType: TodoFilter) => {
    this._filter.set(filterType);
  };
}
