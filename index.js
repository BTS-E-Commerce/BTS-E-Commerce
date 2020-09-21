//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
// This is the Web Server
const express = require('express');
const server = express();

const morgan = require('morgan');

const bodyParser = require('body-parser');

const path = require('path');

const apiRouter = require('./routes');

// bring in the DB connection
const { client } = require('./db');

//~~~~~~~~~~~~~~~~~~~
//~~~~ VARIABLES ~~~~
//~~~~~~~~~~~~~~~~~~~
const PORT = process.env.PORT || 5000;

//~~~~~~~~~~~~~~~~~~~
//~~~ MIDDLEWARE ~~~~
//~~~~~~~~~~~~~~~~~~~

// create logs for everything
server.use(morgan('dev'));

// handle application/json requests
server.use(bodyParser.json());

// here's our static files
server.use(express.static(path.join(__dirname, 'build')));

// here's our API
server.use('/api', apiRouter);

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

// connect to the server
server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~