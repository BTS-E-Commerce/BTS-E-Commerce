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
      FROM categories;
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
      rows: [category],
    } = await client.query(
      `
      SELECT *
      FROM categories
      WHERE id=$1;
      `,
      [id]
    );

    return category;
  } catch (error) {
    throw error;
  }
}

//# Gets all categories by name.
async function getCategoryByName({ name }) {
  try {
    const { rows: category } = await client.query(
      `
      SELECT *
      FROM categories
      WHERE name=$1;
      `,
      [name]
    );

    return category;
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

  //# For some reason it does not like this line of code below
  //#  ON CONFLICT (name) DO NOTHING;
  try {
    const { rows } = await client.query(
      `
      INSERT INTO categories(name)
      VALUES (${valuesStringInsert})
      RETURNING *;
      `,
      categoryList
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

//# deletes a specfic category. Useful for admin to remove categories.
async function deleteCategory(id) {
  try {
    await client.query(
      `
      DELETE
      FROM product_categories
      WHERE "categoryId" = $1;
      `,
      [id]
    );

    const {
      rows: [category],
    } = await client.query(
      `
      DELETE
      FROM categories
      WHERE id = $1;
      `,
      [id]
    );

    return category;
  } catch (error) {
    throw error;
  }
}

//# Updates the name column in categories table.
async function updateCategory(id, fields = {}) {
  //* need to make a check to see if the name already exists.
  //* can get rid of the setString, the only key in categories is name

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [category],
    } = await client.query(
      `
      UPDATE categories
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
      `,
      Object.values(fields)
    );
    return category;
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
  getCategoryByName,
  createCategories,
  deleteCategory,
  updateCategory,
};
