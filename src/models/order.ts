import client from "../database";

export type Order = {
    id?: string,
    status: string,
    user_id: string
}

export class OrderStore {
    async create(o: Order): Promise<Order> {
        try {
            const connection = await client.connect()
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2)'
            const result = await connection.query(sql, [o.status, o.user_id])
            connection.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Can not add orders ${err}`)
        }
    }

    async index(): Promise<Order[]> {
        try {
            const connection = await client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await connection.query(sql)
            connection.release()
            return result.rows
        } catch (err) {
            throw new Error(`orders not found ${err}`)
        }
    }
    async show(id: string): Promise<Order> {
        try {
            const connection = await client.connect()
            const sql = 'SELECT * FROM orders WHERE id = ($1)'
            const result = await connection.query(sql, [id])
            connection.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`orders not found ${err}`)
        }
    }
    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            const connection = await client.connect()

            const result = await connection.query(ordersql, [orderId])

            const order = result.rows[0]

            if (order.status !== "active") {
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
            }

            connection.release()
        } catch (err) {
            throw new Error(`${err}`)
        }

        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            const conn = await client.connect()

            const result = await conn
                .query(sql, [quantity, orderId, productId])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }
}