//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const {
  getAllCategories,
  createCategories,
  getCategoryById,
} = require('./index');

// -- Client --
const { client } = require('./client');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~
//* Initializes the starting/default categories.
async function initializeCategories() {
  try {
    const categories = await createCategories([
      'Gouda',
      'Brie',
      'Cheddar',
      'Monterey Jack',
      'Mozzarella',
    ]);
    console.log(categories);
  } catch (error) {
    console.log(error);
  }
}

//# Tests the functions associated with the categories table.
async function testCategoryFunctions() {
  try {
    console.log('Testing getAllCategories...');
    const allCategories = await getAllCategories();
    console.log('Successfully ran getAllCategories: \n', allCategories);

    console.log('Testing getCategoryById');
    const categoryById = await getCategoryById(allCategories[0].id);
    console.log('Sucessfully tested getCategorybyId: ', categoryById);
  } catch (error) {}
}
//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
  initializeCategories,
  testCategoryFunctions,
};
