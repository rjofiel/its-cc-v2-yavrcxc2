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
            addTodo: jest.fn(),
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

  it("should have todo form to create forms", () => {
    expect(component.todoForm).toBeTruthy();
  });

  it("should have a todo form section", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("#todo-form")).toBeTruthy();
  });

  it("should have title input", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("#title")).toBeTruthy();
  });

  it("should have priority select", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("#priority")).toBeTruthy();
  });

  it("should have submit button", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    expect(button).toBeTruthy();
    expect(button.textContent).toContain("Agregar");
  });

  it("should call addTodo when form is submitted", () => {
    component.todoForm.get("title")?.setValue("Test Task");
    component.todoForm.get("priority")?.setValue(2);

    component.onSubmit();

    expect(store.addTodo).toHaveBeenCalledWith("Test Task", 2);
  });

  it('should call deleteTodo when delete button is clicked', () => {
        const deleteBtn = fixture.nativeElement.querySelector('.delete-btn') as HTMLButtonElement;
        deleteBtn.click();
        
        expect(store.deleteTodo).toHaveBeenCalledWith('1');
      });
});
