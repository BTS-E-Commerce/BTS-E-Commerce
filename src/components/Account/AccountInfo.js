import React, { useEffect, useState } from 'react';

import { OrderHistory } from './OrderHistory/index'

import { Admin } from './Admin/index'

const AccountInfo = ({ usersOrders, orders, setOrders, ongoingOrder, setOngoingOrder, currentUser, setCurrentUser, categories, setCategories }) => {

    const testChangeUserToGuest = () => {
        localStorage.clear();
        setOngoingOrder({})
        setCurrentUser({ id: 1, username: 'guest', admin: false })
    }

    const testChangeUserToBrody = () => {
        localStorage.clear();
        setCurrentUser({ id: 4, username: 'brody', admin: true })
    }

    const testChangeUserToSam = () => {
        localStorage.clear();
        setCurrentUser({ id: 5, username: 'sam', admin: true })
    }

    const testChangeUserToTyler = () => {
        localStorage.clear();
        setCurrentUser({ id: 6, username: 'tyler', admin: true })
    }

    return (
        <div>
            <h1>AccountInfo</h1>
            <h2>Current user is: {currentUser.username}</h2>
            <button onClick={testChangeUserToGuest}>Change user to guest</button>
            <button onClick={testChangeUserToBrody}>Change user to brody</button>
            <button onClick={testChangeUserToSam}>Change user to sam</button>
            <button onClick={testChangeUserToTyler}>Change user to tyler</button>
            {currentUser.admin === false
                ? ''
                : <p>You are an admin.</p>
            }
            {currentUser.admin === false
                ? ''
                : <Admin
                    categories={categories}
                    setCategories={setCategories}
                />
            }
            <OrderHistory usersOrders={usersOrders} />
        </div>

    )
}

export default AccountInfo;