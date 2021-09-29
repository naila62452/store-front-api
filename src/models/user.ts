import client from "../database";
import bcrypt, { hash } from 'bcrypt';
import dotenv from 'dotenv';
require('dotenv').config();

export type User = {
    id?: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string
}

export class UserStore {
    async create(u: User): Promise<User> {
        // try {
        //     const connection = await client.connect()
        //     const sql = 'SELECT * FROM users WHERE email = ($1)'
        //     const result = await connection.query(sql, [u.email])
        //     const existingUser = result.rows[0]
        //     if(existingUser.length > 0) {
        //         throw new Error(`User already exist`)
        //     }
        //     connection.release()
        // } catch(err) {
        //     throw new Error(`Can not register user ${err}`)
        // }

        try {
            let salt = process.env.SALT_ROUNDS as string;
            let pepper = process.env.BCRYPT_PASSWORD as string;
            const connection = await client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, password, email) VALUES ($1, $2, $3, $4) RETURNING *';

            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(salt)
            );
            console.log(salt)
            console.log(hash)
            const result = await connection.query(sql, [u.firstname, u.lastname, hash, u.email]);
            connection.release();
            return result.rows[0]
        } catch (err) {
            throw new Error(`Can not add user ${err}`)
        }
    }
    async show(id: string): Promise<User> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM users WHERE id = ($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`User does not exist ${err}`)
        }
    }

    async index(): Promise<User[]> {
        try {
            const connection = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await connection.query(sql)
            connection.release()
            return result.rows
        } catch(err) {
            throw new Error(`Can not find user ${err}`)
        }
    }

    async authenticate(email: string, password: string): Promise<User | null> {

        let pepper = process.env.BCRYPT_PASSWORD as string;
        const conn = await client.connect();
        const sql = 'SELECT password FROM users WHERE email = ($1)'
        const result = await conn.query(sql, [email])
        if (result.rows.length) {
            const user = result.rows[0]
            if (bcrypt.compareSync(password + pepper, user.password)) {
                return user;
            }

        }
        return null;
    }
}