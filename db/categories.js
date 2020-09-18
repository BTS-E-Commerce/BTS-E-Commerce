//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const { client } = require('./client');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~

//-- Get Functions --
//# Gets all categories from exotic-db.
async function getAllCategories() {
  try {
    const { rows: categories } = await client.query(
      `
      SELECT *
      FROM categories
      `
    );

    return categories;
  } catch (error) {
    throw error;
  }
}

//# Gets all categories by id.
async function getCategoryById(id) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
      SELECT *
      FROM categories
      WHERE id=$1
      `,
      [id]
    );

    return link;
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
    .join('), (');

  const valuesStringSelect = categoryList
    .map((_, index) => `$${index + 1}`)
    .join(', ');

  //# For some reason it does not like this line of code below
  //#  ON CONFLICT (name) DO NOTHING;
  try {
    await client.query(
      `
      INSERT INTO categories(name)
      VALUES (${valuesStringInsert})
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
  getCategoryById,
  createCategories,
};
