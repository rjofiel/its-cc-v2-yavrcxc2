/// <reference types="jest" />
import { TodoStore } from "./todo.store.service";

describe("TodoStore Service", () => {
  let store: TodoStore;

  beforeEach(() => {
    store = new TodoStore();
  });

  it("should TodoStore exists", () => {
    expect(store).toBeTruthy();
  });

  it("should add todo with a title and priority", () => {
    store.addTodo("Task 1", 1);

    expect(store.todos()).toHaveLength(1);
    expect(store.todos()[0].title).toEqual("Task 1");
    expect(store.todos()[0].priority).toEqual(1);
  });

  it("should generate with an unique id", () => {
    store.addTodo("Task 1", 1);
    store.addTodo("Task 1", 2);

    expect(store.todos()[0].id).not.toEqual(store.todos()[1].id);
    expect(store.todos()[0].title).toEqual(store.todos()[1].title);
  });

  it("should remove a todo by id", () => {
    store.addTodo("Task 1", 1);

    const todo = store.todos()[0];

    store.deleteTodo(todo.id);
    expect(store.todos()).toHaveLength(0);
  });

  it("should set completed as false by default ", () => {
    store.addTodo("Task 1", 1);

    expect(store.todos()[0].completed).toBeFalsy();
  });

  it("should toggle todo completed status", () => {
    store.addTodo("Test", 1);
    const todo = store.todos()[0];

    store.toggleComplete(todo.id);

    expect(store.todos()[0].completed).toBe(true);
  });

  it("should filter completed todos", () => {
    store.addTodo("Task 1", 1);
    store.addTodo("Task 2", 1);

    store.toggleComplete(store.todos()[0].id);
    store.setFilter("completed");

    expect(store.filteredTodos().length).toBe(1);
    expect(store.filteredTodos()[0].title).toBe("Task 1");
  });
});
