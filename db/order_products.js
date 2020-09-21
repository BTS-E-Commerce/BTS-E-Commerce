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

//* Used for adding multiple products to an order.
async function addProductsToOrderProducts(orderId, productList) {
    try {
        await Promise.all(productList.map(product =>
            createOrderProducts(orderId, product.id, product.quantity, product.currentPrice))
        );
    } catch (error) {
        throw error;
    }
}

//* Used for deleting a single product from an order.
async function deleteOrderProduct(orderId, productId) {
    try {

        const { rows: product } = await client.query(`
            DELETE
            FROM order_products
            WHERE "orderId"=$1
            AND "productId"=$2;
        `, [orderId, productId]);

        return product;
    } catch (error) {
        throw error;
    }
}

//* Updates a single product from an order given the fields passed.
async function updateOrderProduct({ orderId, productId, fields = {} }) {
    try {
        const setString = Object.keys(fields).map(
            (key, index) => `"${key}"=$${index + 1}`
        ).join(', ');

        const { rows } = await client.query(`
        UPDATE order_products
        SET ${setString}
        WHERE "orderId"=${orderId} 
        AND "productId"=${productId}
        RETURNING *;
        `, Object.values(fields));

        return rows;
    } catch (error) {

    }
}

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
    addProductsToOrderProducts,
    deleteOrderProduct,
    updateOrderProduct
};