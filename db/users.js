//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const { client } = require('./client');

// const { getAllReviewsByUserId, getAllOrdersByUserId } = require('./index');
const { getAllOrdersByUserId } = require('./orders');
const { getAllReviewsByUserId } = require('./reviews');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~

//-- Get Functions --
//* Gets all users in database. Useful for administrator functionality.
async function getAllUsers() {
  try {
    const { rows: userIds } = await client.query(`
            SELECT id
            FROM users;
        `);

    const users = Promise.all(userIds.map((user) => getUserById(user.id)));

    return users;
  } catch (error) {
    throw error;
  }
}

//* Get a specific user given an id.
async function getUserById(id) {
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

    //get orders for user
    const orders = await getAllOrdersByUserId({ id });
    user.orders = orders;

    //get reviews for user
    const reviews = await getAllReviewsByUserId({ id });
    user.reviews = reviews;

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
            SELECT id
            FROM users
            WHERE username=$1;
        `,
      [username]
    );

    if (!user) {
      return;
    }

    const userObj = await getUserById(user.id);

    return userObj;
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

    const userObj = await getUserById(user.id);

    return userObj;
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
  getUserById,
};
