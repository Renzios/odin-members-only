const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

const query = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS messages CASCADE;

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(45) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        admin BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE messages (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

async function main() {
    await client.connect();
    await client.query(query);
    await client.end();
}

main();