import React, { useEffect, useState } from 'react';

import { OrderHistory } from './OrderHistory/index'

import { Admin } from './Admin/index'

import { updateUser } from '../../api/index'

const Account = ({ usersOrders, orders, setOrders, ongoingOrder, setOngoingOrder, currentUser, setCurrentUser, categories, setCategories }) => {

    const testChangeUserToGuest = () => {
        localStorage.clear();
        setOngoingOrder({})
        setCurrentUser({ id: 1, username: 'guest', admin: false })
    }

    const onMakeAdmin = async function () {
        const { updatedUser } = await updateUser(currentUser.id, { admin: true });
        setCurrentUser(updatedUser);
    }

    return (
        <div>
            <h1>AccountInfo</h1>
            <h2>Current user is: {currentUser.username}</h2>
            <button onClick={testChangeUserToGuest}>Change user to guest</button>
            <button onClick={onMakeAdmin}>Make {currentUser.username} an Admin</button>
            {currentUser.admin === false
                ? ''
                : <p>You are an admin.</p>
            }
            {currentUser.admin === false
                ? ''
                : <Admin
                    categories={categories}
                    setCategories={setCategories}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    setOngoingOrder={setOngoingOrder}
                />
            }
            {currentUser.username !== 'guest'
                ? <OrderHistory usersOrders={usersOrders} />
                : 'Register or Sign in to see your order history.'}

        </div>

    )
}

export default Account;