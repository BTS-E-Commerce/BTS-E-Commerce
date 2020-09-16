//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

const { client } = require("./index.js");

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~

//-- Get Functions --
//# Gets all categories from exotic-db
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

//-- Create Functions
//# Creates a new category
async function createCategories(categoryList) {
  if (categoryList.length === 0) {
    return;
  }
  const valuesStringInsert = categoryList
    .map((_, index) => `$${index + 1}`)
    .join("), (");

  const valuesStringSelect = categoryList
    .map((_, index) => `$${index + 1}`)
    .join(", ");

  try {
    await client.query(
      `
    INSERT INTO categories(name)
    VALUES (${valuesStringInsert})
    ON CONFLICT (name) DO NOTHING;
    `,
      categoryList
    );

    const { rows } = await client.query(
      `
    SELECT * FROM categories
    WHERE name
    IN (${valuesStringSelect})
    
    `,
      categoryList
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
  getAllCategories,
  createCategories,
};