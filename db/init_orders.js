//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

// -- Client --
const { client } = require('./client');
const { getAllOrders, createOrder, getAllOrdersByUserId, updateAddProductToOrder, deleteProductFromOrder, deleteOrder, updateOrderProduct } = require('./index');
// const { createOrder } = require('./orders');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~
//* Initializes the starting/default orders.
async function initializeOrders() {
    try {
        const orderOne = await createOrder({ userId: 1 }, [{ id: 1, quantity: 2 }, { id: 3, quantity: 1 }]);
        console.log('Order: \n', orderOne)

        const orderTwo = await createOrder({ userId: 2 }, [{ id: 1, quantity: 1 }, { id: 2, quantity: 3 }]);
        console.log('INITIAL ORDER: \n', orderTwo)

        const orderThree = await createOrder({ userId: 3 }, [{ id: 2, quantity: 5 }, { id: 3, quantity: 2 }]);
        console.log('INITIAL ORDER: \n', orderThree)
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

        console.log('Testing updateAddProductToOrder...');
        const addedOrderProduct = await updateAddProductToOrder({ orderId: 1, products: [{ id: 2, quantity: 3, currentPrice: 5 }] });
        console.log('Successfully ran updateAddProductToOrder:', addedOrderProduct);

        console.log('Testing deleteProductFromOrder...');
        const deletedOrderProduct = await deleteProductFromOrder({ orderId: 1, productId: 2 });
        console.log('Successfully ran deleteProductFromOrder:', deletedOrderProduct);

        console.log('Testing deleteOrder...');
        await deleteOrder({ orderId: 1 });
        const afterDeleteOrder = await getAllOrders();
        console.log('Successfully ran deleteOrder:', afterDeleteOrder);

        console.log('Testing updateOrderProduct...');
        const updatedOrderProduct = await updateOrderProduct({ orderId: 2, productId: 1, fields: { quantity: 12, price: 100 } });
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
    testOrderFunctions
};