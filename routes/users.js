//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const client = require('../db');
const usersRouter = require('express').Router();
const { requireUser, requireAdmin } = require('./utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;

const SALT_COUNT = 10;

//~~~~~~~~~~~~~~~~~~~
//~~~ MIDDLEWARE ~~~~
//~~~~~~~~~~~~~~~~~~~

// -- GET Routes --
//* Get All Users

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await client.getAllUsers();

    res.status(201).send({
      users,
    });
  } catch (error) {
    next(error);
  }
});

// -- CREATE Routes --
//* Creates a user from the register form.
usersRouter.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userCheck = await client.getUserByUsername({ username });

    if (userCheck) {
      res.status(401).send({
        name: 'User Already Exists Error',
        message: 'Username already exists',
      });
    }

    let securePassword;

    bcrypt.hash(password, SALT_COUNT, async (err, hashedPassword) => {
      securePassword = hashedPassword;

      const newUser = await client.createUser({
        username,
        password: securePassword,
      });

      const token = jwt.sign(
        { id: newUser.id, username },
        process.env.JWT_SECRET,
        {
          expiresIn: '2hr',
        }
      );

      // delete newUser.password;

      res.status(201).send({
        newUser: {
          username: newUser.username,
          id: newUser.id,
          admin: newUser.admin,
        },
        token,
        message: 'Thank you for signing up!',
      });
    });
  } catch (error) {
    console.error(error.message);
  }
});

//* Logs in a user from the login form using JWT and Bcrypt
usersRouter.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await client.getUserByUsername({ username });

    const hashedPassword = user.password;

    if (!username || !password) {
      next({
        name: 'Missing Credentials Error',
        message: 'Please provide a valid username and password',
      });
    }
    bcrypt.compare(password, hashedPassword, function (err, passwordsMatch) {
      if (passwordsMatch) {
        const token = jwt.sign(
          { id: user.id, username: username },
          JWT_SECRET,
          { expiresIn: '2hr' }
        );

        // delete user.password;

        res.status(201).send({
          user: { username: user.username, id: user.id, admin: user.admin },
          token,
          message: 'succesful login',
        });
      } else {
        res.status(401).send({
          name: 'Incorrect Credentials Error',
          message: 'Username or password is incorrect',
        });
      }
    });
  } catch (error) {
    console.error(error.message);
  }
});

usersRouter.patch('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const { fields } = req.body;
  try {
    const updatedUser = await client.updateUser(userId, fields);
    res.status(201).send({
      updatedUser,
      message: 'Successfully updated user!',
    });
  } catch (error) {
    throw error;
  }
})

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = usersRouter;
