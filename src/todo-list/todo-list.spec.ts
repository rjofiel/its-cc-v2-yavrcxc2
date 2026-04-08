import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TodoListComponent } from "./todo-list";
import { TodoStore } from "../services/todo.store.service";
import { signal } from "@angular/core";
import { Todo } from "../models/todo";

describe("TodoListComponent", () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: TodoStore;

  const mockTodos: Todo[] = [
    { id: "1", title: "Task 1", completed: false, priority: 1 },
    { id: "2", title: "Task 2", completed: true, priority: 2 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [
        {
          provide: TodoStore,
          useValue: {
            todos: signal(mockTodos),
            addTodos: jest.fn(),
            deleteTodos: jest.fn(),
            toggleComplete: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(TodoStore);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should TodoStore initialized", () => {
    expect(component.store).toBeTruthy();
  });

  it("should contain tasks", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const todoListElement = compiled.querySelector("#todoList");
    expect(todoListElement!.children).toHaveLength(mockTodos.length);
  });

  it("should toggle test class when clicked", async () => {
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const todoTaskElement = compiled.querySelector("#todoList>li");

    component.toggleClass(
      { currentTarget: todoTaskElement } as MouseEvent,
      "test",
    );

    expect(todoTaskElement!.className).toContain("test");

    component.toggleClass(
      { currentTarget: todoTaskElement } as MouseEvent,
      "test",
    );

    expect(todoTaskElement!.className).not.toContain("test");
  });
});
