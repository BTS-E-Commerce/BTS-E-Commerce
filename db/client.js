//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

// -- Client --
//*** Connect to DB
const { Client } = require('pg');

//*** Tentative name for database. We can change later if we want. Just have to create a new db then link it.
const DB_NAME = 'gran-mac-db'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
    client
}