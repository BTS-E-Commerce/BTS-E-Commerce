//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const { client } = require('./client');
const { getProductById } = require('./products');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~

//-- Create Functions --
//# Inserts the product id and an array of categories into product_categories
async function createProductCategory(productId, categoryId) {
  try {
    await client.query(
      `
    INSERT INTO product_categories("productId", "categoryId")
    VALUES ($1, $2)
    ON CONFLICT ("productId", "categoryId") DO NOTHING;
    `,
      [productId, categoryId]
    );
  } catch (error) {
    throw error;
  }
}

//# addCategoriesToProducts
async function addCategoriesToProducts(productId, categoryList) {
  try {
    await Promise.all(
      categoryList.map((category) =>
        createProductCategory(productId, category.id)
      )
    );

    console.log('productId: ', productId);
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
