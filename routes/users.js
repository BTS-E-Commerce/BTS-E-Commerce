//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const client = require('../db');
const usersRouter = require('express').Router();
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
    console.log(userCheck);
    if (userCheck) {
      res.status(402).send({
        name: 'User Already Exists Error',
        message: 'Username already exists',
      });
    }

    let securePassword;

    bcrypt.hash(password, SALT_COUNT, async (err, hashedPassword) => {
      securePassword = hashedPassword;
      console.log('securePassword HERE:', securePassword);
      const newUser = await client.createUser({
        username,
        password: securePassword,
      });

      console.log(newUser);

      const token = jwt.sign(
        { id: newUser.id, username },
        process.env.JWT_SECRET,
        {
          expiresIn: '2hr',
        }
      );

      //# Will not send back newUser or token.
      //# Leaving it to help with testing for now
      res.status(201).send({
        newUser,
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
      console.log(passwordsMatch);
      if (passwordsMatch) {
        const token = jwt.sign(
          { id: user.id, username: username },
          JWT_SECRET,
          { expiresIn: '2hr' }
        );

        res.status(201).send({
          message: 'succesful login',
          user,
          token,
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

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = usersRouter;
