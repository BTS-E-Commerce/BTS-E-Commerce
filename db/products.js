//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const { client } = require('./client');
const { createCategories, getCategoryByName } = require('./categories');
const { addCategoriesToProduct } = require('./product_categories');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~

//-- Get Functions --

//# Get All Products

async function getAllProducts() {
  try {
    const { rows: productIds } = await client.query(`
        SELECT id
        FROM products;
        `);

    const products = await Promise.all(
      productIds.map((product) => getProductById(product.id))
    );

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
    if (categories.length > 0) {
      product.categories = categories;
    } else {
      const noneCategory = await getCategoryByName({ name: 'none' });
      product.categories = noneCategory;
    }


    const { rows: reviews } = await client.query(
      `
      SELECT *
      FROM reviews
      WHERE "productId"=$1;
    `,
      [id]
    );

    product.reviews = reviews;

    return product;
  } catch (error) {
    throw error;
  }
}

//# Get Product By Name
async function getProductByName({ name }) {
  try {
    const { rows: productsList } = await client.query(
      `
        SELECT products.*
        FROM products
        WHERE name=$1;
        `,
      [name]
    );

    const products = await Promise.all(
      productsList.map((product) => getProductById(product.id))
    );

    return products;
  } catch (error) {
    throw error;
  }
}

//# Get Products By Sale
async function getProductsBySale() {
  try {
    const { rows: productsList } = await client.query(`
        SELECT products.*
        FROM products
        WHERE sale=true;`);

    const products = await Promise.all(
      productsList.map((product) => getProductById(product.id))
    );

    return products;
  } catch (error) {
    throw error;
  }
}

//# Create Product
async function createProduct(
  { name, description, image, inventory, basePrice, currentPrice, sale },
  categories
) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
  INSERT INTO products(name, description, image, inventory, "basePrice", "currentPrice", sale)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  ON CONFLICT (name) DO NOTHING
  RETURNING *;
  `,
      [name, description, image, inventory, basePrice, currentPrice, sale]
    );

    await addCategoriesToProduct(product.id, categories);

    const newProduct = await getProductById(product.id);

    return newProduct;
  } catch (error) {
    throw error;
  }
}

//# Update Product
async function updateProduct(productId, fields = {}) {
  const { categories } = fields;
  delete fields.categories;

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  try {
    if (setString.length > 0) {
      const test = await client.query(
        `
        UPDATE products
        SET ${setString}
        WHERE id=${productId}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }

    if (categories === undefined) {
      return await getProductById(productId);
    }

    const categoryListIdString = categories
      .map((category) => `${category.id}`)
      .join(', ');

    await client.query(
      `
      DELETE FROM product_categories
      WHERE "categoryId"
      NOT IN (${categoryListIdString})
      AND "productId"=$1;
    `,
      [productId]
    );

    // and create post_tags as necessary
    await addCategoriesToProduct(productId, categories);

    const finalProduct = await getProductById(productId);
    return finalProduct;
  } catch (error) {
    throw error;
  }
}

// # Delete Product
async function deleteProduct(id) {
  try {
    await client.query(
      `
    DELETE FROM order_products
    WHERE "productId"=$1;
    `,
      [id]
    );

    await client.query(
      `
    DELETE FROM product_categories
    WHERE "productId"=$1;
    `,
      [id]
    );

    await client.query(
      `
    DELETE FROM reviews
    WHERE "productId"=$1;
    `,
      [id]
    );

    await client.query(
      `
    DELETE FROM products
    WHERE id=$1;
    `,
      [id]
    );

    return `Deleted Product: ${id}`;
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
  updateProduct,
  deleteProduct,
};
