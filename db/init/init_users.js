//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const { createUser, getAllUsers, getUserByUsername } = require('../index');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~
//* Initializes the starting/default users.
async function initializeUsers() {
  try {
    await createUser({
      username: 'guest',
      password: 'password',
    });
    await createUser({
      username: 'brody',
      password: 'password',
    });

    await createUser({
      username: 'sam',
      password: 'password',
    });

    await createUser({
      username: 'tyler',
      password: 'password',
    });
  } catch (error) {
    throw error;
  }
}

async function testUserFunctions() {
  try {
    console.log('Testing getAllUsers...');
    const allUsers = await getAllUsers();
    console.log('Successfully ran getAllUsers:', allUsers);

    console.log('Testing getUserByUsername...');
    const tyler = await getUserByUsername({
      username: 'tyler',
    });
    console.log('Sucessfully ran getUserByUsername: ', tyler);
  } catch (error) {
    throw error;
  }
}
//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
  initializeUsers,
  testUserFunctions,
};
