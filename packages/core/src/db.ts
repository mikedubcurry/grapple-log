import mysql from 'mysql2/promise'

let connection: mysql.Connection | null = null;

export async function getDb() {
    if (connection) return connection;

    connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        user: "admin",
        ssl: { rejectUnauthorized: false },
    })

    return connection;
} 
