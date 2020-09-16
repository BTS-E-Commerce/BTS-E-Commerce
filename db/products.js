//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const {
  client,
  // other db methods
} = require("./index");

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~

//-- Get Functions --

//# Get All Products

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
        SELECT *
        FROM users;
        `);

    return products;
  } catch {
    throw error;
  }
}

//# Get Product By ID

async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT products.*
        FROM products
        WHERE id=$1
        `,
      [id]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

//# Get Product By Name
async function getProductByName({ name }) {
  try {
    const { rows: products } = await client.query(
      `
        SELECT products.*
        FROM products
        WHERE name=$1
        `,
      [name]
    );

    return products;
  } catch (error) {
    throw error;
  }
}

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
};
