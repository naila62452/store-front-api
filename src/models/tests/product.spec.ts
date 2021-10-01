import { ProductStore } from '../product';

const store = new ProductStore();

describe('Product model test', () => {
  it('Should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  
  it('Should have an create method', () => {
    expect(store.create).toBeDefined();
  });

  it('Should have an create method', () => {
    expect(store.show).toBeDefined();
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: '1',
        name: 'Chocolate',
        price: '20',
      },
    ]);
  });
});
