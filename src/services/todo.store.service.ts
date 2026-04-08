import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TodoStore {
    private _todos = signal<Array<{title: string, priority: number, id: string}>>([]);
    
    public todos = this._todos.asReadonly();

    public addTodo = (title: string, priority: number) => {
        const todo = {title, priority, id: crypto.randomUUID()}
        this._todos.update(todos => [...todos, todo]);
    }
}
