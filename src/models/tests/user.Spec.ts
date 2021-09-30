import { UserStore, User } from "../user";
const store = new UserStore();

describe('User model test', () => {
    it('Should have an index method', () => {
        expect(store.index).toBeDefined();
    });

});