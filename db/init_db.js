//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

// -- Client --
const { client } = require('./client');

//For some reason this doesn't work but I'm keeping itanywa to troubleshoot later
// const { initializeUsers,
//   testUserFunctions,
//   initializeProducts,
//   testProductFunctions,
//   initializeCategories,
//   testCategoryFunctions,
//   initializeOrders,
//   initializeReviews } = require('./index')

const { initializeUsers, testUserFunctions } = require('./init_users');
const { initializeProducts, testProductFunctions } = require('./init_products');
const { initializeCategories, testCategoryFunctions } = require('./init_categories');
const { initializeOrders } = require('./init_orders');
const { initializeReviews } = require('./init_reviews');

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
    console.log('Starting to drop tables...');

    await client.query(`
      DROP TABLE IF EXISTS product_categories;
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS categories;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);

    console.log('Finished dropping tables!');
  } catch (error) {
    console.log('Error dropping tables.');
    throw error;
  }
}

//* Builds tables to construct database. Must happen after dropping the tables.
async function buildTables() {
  try {
    console.log('Starting to build tables...');
    //# Should we split these up? This is a really long function, but we won't be doing this anywhere else, so maybe it's okay?

    //# Create users table.
    console.log('Starting to create users tables...');
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        admin BOOLEAN DEFAULT false
      );
    `);
    console.log('Sucessfully finished building users table!');

    //# Create products table.
    console.log('Starting to create products tables...');
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
    console.log('Sucessfully finished building products table!');

    //# Create categories table.
    console.log('Starting to create categories tables...');
    await client.query(`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `);
    console.log('Sucessfully finished building categories table!');

    //# Create product_categories table. Used for linking a product with the categories associated with it.
    console.log('Starting to create product_categories tables...');
    await client.query(`
      CREATE TABLE product_categories (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "categoryId" INTEGER REFERENCES categories(id),
        UNIQUE ("productId", "categoryId")
      );
    `);
    console.log('Sucessfully finished building categories table!');

    //# Create orders table.
    console.log('Starting to create orders tables...');
    await client.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "orderPrice" INTEGER NOT NULL
      );
    `);
    console.log('Sucessfully finished building orders table!');

    //# Create order_products table. Used for linking a users order with the products inside of the order.
    console.log('Starting to create order_products tables...');
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
    console.log('Sucessfully finished building order_products table!');

    //# Create reviews table.
    console.log('Starting to create reviews tables...');
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
    console.log('Sucessfully finished building reviews table!');

    console.log('Sucessfully finished building tables!');
  } catch (error) {
    console.log('Error building tables.');
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
