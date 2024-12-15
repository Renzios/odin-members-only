require("dotenv").config();
const { Client } = require("pg");

async function main() {
    const query = `
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS messages CASCADE;

        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(45) NOT NULL,
            last_name VARCHAR(45) NOT NULL,
            username VARCHAR(45) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            membership_status BOOLEAN DEFAULT FALSE,
            admin BOOLEAN DEFAULT FALSE
        );

        CREATE TABLE messages (
            id SERIAL PRIMARY KEY,
            title VARCHAR(45) NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            text TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        );
    `;

    const client = new Client({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT
    });

    await client.connect();
    await client.query(query);
    await client.end();
}

main();