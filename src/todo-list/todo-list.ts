import { Component, signal, effect, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TodoStore } from "../services/todo.store.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Todo } from "../models/todo";

@Component({
  selector: "app-todo-list",
  imports: [CommonModule],
  templateUrl: "./todo-list.html",
})
export class TodoListComponent {
  private fb = inject(FormBuilder);

  public readonly store = inject(TodoStore);
  
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
}
