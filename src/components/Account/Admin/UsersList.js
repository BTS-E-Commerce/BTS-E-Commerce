//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useState, useEffect } from 'react';

import { getAllUsers, deleteUser } from '../../../api/index'
import { UserCard } from './index';

const UsersList = ({ currentUser, setCurrentUser, setOngoingOrder }) => {
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

    const onDeleteUser = (id) =>
        async function () {
            try {
                await deleteUser(id);
                if (currentUser.id == id) {
                    localStorage.clear();
                    setCurrentUser({ id: 1, username: 'guest', admin: false });
                    setOngoingOrder({});
                }
                setUsers(users.filter((user) => user.id !== id));
            } catch (error) {
                throw error;
            }

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
                    changeUser={onChangeUser(user)}
                    onDeleteUser={onDeleteUser(user.id)} />
            ))}
        </div>

    )
}
//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default UsersList;