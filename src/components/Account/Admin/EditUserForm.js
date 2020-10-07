//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom'

import { updateUser } from '../../../api/index';

const EditUserForm = (props) => {
    console.log(props);
    const { user, users, setUsers, currentUser, setCurrentUser, setOngoingOrder } = props;
    //~~~~~~~~~~~~~~~~~~~
    //~~~~~~ STATE ~~~~~~
    //~~~~~~~~~~~~~~~~~~~
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [admin, setAdmin] = useState(user === undefined ? '' : (user.admin));

    let history = useHistory();
    //~~~~~~~~~~~~~~~~~~~
    //~~~~~ EFFECTS ~~~~~
    //~~~~~~~~~~~~~~~~~~~
    useEffect(() => {
        if (currentUser.admin === false || currentUser.admin === undefined) {
            setAdmin(false);
        }
    }, []);
    //~~~~~~~~~~~~~~~~~~~
    //~~~~ FUNCTIONS ~~~~
    //~~~~~~~~~~~~~~~~~~~
    //* For testing purposes. Makes the current user an admin.
    const onMakeAdmin = async function () {
        const { updatedUser } = await updateUser({ userId: currentUser.id, adminUserId: currentUser.id, currentPassword: currentPassword, fields: { admin: true } });
        setCurrentUser(updatedUser);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        console.log(username, password, admin);
        if (currentPassword === '') {
            alert('You need to verify your current password to update your info.');
            return;
        }
        try {
            if (currentUser.admin === true && currentUser.id === user.id) {
                const { updatedUser } = await updateUser({ userId: user.id, adminUserId: currentUser.id, currentPassword: currentPassword, fields: { username, password, admin } })
                console.log("THIS IS MY OWN USER INfo.")

                localStorage.clear();
                setCurrentUser({ id: 1, username: 'guest', admin: false });
                setOngoingOrder({});

                history.push('/login');
            } else if (currentUser.admin === true) {
                const { updatedUser } = await updateUser({ userId: user.id, adminUserId: currentUser.id, currentPassword: currentPassword, fields: { username, password, admin } })
                const removeIndex = users.findIndex(removeUser => removeUser.id === user.id);
                //For some reason this splice is not working on users. I have tried copying the array and prefomring it on the copy but that also does not work.
                //To get around this I just force a refresh.
                // users.slice(removeIndex, 1, updatedUser);
                // setUsers([...users]);

                //This is here as a failsafe.
                window.location.reload();
            }
            else {
                const { updatedUser } = await updateUser({ userId: currentUser.id, currentPassword: currentPassword, fields: { username, password, admin } })

                localStorage.clear();
                setCurrentUser({ id: 1, username: 'guest', admin: false });
                setOngoingOrder({});

                history.push('/login');
            }
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

    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
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
                <label htmlFor='edit-current-password'>Current Password:</label>
                <input
                    placeholder="Input your current password..."
                    className='edit-current-password'
                    type='password'
                    name='current-password'
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                    required
                />
                <label htmlFor='edit-username'>New Username:</label>
                <input
                    placeholder="Input your new username..."
                    className='edit-username'
                    type='text'
                    name='username'
                    value={username}
                    onChange={handleUsernameChange}
                />
                <label htmlFor='edit-password'>New Password:</label>
                <input
                    placeholder="Input your new password..."
                    className='edit-password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={handlePasswordChange}
                />

                {currentUser.admin === true ? <>
                    <p>Give Admin Status?</p>
                    <label htmlFor='edit-admin-true'>True</label>
                    <input type="radio" className='edit-admin-true' name="edit-admin" value="true" onChange={handleAdminChange} />
                    <label htmlFor='edit-admin-false'>False</label>
                    <input type="radio" className='edit-admin-false' name="edit-admin" value="false" onChange={handleAdminChange} checked />
                </> : ''}
                <input type='submit' value='Submit'></input>
            </form>
            <button onClick={onMakeAdmin}>Make {currentUser.username} an Admin</button>
        </div >
    )
}

export default EditUserForm;


//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~