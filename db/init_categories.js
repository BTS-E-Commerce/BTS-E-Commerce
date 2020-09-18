//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const {
  getAllCategories,
  createCategories,
  getCategoryById,
  deleteCategory,
} = require('./index');

// -- Client --
const { client } = require('./client');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~
//* Initializes the starting/default categories.
async function initializeCategories() {
  try {
    // const categories = await createCategories([
    //   'baked',
    //   'oven',
    //   'crunchy',
    //   'cheesy',
    //   'cheddar',
    //   'vegan',
    //   'special',
    //   'cheese',
    // ]);
    // console.log(categories);
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
    // console.log('Testing getCategoryById');
    // const categoryById = await getCategoryById(allCategories[0].id);
    // console.log('Sucessfully tested getCategorybyId: ', categoryById);

    //# Verified this works, commenting out keep categories for now.
    // console.log('Testing deleteCategory...');
    // await deleteCategory(8);
    // console.log('Remaining Routines: ', await getAllCategories());
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
