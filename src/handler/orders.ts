import { OrderStore, Order } from "../models/order";
import express, { Application, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const store = new OrderStore();

const addOrder = async(req:Request, res:Response) => {
    const order: Order = {
        status: req.body.status,
        user_id: req.body.user_id
    }
    const newOrder = await store.create(order);
    res.json(order);
}

const addProduct = async(req: Request, res:Response) => {
    const products = {
        quantity: req.body.quantity,
        order_id: req.body.order_id,
        product_id: req.body.product_id
    }
    const product = await store.addProduct(products.quantity, products.order_id, products.product_id)
    res.json(products)
}

const currentOrder = async(req:Request, res:Response) => {
    try {
        const authHeader = req.headers.authorization as string;
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.send(`Access denied ${err}`)
    }
    // const order = {
    //     quantity: req.body.quantity,
    //     order_id: req.body.order_id,
    //     product_id: req.body.product_id
    // }
    const showOrder = await store.show(req.query.id as string);
    res.json(showOrder)
}

const order_routes = (app: express.Application) => {
    app.post('/addorder', addOrder);
    app.post('/order/:id/product', addProduct)
    app.get('/get-order', currentOrder)
}

export default order_routes;