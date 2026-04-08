import { Component, signal, effect, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TodoStore } from "../services/todo.store.service";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TodoFilter } from "../models/todo";

@Component({
  selector: "app-todo-list",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./todo-list.html",
})
export class TodoListComponent {
  private fb = inject(FormBuilder);

  public readonly store = inject(TodoStore);
  currentFilter = this.store.filter;

  public count = signal<number>(0);

  public todoForm: FormGroup = this.fb.group({
    title: [""],
    priority: [1],
  });

  constructor() {
    effect(() => {
      this.count.set(document.querySelectorAll("#todoList>li").length);
    });
  }

  toggleClass(ev: MouseEvent, className: string) {
    const el = ev.currentTarget as HTMLElement;
    el?.classList.toggle(className);
  }

  public onSubmit = () => {
    const { title, priority } = this.todoForm.value;
    this.store.addTodo(title, priority);
  };

  public delete = (id: string) => {
    this.store.deleteTodo(id);
  };

  public setFilter = (filter: TodoFilter) => {
    this.store.setFilter(filter);
  };
}
