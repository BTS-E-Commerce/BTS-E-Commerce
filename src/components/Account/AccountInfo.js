import React, { useEffect, useState } from 'react';

import { OrderHistory } from './OrderHistory/index'

const AccountInfo = ({ usersOrders, orders, setOrders, ongoingOrder, setOngoingOrder, currentUser, setCurrentUser }) => {

    const testChangeUserToGuest = () => {
        localStorage.clear();
        setOngoingOrder({})
        setCurrentUser({ id: 1, username: 'guest' })
    }

    const testChangeUserToBrody = () => {
        localStorage.clear();
        setCurrentUser({ id: 2, username: 'brody' })
    }

    const testChangeUserToSam = () => {
        localStorage.clear();
        setCurrentUser({ id: 3, username: 'sam' })
    }

    const testChangeUserToTyler = () => {
        localStorage.clear();
        setCurrentUser({ id: 4, username: 'tyler' })
    }

    return (
        <div>
            <h1>AccountInfo</h1>
            <h2>Current user is: {currentUser.username}</h2>
            <button onClick={testChangeUserToGuest}>Change user to guest</button>
            <button onClick={testChangeUserToBrody}>Change user to brody</button>
            <button onClick={testChangeUserToSam}>Change user to sam</button>
            <button onClick={testChangeUserToTyler}>Change user to tyler</button>
            <OrderHistory usersOrders={usersOrders} />
        </div>

    )
}

export default AccountInfo;