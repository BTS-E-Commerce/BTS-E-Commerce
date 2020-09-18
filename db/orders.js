//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const { client } = require('./client');
// const { addProductToOrder, getProductById } = require('./index');
const { getProductById } = require('./products');
const { addProductToOrder } = require('./order_products')

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~
//* Gets all orders.
async function getAllOrders() {
    try {
        const { rows: orderIds } = await client.query(`
            SELECT id
            FROM orders;
        `);

        const orders = Promise.all(orderIds.map(
            order => getOrderById(order.id)
        ));

        return orders;
    } catch (error) {

    }
}

//*Gets an order by a passed id.
async function getOrderById(orderId) {
    try {
        const { rows: [order] } = await client.query(`
            SELECT *
            FROM orders
            WHERE id=$1;
        `, [orderId]);

        //# Used for adding all product data onto the order.
        const { rows: products } = await client.query(`
            SELECT products.*, order_products.quantity, order_products.price
            FROM products
            JOIN order_products ON products.id=order_products."productId"
            WHERE order_products."orderId"=$1;
        `, [orderId]);
        //I don't think we need all the info from products to display on orders. Only the below columns
        // products.name, products.image, products.sale,

        order.products = products;

        //# Used for adding the user data onto the order.
        const { rows: [user] } = await client.query(`
            SELECT id, username
            FROM users
            WHERE id=$1;
        `, [order.userId]);

        delete order.userId
        order.user = user;

        //# Used for calculating the sum of all products in an order.
        const { rows: [orderSum] } = await client.query(`
            SELECT SUM(price * quantity) AS "totalPrice"
            FROM order_products
            WHERE "orderId"=$1
            GROUP BY "orderId";
        `, [orderId]);

        order.totalPrice = orderSum.totalPrice;
        //TRAVIS' QUERY 
        // SELECT SUM(order_products.price), order.id 
        // FROM orders 
        // JOIN order_products ON order.id = order_products."orderId"
        // GROUP BY orders.id
        // WHERE order."userId" = $1;

        return order;
    } catch (error) {
        throw error;
    }
}
//*Gets all orders by username.

//*Gets all orders by product.

//* Creates a new order.
async function createOrder({ userId }, products = []) {
    try {
        //Make any checks here

        const { rows: [order] } = await client.query(`
            INSERT INTO orders("userId")
            VALUES($1)
            RETURNING *;
        `, [userId]);

        //Why doesn't promise.all work here?
        // const orderProducts = await Promise.all(products
        //     .map(product => {
        //         console.log('PRODUCT FROM FRONT END: ', product);
        //         const productData = getProductById(product.id)
        //         console.log('PRODUCT FROM DB: ', productData);
        //         productData.quantity = product.quantity;
        //         console.log('DONE ', productData);
        //     })
        // );

        //products looks like [{id: 1, quantity: 5}, {id: 5, quantity: 1}]
        //# Goes through the above passed product array and for each "product" in it grabs the data for it from the database
        //# and then proceeds to add the quantity from the product to the product database object. It is then pushed to a new arra.
        let orderProducts = [];
        for (const product of products) {
            const productData = await getProductById(product.id)

            productData.quantity = product.quantity;

            orderProducts.push(productData);
        }

        console.log('products on order: ', orderProducts);

        if (!orderProducts) {
            //error could not find product with that id
        }

        await addProductToOrder(order.id, orderProducts);

        const newOrder = await getOrderById(order.id);

        return newOrder;
    } catch (error) {
        throw error;
    }
}


//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
    getAllOrders,
    createOrder
}
