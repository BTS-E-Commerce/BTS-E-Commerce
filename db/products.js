//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const {
  client,
  // other db methods
} = require('./client');
const { createCategories } = require('./categories');
const { addCategoriesToProduct } = require('./product_categories');

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

//# Get Product By Id

async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT products.*
        FROM products
        WHERE id=$1;
        `,
      [id]
    );

    const { rows: categories } = await client.query(
      `
      SELECT categories.*
      FROM categories
      JOIN product_categories ON categories.id=product_categories."categoryId"
      WHERE product_categories."productId"=$1;
      `,
      [id]
    );

    product.categories = categories;

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
  categories = [],
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
  INSERT INTO products(name, description, image, inventory, "basePrice", "currentPrice", sale, date)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  ON CONFLICT (name) DO NOTHING
  RETURNING *;
  `,
      [name, description, image, inventory, basePrice, currentPrice, sale, date]
    );

    //May nto need in future
    const categoryList = await createCategories(categories);

    if (categoryList) {
      await addCategoriesToProduct(product.id, categoryList);
    }

    const newProduct = await getProductById(product.id);

    return newProduct;
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
