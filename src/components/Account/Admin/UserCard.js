//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useState } from 'react';

import { EditUserForm } from './index';

const UserCard = ({
  user,
  changeUser,
  users,
  setUsers,
  currentUser,
  setCurrentUser,
  setOngoingOrder,
  onDeleteUser,
}) => {
  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ STATE ~~~~~~
  //~~~~~~~~~~~~~~~~~~~
  const [editFormStatus, setEditFormStatus] = useState(false);
  //~~~~~~~~~~~~~~~~~~~
  //~~~~~ EFFECTS ~~~~~
  //~~~~~~~~~~~~~~~~~~~

  //~~~~~~~~~~~~~~~~~~~
  //~~~~ FUNCTIONS ~~~~
  //~~~~~~~~~~~~~~~~~~~
  const showEditFrom = () => {
    setEditFormStatus(!editFormStatus);
  };

  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ JSX ~~~~~~~~
  //~~~~~~~~~~~~~~~~~~~
  return (
    <div class='cardDemensions'>
      <h1>User Card</h1>
      <div className='userCardHeader'>
        <span>
          <h3>Username: </h3>
          <p>{user.username}</p>
        </span>
        <span>
          <h3>User Id: </h3>
          <p>{user.id}</p>
        </span>
      </div>
      <span>
        <h3>Password: </h3>
        <p>{user.password}</p>
      </span>
      <span>
        <h3>Admin: </h3>
        <p>
          {user.admin === true ? 'User is an admin.' : 'User is NOT an admin.'}
        </p>
      </span>
      <div className='cardButtons'>
        <button onClick={changeUser} style={{ width: 'fit-content' }}>
          Log in as {user.username}
        </button>
        <button onClick={showEditFrom} style={{ width: 'fit-content' }}>
          {editFormStatus === false ? 'Show ' : 'Hide '}
          Edit Form
        </button>

        <button onClick={onDeleteUser}>Delete {user.username}</button>
      </div>
      {editFormStatus === false ? (
        ''
      ) : (
        <EditUserForm
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setOngoingOrder={setOngoingOrder}
          user={user}
          users={users}
          setUsers={setUsers}
        />
      )}
    </div>
  );
};

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default UserCard;
