import client from "../database"

export class DashboardQueries {
    async userOrderProduct(): Promise<{firstname: string}[]> {
        try {
            const connection = await client.connect()
            const sql = 'SELECT firstname FROM users INNER JOIN orders ON users.id = orders.user_id'
            const result = await connection.query(sql)
            connection.release()
            return result.rows
        } catch(err) {
            throw new Error(`Can not found results ${err}`)
        }
    }
    async fiveMostPopular(): Promise<{name: string, price: number}[]> {
        try {
            const connection = await client.connect()
            const sql = 'SELECT * FROM products GROUP BY name ORDERED BY price DESC LIMIT 5'
            const result = await connection.query(sql)
            connection.release()
            return result.rows
        } catch(err) {
            throw new Error(`Can not found five popular products ${err}`)
        }
    }
}