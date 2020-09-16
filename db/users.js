//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const { client } = require('./client');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~

//-- Get Functions --
//# Gets all users in database. Useful for administrator functionality.
async function getAllUsers() {
    try {
        const { rows: users } = await client.query(`
            SELECT *
            FROM users;
        `);

        return users;
    } catch (error) {
        throw error;
    }
}

async function getUserById({ id }) {
    try {

    } catch (error) {

    }
}

//-- Create Functions --
//# Creates a new user. Used in the registering process.
async function createUser({ username, password }) {
    try {
        const { rows: [user] } = await client.query(`
            INSERT INTO users(username, password)
            VALUES ($1, $2)
            RETURNING *;
        `, [username, password]);

        return user;
    } catch (error) {
        throw error;
    }
}

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
    getAllUsers,
    createUser
}