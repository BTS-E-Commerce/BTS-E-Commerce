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

productsRouter.post('/', async (req, res, next) => {
    console.log(req.body);
    const { name, description, imageUrl, inventory, price, sale } = req.body.product;
    const categories = req.body.categories;

    //Checks to make:
    //Check for alreayd exisiting product.
    //Check for invalid entires.
    //Check for failure to cretae.
    //Check for invalid user type (not admin).

    // //build product object for database input
    let newProduct = {};
    newProduct.name = name;
    newProduct.description = description;
    newProduct.image = imageUrl;
    newProduct.inventory = inventory;
    newProduct.basePrice = price;
    newProduct.currentPrice = price;
    newProduct.sale = sale;

    try {
        product = await client.createProduct(newProduct, categories);
        res.status(201);
        res.send({
            product
        });
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