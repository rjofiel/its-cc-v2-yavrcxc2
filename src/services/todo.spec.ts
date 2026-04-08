/// <reference types="jest" />
import { TodoStore } from "./todo.store.service";

describe("TodoStore Service", () => {
  it("should TodoStore exists", () => {
    const store = new TodoStore();
    expect(store).toBeTruthy();
  });
});
