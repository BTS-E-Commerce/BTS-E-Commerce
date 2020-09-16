const { client } = require("./index.js");

async function getAllCategories() {
  try {
    const { rows: categories } = await client.query(`
        SELECT *
        FROM categories
        `);

    return categories;
  } catch (error) {
    throw error;
  }
}
