//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const { getAllCategories, createCategories } = require('./index');

// -- Client --
const { client } = require('./client');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~
//* Initializes the starting/default categories.
async function initializeCategories() {
    try {
        const categories = await createCategories([
            '#apples',
            '#bananas',
            '#blueberries',
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
    } catch (error) { }
}
//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
    initializeCategories,
    testCategoryFunctions
};