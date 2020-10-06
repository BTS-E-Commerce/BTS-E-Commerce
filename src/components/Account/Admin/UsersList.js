//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useState, useEffect } from 'react';

import { getAllUsers, deleteUser } from '../../../api/index'
import { UserCard } from './index';

const UsersList = ({ currentUser, setCurrentUser, setOngoingOrder }) => {
    //The users password shows up as the bcrypt version. This password should show up as the one they eneterd.
    //IE. It curently shows as $2b$10$xwWen9zSoDUhbPB/xK/R7uKgU358qoLK4ghiPz0icspzcXxEp6KEm when editing.
    //It should be password, then re-bcrypt it.
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
        <div id='userListContainer'>
            <h1>Users</h1>
            {users.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                    users={users}
                    setUsers={setUsers}
                    setCurrentUser={setCurrentUser}
                    currentUser={currentUser}
                    changeUser={onChangeUser(user)}
                    setOngoingOrder={setOngoingOrder}
                    onDeleteUser={onDeleteUser(user.id)} />
            ))}
        </div>

    )
}
//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default UsersList;