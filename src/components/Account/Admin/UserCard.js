//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useState } from 'react';

import { EditUserForm } from './index';

import { updateUser } from '../../../api/index.js';

const UserCard = ({ user, changeUser, users, setUsers }) => {
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
            <p>Admin: {user.admin === false ? "User is NOT an admin." : "User is an admin."}</p>
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
                : <EditUserForm user={user} users={users} setUsers={setUsers} />
            }

        </div>

    )
}


//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default UserCard;