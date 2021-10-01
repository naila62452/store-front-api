import { UserStore, User } from '../user';
import supertest from 'supertest';
import app from '../../server';

const store = new UserStore();

describe('User model test', () => {
  it('Should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('Should have an create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      firstname: 'Naila',
      lastname: 'Nosheen',
      password: '12345678',
      email: 'abc@gmail.com'
    });
    expect(result).toEqual({
      id: "1",
      firstname: 'Naila',
      lastname: 'Nosheen',
      password: '12345678',
      email: 'abc@gmail.com'
    });
    
  });
});
