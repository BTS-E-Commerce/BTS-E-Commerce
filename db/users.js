//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const { client } = require('./client');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~

//-- Get Functions --
//* Gets all users in database. Useful for administrator functionality.
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

//* Get a specific user given an id.
async function getUserById({ id }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE id=$1;
        `,
      [id]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

//* Get a specific user given a string username.
async function getUserByUsername({ username }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE username=$1;
        `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

//-- Create Functions --
//* Creates a new user. Used in the registering process.
async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(username, password)
            VALUES ($1, $2)
            RETURNING *;
        `,
      [username, password]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

//-- Update Functions --
//* Updates a users informaiton.

//-- Delete Functions --
//* Delete a user.

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
  getAllUsers,
  createUser,
  getUserByUsername,
};
