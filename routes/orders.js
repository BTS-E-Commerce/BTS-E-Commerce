//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const client = require('../db');
const ordersRouter = require('express').Router();

//~~~~~~~~~~~~~~~~~~~
//~~~ MIDDLEWARE ~~~~
//~~~~~~~~~~~~~~~~~~~
ordersRouter.get('/', async (req, res, next) => {
  try {
    const orders = await client.getAllOrders();
    res.status(201);
    res.send({ orders });
  } catch (error) {
    next(error);
  }
});

ordersRouter.post('/', async (req, res, next) => {
  const { orderId, products } = req.body;
  // Check for orderId exsistence
  try {
    const order = await client.createOrder(req.body);
    res.send({
      order
    })
  } catch (error) {
    next(error);
  }
})

ordersRouter.post('/:orderId', async (req, res, next) => {
  const { orderId, products, currentPrice } = req.body;
  // Check for orderId exsistence
  //check for product/productId exsisting
  try {
    const order = await client.addProductToOrder(req.body);
    res.send({
      order
    })
  } catch (error) {
    next(error);
  }
})

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

module.exports = ordersRouter;
