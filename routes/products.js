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
    const { name, description, imageUrl, inventory, price, sale } = req.body.product;
    const categories = req.body.categories;

    //Checks to make:
    //Check for alreayd exisiting product.
    //Check for invalid entires.
    //Check for failure to cretae.
    //Check for invalid user type (not admin).

    //build product object for database input
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

productsRouter.patch('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const { fields } = req.body;


    if (fields.price) {
        fields.currentPrice = fields.price;
    }

    if (fields.price) {
        fields.image = fields.imageUrl;
    }

    delete fields.price;
    delete fields.imageUrl;


    try {
        const updatedProduct = await client.updateProduct(productId, fields);
        res.send({
            updatedProduct
        })
    } catch (error) {

    }
})


productsRouter.delete('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
        await client.deleteProduct(productId)
        res.status(200);
        res.send({
            name: "Success",
            message: "This was deleted."
        })
    } catch (error) {
        throw error;
    }
})

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = productsRouter;