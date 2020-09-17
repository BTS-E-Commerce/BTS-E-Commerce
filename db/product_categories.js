//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const { client } = require('./index.js');
const { getProductById } = require('./products.js');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~

//-- Create Functions --
//# Inserts the product id and an array of categories into product_categories
async function createProductCategory(productId, [categories]) {
  try {
    await client.query(
      `
    INSERT INTO product_categories("productId", "categoryId")
    VALUES ($1, $2)
    ON CONFLICT ("productId", "categoryId") DO NOTHING;
    `,
      [productId, categories]
    );
  } catch (error) {
    throw error;
  }
}

//# addCategoriesToProducts
async function addCategoriesToProducts(productId, categoryId) {
  try {
    const products = await Promise.all(
      categoryArray.map((category) =>
        createProductCategory(productId, category.id)
      )
    );

    return await getProductById(productId);
  } catch (error) {
    throw error;
  }
}

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
  createProductCategory,
  addCategoriesToProducts,
};
