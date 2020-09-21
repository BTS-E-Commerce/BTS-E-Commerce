//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const client = require('../db');
const categories = require('../db/categories');
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

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = categoriesRouter;
