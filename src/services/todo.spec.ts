/// <reference types="jest" />

describe('TodoStore Service' , () => {

    it('should TodoStore exists', () => {
        const store = new TodoStore();
        expect(store).toBeTruthy();

    })
})