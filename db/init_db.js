//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

// -- Client --
const {
  client
  // other db methods 
} = require('./index');

//-- Database Imports --


//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~

//-- Main Function --
initializeTables()
  .then(initializeData)
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

  } catch (error) {

  }
}

//* Builds tables to construct database. Must happen after dropping the tables.
async function buildTables() {
  try {

  } catch (error) {

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

}

//* Initializes the starting/default products. This may pull from some sort of api??
async function initializeProducts() {

}

//* Initializes the starting/default categories.
async function initializeCategories() {

}

//* Initializes the starting/default orders.
async function initializeOrders() {

}

//* Initializes the starting/default reviews.
async function initializeReviews() {

}