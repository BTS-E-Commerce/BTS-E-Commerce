//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useState } from 'react';

import { EditUserForm } from './index';

const UserCard = ({ user, changeUser, users, setUsers, currentUser, setCurrentUser, setOngoingOrder, onDeleteUser }) => {
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
    }

    //~~~~~~~~~~~~~~~~~~~
    //~~~~~~ JSX ~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~
    return (
        <div>
            <h2>User Card</h2>
            <h3>Username: {user.username}</h3>
            <p>User Id: {user.id}</p>
            <p>Password: {user.password}</p>
            <p>Admin: {user.admin === true ? "User is an admin." : "User is NOT an admin."}</p>
            <button onClick={changeUser}>Make {user.username} an Admin</button>
            <button onClick={changeUser}>Log in as {user.username}</button>
            <button onClick={showEditFrom}>
                {editFormStatus === false
                    ? 'Show'
                    : 'Hide'}
            Edit Form
            </button>
            {editFormStatus === false
                ? ''
                : <EditUserForm currentUser={currentUser} setCurrentUser={setCurrentUser} setOngoingOrder={setOngoingOrder} user={user} users={users} setUsers={setUsers} />
            }
            <button onClick={onDeleteUser}>Delete {user.username}</button>
        </div>

    )
}


//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default UserCard;