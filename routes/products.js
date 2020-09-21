//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const client = require('../db');
const productsRouter = require('express').Router();

//~~~~~~~~~~~~~~~~~~~
//~~~ MIDDLEWARE ~~~~
//~~~~~~~~~~~~~~~~~~~
// -- GET Routes --
//* Get All Users
productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await client.getAllProducts();
        res.status(201);
        res.send({
            products
        })
    } catch (error) {
        next(error);
    }
});


productsRouter.delete('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
        await client.deleteProduct(productId)
    } catch (error) {
        throw error;
    }
})

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = productsRouter;