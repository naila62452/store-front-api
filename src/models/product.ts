import client from "../database";

export type Product = {
    id?: string,
    name: string,
    price: string
}

export class ProductStore {
    async create(p: Product): Promise<Product> {
        try {
            const connection = await client.connect()
            const sql = 'INSERT INTO products(name, price) VALUES ($1, $2)'
            const result = await connection.query(sql, [p.name, p.price])
            connection.release()
            return result.rows[0]
        } catch(err) {
            throw new Error (`Can not add product ${err}`)
        }
    }

    async index(): Promise<Product[]> {
        try {
            const connection = await client.connect()
            const sql = 'SELECT * FROM products'
            const result = await connection.query(sql)
            connection.release()
            return result.rows
        } catch(err) {
            throw new Error(`Products not found ${err}`)
        }
    }
    async show(id: string): Promise<Product> {
        try {
            const connection = await client.connect()
            const sql = 'SELECT * FROM products WHERE id = ($1)'
            const result = await connection.query(sql, [id])
            connection.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Products not found ${err}`)
        }
    }
}