//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

const {
  getAllOrders,
  createOrder,
  getAllOrdersByUserId,
  getOrderIdByUserIdAndIsComplete,
  addProductToOrder,
  deleteProductFromOrder,
  deleteOrder,
  updateOrderProduct,
} = require('../index');
// const { createOrder } = require('./orders');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~
//* Initializes the starting/default orders.
async function initializeOrders() {
  try {
    await createOrder({
      userId: 2, products: [
        { id: 1, quantity: 2 },
        { id: 3, quantity: 1 },
      ]
    });

    await createOrder({
      userId: 2, products: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
        { id: 3, quantity: 1 }
      ]
    });

    await createOrder({
      userId: 3, products: [
        { id: 1, quantity: 2 },
        { id: 3, quantity: 1 },
      ]
    });

    await createOrder({
      userId: 2, products: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
      ]
    });
  } catch (error) {
    throw error;
  }
}

async function testOrderFunctions() {
  try {
    console.log('Testing getAllOrders...');
    const allOrders = await getAllOrders();
    console.log('Successfully ran getAllOrders:', allOrders);

    console.log('Testing getAllOrdersByUserId...');
    const allOrdersByUserId = await getAllOrdersByUserId({ id: 1 });
    console.log('Successfully ran getAllOrdersByUserId:', allOrdersByUserId);

    console.log('Testing getOrderIdByUserIdAndIsComplete');
    const userOrder = await getOrderIdByUserIdAndIsComplete({ id: 2 });
    console.log('Successfully ran getOrderIdByUserIdAndIsComplete', userOrder);

    console.log('Testing addProductToOrder...');
    const addedOrderProduct = await addProductToOrder({
      orderId: 1,
      products: [{ id: 2, quantity: 3, currentPrice: 5 }],
    });
    console.log('Successfully ran addProductToOrder:', addedOrderProduct);

    console.log('Testing deleteProductFromOrder...');
    const deletedOrderProduct = await deleteProductFromOrder({
      orderId: 1,
      productId: 2,
    });
    console.log(
      'Successfully ran deleteProductFromOrder:',
      deletedOrderProduct
    );

    console.log('Testing deleteOrder...');
    await deleteOrder({ orderId: 1 });
    const afterDeleteOrder = await getAllOrders();
    console.log('Successfully ran deleteOrder:', afterDeleteOrder);

    console.log('Testing updateOrderProduct...');
    const updatedOrderProduct = await updateOrderProduct({
      orderId: 2,
      productId: 1,
      fields: { quantity: 12, price: 100 },
    });
    console.log('Successfully ran updateOrderProduct:', updatedOrderProduct);
  } catch (error) {
    throw error;
  }
}
//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
  initializeOrders,
  testOrderFunctions,
};
