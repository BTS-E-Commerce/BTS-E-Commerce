//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const { createUser, getAllUsers, getUserByUsername, updateUser, deleteUser } = require('../index');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~
//* Initializes the starting/default users.
async function initializeUsers() {
  try {
    await createUser({
      username: 'guest',
      password: 'password',
      admin: false
    });

    await createUser({
      username: 'admin',
      password: 'adminpassword',
      admin: true
    });

    await createUser({
      username: 'updateMe',
      password: 'password',
      admin: true
    });

    await createUser({
      username: 'brody',
      password: 'password',
      admin: true
    });

    await createUser({
      username: 'sam',
      password: 'password',
      admin: true
    });

    await createUser({
      username: 'tyler',
      password: 'password',
      admin: true
    });

    await createUser({
      username: 'deleteMe',
      password: 'password'
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

    console.log('Testing updateUser...');
    const updatedUser = await updateUser(3, {
      username: 'newUsername',
      password: 'different',
      admin: false
    });
    console.log('Sucessfully ran updateUser: ', updatedUser);

    console.log('Testing deleteUser...');
    const deletedUser = await deleteUser(7);
    console.log('Sucessfully ran deleteUser: ', deletedUser);
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
