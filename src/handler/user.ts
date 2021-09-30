import { UserStore, User } from "../models/user";
import express, { Application, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config()
const store = new UserStore();

const addUser = async (req: Request, res: Response) => {
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        email: req.body.email
    }
    try {
        if (
            !req.body.firstname ||
            !req.body.lastname ||
            !req.body.email ||
            !req.body.password
        ) {
            return res.status(400).json({ error: "Invalid input or missing fields" })
        }
        const createUser = await store.create(user)
        let token = jwt.sign({ user: createUser }, process.env.TOKEN_SECRET as string);
        res.json(token)
    } catch (err) {
        res.status(400)
    }
}
const getUser = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    const user = await store.show(req.query.id as string)
    res.json(user);
}

const index = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    const user = await store.index()
    res.json(user);
}
const authenticate = async (req: Request, res: Response) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }
    try {
        if (
            !req.body.email ||
            !req.body.password
        ) {
            return res.status(400).json({ error: "Invalid input or missing fields" })
        }
        const u = await store.authenticate(user.email, user.password)
        if (!u) res.send(false);
        else {
            let token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string)
            res.json(token);
        }
    } catch (err) {
        res.status(401);
    }
}
const user_routes = (app: express.Application) => {
    app.post('/signup', addUser);
    app.get('/user', getUser)
    app.get('/users', index)
    app.post('/auth', authenticate)
}

export default user_routes;