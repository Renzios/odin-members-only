const pool = require("./pool");

module.exports = {
    createUser: async ({ firstName, lastName, username, password }) => {
        const query = `
            INSERT INTO users (first_name, last_name, username, password)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await pool.query(query, [firstName, lastName, username, password]);
    },

    updateUser: async (id, { membershipStatus, admin }) => {
        const query = `
            UPDATE users
            SET
                membership_status = $1,
                admin = $2
            WHERE id = $3
        `;
        await pool.query(query, [membershipStatus, admin, id]);
    },

    getMessages: async () => {
        const query = `
            SELECT *
            FROM messages;
        `;
        const { rows } = await pool.query(query);
        return rows;
    },

    createMessage: async (id, { title, text }) => {
        const query = `
            INSERT INTO messages (title, text, user_id)
            VALUES ($1, $2, $3)
        `;
        await pool.query(query, [title, text, id]);
    },

    deleteMessage: async (id) => {
        const query = `
            DELETE FROM messages
            WHERE ID = $1
        `;
        await pool.query(query, [id]);
    }
}; 