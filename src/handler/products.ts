import { ProductStore, Product } from "../models/product";
import express, { Application, Request, Response } from 'express';

const store = new ProductStore();

const add = async(req:Request, res:Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price
    }
    const newProduct = await store.create(product);
    res.json(newProduct)
}


const product_route = (app: express.Application) => {
    app.post('/addproduct', add)
}

export default product_route;