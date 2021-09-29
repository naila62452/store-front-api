import { ProductStore, Product } from "../models/product";
import express, { Application, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { DashboardQueries } from "../services/dashboard";

const store = new ProductStore();
const popularProducts = new DashboardQueries();

const add = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price
        }

        const newProduct = await store.create(product)
        res.json(product)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const showAllProducts = async (req: Request, res: Response) => {
    const allProducts = await store.index();
    res.json(allProducts)
}

const showById = async (req: Request, res: Response) => {
    const product = await store.show(req.query.id as string)
    res.json(product);
}

const product_route = (app: express.Application) => {
    app.post('/addproduct', add);
    app.get('/showall', showAllProducts);
    app.get('/show', showById);
}

export default product_route;