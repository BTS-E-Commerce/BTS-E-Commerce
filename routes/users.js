//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const client = require('../db');
const usersRouter = require('express').Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

usersRouter.use(morgan('dev'));
usersRouter.use(bodyParser.json());
const jwtKey = 'my_secret_key';

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

      const token = jwt.sign({ id: newUser.id, username }, jwtKey, {
        expiresIn: '72h',
      });

      res.status(201);
      //# Will not send back newUser or token. Leaving it
      //# to help with testing for now
      res.send({
        newUser,
        token,
        message: 'Thank you for signing up!',
      });
    });
  } catch (error) {
    console.log(error);
  }
});

//* Logs in a user from the login form using JWT and Bcrypt
// usersRouter.post('/login'),
//   async (req, res, next) => {
//     const { username } = req.body;
//     //# checks need to happen here
//     console.log(req.body);
//     try {
//       const user = await client.getUserByUsername(req.body.username);
//       res.send({
//         message: 'succesful login',
//         user,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = usersRouter;
