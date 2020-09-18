//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const {
  client,
  // other db methods
} = require('./client');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~

//-- Get Functions --

//# Get All Products

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
        SELECT *
        FROM products;
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

//# Get Products By Sale

async function getProductsBySale() {
  try {
    const { rows: products } = await client.query(`
        SELECT products.*
        FROM products
        WHERE sale=true`);

    return products;
  } catch (error) {
    throw error;
  }
}

//# Create Product

async function createProduct({
  name,
  description,
  image,
  inventory,
  basePrice,
  currentPrice,
  sale,
  date,
}) {
  try {
    const { rows: product } = await client.query(
      `
  INSERT INTO products(name, description, image, inventory, "basePrice", "currentPrice", sale, date)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  ON CONFLICT (name) DO NOTHING
  RETURNING *;
  `,
      [name, description, image, inventory, basePrice, currentPrice, sale, date]
    );

    return product;
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
  getProductsBySale,
  createProduct,
};
