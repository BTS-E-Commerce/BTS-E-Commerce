//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const client = require('../db');
const apiRouter = require('express').Router();

const usersRouter = require('./users');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const ordersRouter = require('./orders');
//~~~~~~~~~~~~~~~~~~~
//~~~ MIDDLEWARE ~~~~
//~~~~~~~~~~~~~~~~~~~

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.use('/users', usersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/orders', ordersRouter);

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = apiRouter;
