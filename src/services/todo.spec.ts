/// <reference types="jest" />
import { TodoStore } from "./todo.store.service";

describe("TodoStore Service", () => {
  it("should TodoStore exists", () => {
    const store = new TodoStore();
    expect(store).toBeTruthy();
  });

  it('should add todo with a title and priority', () => {
    const store = new TodoStore();
    store.addTodo('Task 1', 1);

    expect(store.todos()).toHaveLength(1);
    expect(store.todos()[0].title).toEqual('Task 1')
    expect(store.todos()[0].priority).toEqual(1)
  })

  it('should generate with an unique id', () => {
    const store = new TodoStore();
    store.addTodo('Task 1', 1);
    store.addTodo('Task 1', 2);

    expect(store.todos()[0].id).not.toEqual(store.todos()[1].id)
    expect(store.todos()[0].title).toEqual(store.todos()[1].title)

  })
});
