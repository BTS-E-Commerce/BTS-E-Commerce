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
    if (orders.length != 0) {
      user.orders = orders;
    }



    //get reviews for user
    const reviews = await getAllReviewsByUserId({ id });
    if (reviews.length != 0) {
      user.reviews = reviews;
    }

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
async function createUser({ username, password, admin = false }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(username, password, admin)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
      [username, password, admin]
    );

    const userObj = await getUserById(user.id);

    return userObj;
  } catch (error) {
    throw error;
  }
}

//-- Update Functions --
//* Updates a users informaiton.
async function updateUser(userId, fields = {}) {
  console.log(fields);
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  if (setString.length === 0) {
    return;
  }
  try {
    await client.query(`
    UPDATE users
    SET ${setString}
    WHERE id=${userId}
    RETURNING *;
  `, Object.values(fields));

    const updatedUser = getUserById(userId);

    return updatedUser;
  } catch (error) {
    throw error;
  }
}
//-- Delete Functions --
//* Delete a user.
async function deleteUser(userId) {
  try {
    const {
      rows: orders,
    } = await client.query(
      `
            DELETE
            FROM orders
            WHERE "userId"=$1
            RETURNING *;
        `,
      [userId]
    );

    const {
      rows: reviews,
    } = await client.query(
      `
            DELETE
            FROM reviews
            WHERE "userId"=$1
            RETURNING *;
        `,
      [userId]
    );

    const {
      rows: [user],
    } = await client.query(
      `
            DELETE
            FROM users
            WHERE id=$1
            RETURNING *;
        `,
      [userId]
    );

    if (orders.length != 0) {
      user.orders = orders;
    }
    if (reviews.length != 0) {
      user.reviews = reviews;
    }


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
  createUser,
  getUserByUsername,
  getUserById,
  updateUser,
  deleteUser
};
