//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const { createUser, getAllUsers } = require('./index');
// -- Client --
const { client } = require('./client');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~
//* Initializes the starting/default users.
async function initializeUsers() {
    try {
        const userOne = await createUser({
            username: 'brody',
            password: 'password',
        });
        console.log(userOne);
    } catch (error) { }
}

async function testUserFunctions() {
    try {
        console.log('Testing getAllUsers...');
        const allUsers = await getAllUsers();
        console.log('Successfully ran getAllUsers:', allUsers);
    } catch (error) {
        throw error;
    }
}
//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
    initializeUsers,
    testUserFunctions
};