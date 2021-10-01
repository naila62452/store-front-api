"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../user");
var store = new user_1.UserStore();
describe('User model test', function () {
    it('Should have an index method', function () {
        expect(store.index).toBeDefined();
    });
    it('Should have an create method', function () {
        expect(store.create).toBeDefined();
    });
    // it('create method should add a user', async () => {
    //     const result = await store.create({
    //       firstname: 'Daniel',
    //       lastname: 'John',
    //       password: '12345678',
    //       email: 'abc@gmail.com'
    //     });
    //     expect(result).toEqual({
    //       id: "1",
    //       firstname: 'Daniel',
    //       lastname: 'John',
    //       password: hash,
    //       email: 'abc@gmail.com'
    //     });
    //   });
    // it('show method should return the correct user', async () => {
    //     const result = await store.show("1");
    //     expect(result).toEqual({
    //       id: "1",
    //       title: 'Bridge to Terabithia',
    //       total_pages: 250,
    //       author: 'Katherine Paterson',
    //       type: 'Childrens'
    //     });
    //   });
});
