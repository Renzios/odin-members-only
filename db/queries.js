const pool = require("./pool");

module.exports = {
    createUser: async (username, password) => {
        const query = `
            INSERT INTO users (username, password)
            VALUES ($1, $2)
        `;
        await pool.query(query, [username, password]);
    },

    readUserByID: async (id) => {
        const query = `
            SELECT *
            FROM users
            WHERE id = $1
        `;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    readUserByUsername: async (username) => {
        const query = `
            SELECT *
            FROM users
            WHERE username = $1
        `;
        const { rows } = await pool.query(query, [username]);
        return rows[0];
    },

    createMessage: async (userID, text) => {
        const query = `
            INSERT INTO messages (user_id, text)
            VALUES ($1, $2)
        `;
        await pool.query(query, [userID, text]);
    },

    readMessages: async () => {
        const query = `
            SELECT *
            FROM messages;
        `;
        const { rows } = await pool.query(query);
        return rows;
    },

    deleteMessage: async (id) => {
        const query = `
            DELETE FROM messages
            WHERE ID = $1
        `;
        await pool.query(query, [id]);
    }
}; 