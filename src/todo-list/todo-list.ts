import {  Component, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoStore } from '../services/todo.store.service';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
  templateUrl: './todo-list.html',
})
export class TodoListComponent  {
  public count = signal<number>(0)
  public readonly store = inject(TodoStore);

  constructor() {
    effect(() => {
      this.count.set(document.querySelectorAll('#todoList>li').length)
    })
  }

  toggleClass(ev: MouseEvent, className: string) {
    const el = ev.currentTarget as HTMLElement;
    el.classList.toggle(className);
  }

}
