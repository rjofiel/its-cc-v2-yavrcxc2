import { Injectable, signal } from "@angular/core";
import { Todo } from "../models/todo";

@Injectable({
  providedIn: "root",
})
export class TodoStore {
    private _todos = signal<Array<Todo>>([]);
    
    public todos = this._todos.asReadonly();

    public addTodo = (title: string, priority: number) => {
        const todo: Todo = {title, priority, id: crypto.randomUUID()}
        this._todos.update(todos => [...todos, todo]);
    }
}
