//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useEffect, useState } from 'react';

import { updateUser } from '../../../api/index';

const EditUserForm = ({ user, users, setUsers, currentUser, setCurrentUser }) => {
    //~~~~~~~~~~~~~~~~~~~
    //~~~~~~ STATE ~~~~~~
    //~~~~~~~~~~~~~~~~~~~
    const [username, setUsername] = useState(user === undefined ? '' : (user.username));
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState(user === undefined ? '' : (user.admin));
    //~~~~~~~~~~~~~~~~~~~
    //~~~~~ EFFECTS ~~~~~
    //~~~~~~~~~~~~~~~~~~~
    useEffect(() => {
        if (currentUser.admin === false) {
            setAdmin(false);
        }
    }, []);
    //~~~~~~~~~~~~~~~~~~~
    //~~~~ FUNCTIONS ~~~~
    //~~~~~~~~~~~~~~~~~~~
    console.log(currentUser);
    async function handleSubmit(event) {
        event.preventDefault();

        console.log(username, password, admin);
        try {

            if (currentUser.admin === true) {
                const { updatedUser } = await updateUser(user.id, { username, password, admin })
                const removeIndex = users.findIndex(removeUser => removeUser.id === user.id);
                window.location.reload();
            } else if (currentUser.admin === true && currentUser.id === user.id) {
                const { updatedUser } = await updateUser(user.id, { username, password, admin })
                const removeIndex = users.findIndex(removeUser => removeUser.id === user.id);
                localStorage.setItem('username', updatedUser.username);
                console.log(updatedUser);
                setCurrentUser(updatedUser);
                window.location.reload();
            }
            else {
                const { updatedUser } = await updateUser(currentUser.id, { username, password, admin })
                //Need to setCurrentUser here if changing your own userinfo.
                //OR we need to make them login with new, updated info.
                console.log(updatedUser);
                setCurrentUser(updatedUser);
            }
            //For some reason this splice is not working on users. I have tried copying the array and prefomring it on the copy but that also does not work.
            //To get around this I just force a refresh.
            // users.slice(removeIndex, 1, updatedUser);
            // setUsers([...users]);

            //This is here as a failsafe.

        } catch (error) {
            throw error;
        }
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleAdminChange = (event) => {
        //This does not change from the default value when the radio buttons are clicked.
        setAdmin(event.target.value);
    }
    //~~~~~~~~~~~~~~~~~~~
    //~~~~~~ JSX ~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~
    return (
        <div>
            <h3>Edit User Form</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor='edit-username'>Username:</label>
                <input
                    className='edit-username'
                    type='text'
                    name='username'
                    value={username}
                    onChange={handleUsernameChange}
                />
                <label htmlFor='edit-password'>New Password:</label>
                <input
                    className='edit-password'
                    type='text'
                    name='password'
                    value={password}
                    onChange={handlePasswordChange}
                />
                <p>Give Admin Status?</p>
                <label htmlFor='edit-admin-true'>True</label>
                <input type="radio" className='edit-admin-true' name="edit-admin" value="true" onChange={handleAdminChange} />
                <label htmlFor='edit-admin-false'>False</label>
                <input type="radio" className='edit-admin-false' name="edit-admin" value="false" onChange={handleAdminChange} checked />
                <input type='submit' value='Submit'></input>
            </form>
        </div >
    )
}

export default EditUserForm;


//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~