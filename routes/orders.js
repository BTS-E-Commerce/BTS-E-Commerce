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
});

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
});

ordersRouter.patch('/:orderId', async (req, res, next) => {
  const { orderId } = req.params;
  const { fields } = req.body;
  //Check for order exsistence
  //check for fields
  try {
    const order = await client.updateOrder(orderId, fields);

    res.send({
      order
    })
  } catch (error) {

  }
})

ordersRouter.patch('/:orderId/:productId', async (req, res, next) => {
  const { orderId, productId } = req.params;
  const { fields } = req.body;

  //Check for order exsistence
  //check for fields
  try {
    const updatedOrderProduct = await client.updateOrderProduct({ orderId, productId, fields });
    res.send({
      updatedOrderProduct
    })
  } catch (error) {

  }
})

ordersRouter.delete('/:orderId', async (req, res, next) => {
  const { orderId } = req.params;
  console.log(req.params);
  try {
    const order = await client.deleteOrder({ orderId });

    console.log("RETURNING DELETED ORDER INFO", order);
    res.send({
      order
    })
  } catch (error) {
    next(error);
  }
});

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

module.exports = ordersRouter;
