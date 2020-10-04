//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useState, useEffect } from 'react';

import { getAllUsers } from '../../../api/index'
import { UserCard } from './index';

const UsersList = ({ setCurrentUser, setOngoingOrder }) => {
    //~~~~~~~~~~~~~~~~~~~
    //~~~~~~ STATE ~~~~~~
    //~~~~~~~~~~~~~~~~~~~
    const [users, setUsers] = useState([]);
    //~~~~~~~~~~~~~~~~~~~
    //~~~~~ EFFECTS ~~~~~
    //~~~~~~~~~~~~~~~~~~~
    useEffect(() => {
        getAllUsers()
            .then((response) => {
                setUsers(response.users);
                console.log(users);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    //~~~~~~~~~~~~~~~~~~~
    //~~~~ FUNCTIONS ~~~~
    //~~~~~~~~~~~~~~~~~~~
    const onChangeUser = (user) => () => {
        localStorage.setItem('cart', null);
        setOngoingOrder({})
        setCurrentUser(user)
    }

    const onDeleteUser = (id) => () => {

    }

    const onMakeAdmin = (id) => () => {
        await updateUser(id);

    }

    //~~~~~~~~~~~~~~~~~~~
    //~~~~~~ JSX ~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~
    return (
        <div>
            <h2>Users List</h2>
            {users.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                    users={users}
                    setUsers={setUsers}
                    changeUser={onChangeUser(user)} />
            ))}
        </div>

    )
}
//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default UsersList;