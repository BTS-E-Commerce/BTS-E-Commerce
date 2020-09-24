//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const client = require('../db');
const ordersRouter = require('express').Router();

//~~~~~~~~~~~~~~~~~~~
//~~~ MIDDLEWARE ~~~~
//~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

ordersRouter.get('/', async (req, res, next) => {
  try {
    console.log('Cheesenips');
    const orders = await client.getAllOrders();
    res.status(201);
    res.send({ orders });
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
