//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const { client } = require('./client');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~
//* Associates an order with a product.
async function createOrderProducts(orderId, productId, quantity, price) {
    try {
        await client.query(`
            INSERT INTO order_products("orderId", "productId", quantity, price)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT ("orderId", "productId") DO NOTHING;
        `, [orderId, productId, quantity, price]);
    } catch (error) {
        throw error;
    }
}

async function addProductToOrder(orderId, productList) {
    try {
        await Promise.all(productList.map(product =>
            createOrderProducts(orderId, product.id, product.quantity, product.currentPrice))
        );
    } catch (error) {
        throw error;
    }
}

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
    addProductToOrder
};