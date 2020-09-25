import React, { useEffect, useState } from 'react';

import { Cart, Orders } from './index'

const UsersInfo = ({ orders, currentUser, setCurrentUser }) => {
    const [usersOrders, setUsersOrders] = useState([])

    useEffect(() => {
        console.log(getUsersOrders());
        // getUsersOrders()
        setUsersOrders(getUsersOrders())
    }, [orders, currentUser]);

    const getUsersOrders = () => {
        return orders.filter(order => order.user.id === currentUser.id)
    }

    const testChangeUserToBrody = () => {
        setCurrentUser({ id: 2, username: 'brody' })
    }

    const testChangeUserToSam = () => {
        setCurrentUser({ id: 3, username: 'sam' })
    }

    return (
        <div>
            <h1>UsersInfo</h1>
            <h2>Current user is: {currentUser.username}</h2>
            <button onClick={testChangeUserToBrody}>Change user to brody</button>
            <button onClick={testChangeUserToSam}>Change user to sam</button>
            <Cart />
            <Orders usersOrders={usersOrders} />
        </div>

    )
}

export default UsersInfo;