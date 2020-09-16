# STYLE GUIDE

## JS Norms:
1. Always use semicolons after the end of a code block.
2. Function naming conventions for primary functions: Initialize, Create, Update, Delete, Get, Post.
3. ALways use single quotes ('') unless it isn't syntactically correct to do so.
5. Always use tabs to indent lines.



## Code Organization:
(See db/index.js for live example of formatting.)

1.  //~~~~~~~~~~~~~~~~~~~
    //~~~ MAJOR TOPIC ~~~
    //~~~~~~~~~~~~~~~~~~~
        Imports, Functions, Middleware, Global Variables, Exports

2.  //--- Minor Topic ---
        A subset of the major topic if grouping within it is relevant.

3.  //* Function Explination
        Every function should have an explination. This should state how this is used, not what it does. 

4.  //# In-Function Explination
        Anything that needs to be clarified within a function/code block.

#### Code Organization Example:
//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

// -- Client --
//* Makes Client object avaliable from 'express' library.
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


