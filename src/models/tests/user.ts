import { UserStore, User } from "../user";
import { ProductStore, Product } from "../product";
const product = new ProductStore();
const store = new UserStore();

describe('User model test', () => {
    it('Should have an index method', () => {
        expect(product.index).toBeDefined();
    });
});