# STYLE GUIDE

## JS Norms:
1. Always use semicolons after the end of a code block./Do not use a semicolon at the end of a code block.
2. Decide upon naming conventions for primary functions (IE. Create, Update/Patch, Delete, Get, Post, etc.)
3. Decide upon Code Organizaiton sections naming conventions.
4. Decide upon using ' or " for strings.



## Code Organization:
(See db/index.js for live example of formatting.)

1.  //~~~~~~~~~~~~~~~~~~~
    //~~~ MAJOR TOPIC ~~~
    //~~~~~~~~~~~~~~~~~~~

2.  //--- Minor Topic ---

3.  //*** Function Explination

4.  //# In-Function Explination

#### Code Organization Example:
//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

// -- Client --
//*** Makes Client object avaliable from 'express' library.
const { Client } = require('express');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~

//-- POST Requests --

userRouter.get('/', async (req, res, next) => {
    try {
        //# Gets all users from the database to pass as part of the response.
        const users = await getAllUsers();

        res.send({
            users
        })
    } catch (error){
        next(error);
    }
});


