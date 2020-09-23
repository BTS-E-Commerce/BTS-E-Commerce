//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const client = require('../db');
const usersRouter = require('express').Router();

//~~~~~~~~~~~~~~~~~~~
//~~~ MIDDLEWARE ~~~~
//~~~~~~~~~~~~~~~~~~~
// -- GET Routes --
//* Get All Users
usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await client.getAllUsers();

    res.status(201);
    res.send({
      users,
    });
  } catch (error) {
    next(error);
  }
});

// -- CREATE Routes --
//* Create a User
usersRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await client.createUser(req.body);
    res.status(201);
    res.send({
      user,
    });
  } catch (error) {
    next(error);
  }
});

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = usersRouter;
