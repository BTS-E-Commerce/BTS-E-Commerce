//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const {
  getAllCategories,
  createCategories,
  getCategoryById,
  getCategoryByName,
  deleteCategory,
  updateCategory,
} = require('../index');

// -- Client --
const { client } = require('../client');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~
//* Initializes the starting/default categories.
async function initializeCategories() {
  try {
    const categories = await createCategories([
      'baked',
      'oven',
      'crunchy',
      'cheesy',
      'cheddar',
      'vegan',
      'special',
      'cheese',
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

    //# Verified this works, commenting out to reduce clutter for now.
    console.log('Testing getCategoryById');
    const categoryById = await getCategoryById(allCategories[0].id);
    console.log('Sucessfully tested getCategorybyId: ', categoryById);

    //# Verified this works, commenting out for now.
    console.log('Testing getCategoryByName');
    const categoryByName = await getCategoryByName({
      name: 'baked',
    });
    console.log('Sucessfully tested getCategorybyName: ', categoryByName);

    //# Verified this works, commenting out for now.
    console.log('Testing deleteCategory...');
    await deleteCategory(8);
    console.log('Remaining Routines: ', await getAllCategories());

    //# Verified this works, commenting out to de-clutter
    console.log('Testing updateCategory...');
    const oldCategory = await getCategoryById(allCategories[0].id);
    const newCategory = await updateCategory(allCategories[0].id, {
      name: 'fried',
    });
    console.log('old: ', oldCategory);
    console.log('new: ', newCategory);
    console.log('Sucessfully ran updateCategory...');
  } catch (error) {
    console.log(error);
  }
}
//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
  initializeCategories,
  testCategoryFunctions,
};
