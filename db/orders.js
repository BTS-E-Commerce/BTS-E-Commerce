//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const { client } = require('./client');
const { getProductById } = require('./products');
const {
  addProductsToOrderProducts,
  deleteOrderProduct,
} = require('./order_products');

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

    const orders = Promise.all(orderIds.map((order) => getOrderById(order.id)));

    return orders;
  } catch (error) {
    throw error;
  }
}

//*Gets an order by a passed id.
async function getOrderById(orderId) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            SELECT *
            FROM orders
            WHERE id=$1;
        `,
      [orderId]
    );

    //# Used for adding all product data onto the order.
    const { rows: products } = await client.query(
      `
            SELECT products.*, order_products.quantity, order_products.price
            FROM products
            JOIN order_products ON products.id=order_products."productId"
            WHERE order_products."orderId"=$1;
        `,
      [orderId]
    );
    //I don't think we need all the info from products to display on orders. Only the below columns
    // products.name, products.image, products.sale,

    order.products = products;

    //# Used for adding the user data onto the order.
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT id, username
            FROM users
            WHERE id=$1;
        `,
      [order.userId]
    );

    delete order.userId;
    order.user = user;

    //# Used for calculating the sum of all products in an order.
    const {
      rows: [orderSum],
    } = await client.query(
      `
            SELECT SUM(price * quantity) AS "totalPrice"
            FROM order_products
            WHERE "orderId"=$1
            GROUP BY "orderId";
        `,
      [orderId]
    );

    order.totalPrice = orderSum.totalPrice;

    return order;
  } catch (error) {
    throw error;
  }
}
//*Gets all orders by a user id.
async function getAllOrdersByUserId({ id }) {
  try {
    const { rows: orderIds } = await client.query(
      `
            SELECT id
            FROM orders
            WHERE "userId"=$1;
        `,
      [id]
    );

    const orders = Promise.all(orderIds.map((order) => getOrderById(order.id)));

    return orders;
  } catch (error) {
    throw error;
  }
}

//* Creates a new order.
async function getOrderIdByUserIdAndIsComplete({ id }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT id
        FROM orders
        WHERE "userId"=$1 AND "isComplete"=false;
        `,
      [id]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

//* Creates a new order.
//products looks like [{id: 1, quantity: 5}, {id: 5, quantity: 1}]
async function createOrder({ userId }, products = []) {
  try {
    //Make any checks here

    const {
      rows: [order],
    } = await client.query(
      `
            INSERT INTO orders("userId")
            VALUES($1)
            RETURNING *;
        `,
      [userId]
    );

    //# Goes through the above passed product array and for each "product" in it grabs the data for it from the database
    //# and then proceeds to add the quantity from the product to the product database object. It is then pushed to a new array.
    let orderProducts = [];
    for (const product of products) {
      const productData = await getProductById(product.id);

      productData.quantity = product.quantity;

      orderProducts.push(productData);
    }

    if (!orderProducts) {
      //error could not find product with that id
    }

    await addProductsToOrderProducts(order.id, orderProducts);

    const newOrder = await getOrderById(order.id);

    return newOrder;
  } catch (error) {
    throw error;
  }
}

//* Updates an order with an added product.
async function addProductToOrder({ orderId, products = [] }) {
  try {
    await addProductsToOrderProducts(orderId, products);

    const newOrder = await getOrderById(orderId);

    return newOrder;
  } catch (error) {
    throw error;
  }
}

//* Deletes a product from an order.
async function deleteProductFromOrder({ orderId, productId }) {
  try {
    await deleteOrderProduct(orderId, productId);

    const newOrder = await getOrderById(orderId);

    return newOrder;
  } catch (error) {
    throw error;
  }
}

//* Deletes an entire order.
async function deleteOrder({ orderId }) {
  try {
    await client.query(
      `
            DELETE
            FROM order_products
            WHERE "orderId"=$1;
        `,
      [orderId]
    );

    const {
      rows: [order],
    } = await client.query(
      `
            DELETE
            FROM orders
            WHERE id=$1
            RETURNING *;
        `,
      [orderId]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
  getAllOrders,
  getAllOrdersByUserId,
  getOrderIdByUserIdAndIsComplete,
  createOrder,
  addProductToOrder,
  deleteProductFromOrder,
  deleteOrder,
};
