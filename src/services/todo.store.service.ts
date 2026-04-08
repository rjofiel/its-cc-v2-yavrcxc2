import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TodoStore {
    private _todos = signal<Array<{title: string, priority: number}>>([]);
    
    public todos = this._todos.asReadonly();

    public addTodo = (title: string, priority: number) => {
        this._todos.update(todos => [...todos, {title, priority}]);
    }
}
