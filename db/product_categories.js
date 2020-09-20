//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const { client } = require('./client');

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
async function addCategoriesToProduct(productId, categoryList) {
  try {
    await Promise.all(
      categoryList.map((category) =>
        createProductCategory(productId, category.id)
      )
    );
  } catch (error) {
    throw error;
  }
}

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
  createProductCategory,
  addCategoriesToProduct,
};
