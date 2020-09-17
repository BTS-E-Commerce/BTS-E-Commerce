//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

// -- Client --
const { client } = require("./client");
const { getAllUsers } = require("./index");
const { createUser } = require("./users");
const {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByName,
  getProductsBySale,
} = require("./products");

const { getAllCategories, createCategories } = require('./categories');
//-- Database Imports --

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~

//-- Main Function --
initializeTables()
  .then(initializeData)
  .then(testDatabase)
  .catch(console.error)
  .finally(() => client.end());

// -- Initialize Database --
//* Initializes tables by dropping and then building. Must happen before data initialization.
async function initializeTables() {
  try {
    client.connect();

    await dropTables();

    await buildTables();
  } catch (error) {
    throw error;
  }
}

//* Drops tables in order of dependencies. Must be used before building tables again.
async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS product_categories;
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS categories;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.log("Error dropping tables.");
    throw error;
  }
}

//* Builds tables to construct database. Must happen after dropping the tables.
async function buildTables() {
  try {
    console.log("Starting to build tables...");
    //# Should we split these up? This is a really long function, but we won't be doing this anywhere else, so maybe it's okay?

    //# Create users table.
    console.log("Starting to create users tables...");
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        admin BOOLEAN DEFAULT false
      );
    `);
    console.log("Sucessfully finished building users table!");

    //# Create products table.
    console.log("Starting to create products tables...");
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        image TEXT,
        inventory INTEGER NOT NULL DEFAULT 0,
        "basePrice" INTEGER NOT NULL,
        "currentPrice" INTEGER NOT NULL,
        sale BOOLEAN DEFAULT false,
        date DATE DEFAULT now()
      );
    `);
    console.log("Sucessfully finished building products table!");

    //# Create categories table.
    console.log("Starting to create categories tables...");
    await client.query(`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `);
    console.log("Sucessfully finished building categories table!");

    //# Create product_categories table. Used for linking a product with the categories associated with it.
    console.log("Starting to create product_categories tables...");
    await client.query(`
      CREATE TABLE product_categories (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "categoryId" INTEGER REFERENCES categories(id),
        UNIQUE ("productId", "categoryId")
      );
    `);
    console.log("Sucessfully finished building categories table!");

    //# Create orders table.
    console.log("Starting to create orders tables...");
    await client.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "orderPrice" INTEGER NOT NULL
      );
    `);
    console.log("Sucessfully finished building orders table!");

    //# Create order_products table. Used for linking a users order with the products inside of the order.
    console.log("Starting to create order_products tables...");
    await client.query(`
      CREATE TABLE order_products (
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES orders(id),
        "productId" INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        price INTEGER NOT NULL,
        UNIQUE ("orderId", "productId")
      );
    `);
    console.log("Sucessfully finished building order_products table!");

    //# Create reviews table.
    console.log("Starting to create reviews tables...");
    await client.query(`
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "userId" INTEGER REFERENCES users(id),
        content TEXT NOT NULL,
        rating INTEGER NOT NULL,
        date DATE DEFAULT now(),
        UNIQUE ("productId", "userId")
      );
    `);
    console.log("Sucessfully finished building reviews table!");

    console.log("Sucessfully finished building tables!");
  } catch (error) {
    console.log("Error building tables.");
    throw error;
  }
}

//* Initializes the starting/default data for the tables. Must happen after initializing the tables.
async function initializeData() {
  try {
    await initializeUsers();
    await initializeProducts();
    await initializeCategories();
    await initializeOrders();
    await initializeReviews();
  } catch (error) {
    throw error;
  }
}

//* Initializes the starting/default users.
async function initializeUsers() {
  try {
    const userOne = await createUser({
      username: "brody",
      password: "password",
    });
    console.log(userOne);
  } catch (error) {}
}

//* Initializes the starting/default products. This may pull from some sort of api??
async function initializeProducts() {
  try {

  } catch (error) {}
    console.log("Creating initial products...");
    await createProduct({
      name: "Baked Mac N Cheese",
      description: "Grammys special Thanksgiving Baked Mac N Cheese",
      image:
        "https://www.recipetineats.com/wp-content/uploads/2018/05/Baked-Mac-and-Cheese_2.jpg",
      inventory: "10",
      basePrice: "7",
      currentPrice: "5",
      sale: true,
      date: "09/15/20",
    });

    await createProduct({
      name: "Mac N Cheese Breadsticks",
      description:
        "It's not an official movie night at Grammys without the Mac Sticks!",
      image:
        "https://img.buzzfeed.com/video-api-prod/assets/5643fc670b714aefadf31991ed2f0f2f/BFV11184_MacnCheeseBreadsticks-Thumb1080SQ.jpg?resize=300:*&output-format=webp&output-quality=auto",
      inventory: "20",
      basePrice: "5",
      currentPrice: "3",
      sale: true,
      date: "09/17/20",
    });

    await createProduct({
      name: "Vegan Mac N Cheese",
      description: "Grammys special Mac for Auntie Sarah",
      image:
        "https://img.buzzfeed.com/video-api-prod/assets/d9fd07cb667d47288c03a873c76a3445/FB_1.jpg?resize=300:*&output-format=webp&output-quality=auto",
      inventory: "5",
      basePrice: "10",
      currentPrice: "10",
      sale: false,
      date: "09/10/2020",
    });

    console.log("Finished making products...");
  } catch (error) {
    console.log("Error creating initial products...");
    throw error;
  }
}

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
  } catch (error) {}
}

//* Initializes the starting/default orders.
async function initializeOrders() {
  try {
  } catch (error) {}
}

//* Initializes the starting/default reviews.
async function initializeReviews() {
  try {
  } catch (error) {}
}

// -- Database Function Testing --
//# Tests all functions associated with the database.
async function testDatabase() {
  try {
    console.log('Running tests of database functions...');

    await testUserFunctions();

    await testCategoryFunctions();

    await testProductFunctions();


    console.log('Successfully finished running tests of database functions!');
  } catch (error) {
    console.log('Error testing database functions.');
    throw error;
  }
}

//# Tests the functions associated with the users table.
async function testUserFunctions() {
  try {
    console.log("Testing getAllUsers...");
    const allUsers = await getAllUsers();
    console.log("Successfully ran getAllUsers:", allUsers);
  } catch (error) {
    throw error;
  }
}

//# Tests the functions associated with the categories table.
async function testCategoryFunctions() {
  try {
    console.log('Testing getAllCategories...');
    const allCategories = await getAllCategories();
    console.log('Successfully ran getAllCategories: \n', allCategories);
  } catch (error) {

//# Tests the functions for the products table.
async function testProductFunctions() {
  try {
    console.log("Products Table Testing:");

    console.log("Testing getAllProducts...");
    const products = await getAllProducts();
    console.log("Successfully tested getAllProducts:", products);

    console.log("Testing getProductsById using product:", products[1].id);
    const productById = await getProductById(products[1].id);
    console.log("Successfully tested getProdctsById:", productById);

    console.log("Testing getProductByName using product:", products[2].id);
    const productByName = await getProductByName({
      name: "Vegan Mac N Cheese",
    });
    console.log("Successfully tested getProductByName:", productByName);

    console.log("Testing getProductsBySale...");
    const productsBySale = await getProductsBySale();
    console.log("Successfully tested getProductsBySale:", productsBySale);

    console.log("Products Table Testing Completed!");
  } catch (error) {
    console.log("Error running tests on products...");
    throw error;
  }
}
