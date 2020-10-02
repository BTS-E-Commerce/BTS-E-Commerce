//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useState } from 'react';

import { } from '../../../api/index';

const EditUserForm = ({ user, users, setUsers }) => {
    //~~~~~~~~~~~~~~~~~~~
    //~~~~~~ STATE ~~~~~~
    //~~~~~~~~~~~~~~~~~~~
    const [username, setUsername] = useState(user === undefined ? '' : (user.username));
    const [password, setPassword] = useState(user === undefined ? '' : (user.password));
    const [admin, setAdmin] = useState(user === undefined ? '' : (user.admin));
    //~~~~~~~~~~~~~~~~~~~
    //~~~~~ EFFECTS ~~~~~
    //~~~~~~~~~~~~~~~~~~~

    //~~~~~~~~~~~~~~~~~~~
    //~~~~ FUNCTIONS ~~~~
    //~~~~~~~~~~~~~~~~~~~

    async function handleSubmit(event) {
        event.preventDefault();

        console.log(username, password, admin);
        // const { updatedProduct } = await updateProduct(product.id, { name, description, imageUrl, inventory, price, sale, categories: [category] });
        // const removeIndex = products.findIndex(removeProduct => removeProduct.id === product.id)
        // products.splice(removeIndex, 1, updatedProduct);

        // setProducts([...products]);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleAdminChange = (event) => {
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
                <label htmlFor='edit-password'>Password:</label>
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