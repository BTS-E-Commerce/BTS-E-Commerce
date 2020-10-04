//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const client = require('../db');
const categoriesRouter = require('express').Router();

//~~~~~~~~~~~~~~~~~~~
//~~~ MIDDLEWARE ~~~~
//~~~~~~~~~~~~~~~~~~~

// -- GET Routes --
//# Gets All Categories
categoriesRouter.get('/', async (req, res, next) => {
  try {
    const categories = await client.getAllCategories();
    res.status(201);
    res.send({
      categories,
    });
  } catch (error) {
    next(error);
  }
});

categoriesRouter.post('/', async (req, res, next) => {
  const { newCategory } = req.body;
  // does this category exist? getCategoryByName
  try {
    const [category] = await client.createCategories([newCategory]);
    console.log(category);
    res.status(201).send(category);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.delete('/:categoryId', async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    await client.deleteCategory(categoryId);
    res.status(200).send({ name: 'Success', message: 'Category was deleted.' });
  } catch (error) {
    throw error;
  }
});

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = categoriesRouter;
