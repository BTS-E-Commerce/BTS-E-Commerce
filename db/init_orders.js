//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

// -- Client --
const { client } = require('./client');
const { getAllOrders, createOrder } = require('./index');
// const { createOrder } = require('./orders');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~
//* Initializes the starting/default orders.
async function initializeOrders() {
    try {
        console.log('INITIALIZING ORDERS')

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