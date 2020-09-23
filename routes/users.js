//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const client = require('../db');
const usersRouter = require('express').Router();
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../db');

usersRouter.use(morgan('dev'));

const SALT_COUNT = 10;

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
//* Creates a user from the register form.
usersRouter.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    //# need to take a deeper look at this. Not working
    // const userCheck = await getUserByUsername({ username });

    // if (userCheck) {
    //   next({
    //     name: 'UserAlreadyExistsError',
    //     message: 'Username already exists',
    //   });
    // }

    let securePassword;

    bcrypt.hash(password, SALT_COUNT, async (err, hashedPassword) => {
      securePassword = hashedPassword;
      console.log('securePassword HERE:', securePassword);
      const newUser = await client.createUser({
        username,
        password: securePassword,
      });
      res.status(201);
      res.send({
        newUser,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = usersRouter;
