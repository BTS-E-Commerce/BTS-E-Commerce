import React, { useEffect, useState } from 'react';

import { Cart, Orders } from './index'

const UsersInfo = ({ orders, setOrders, ongoingOrder, setOngoingOrder, currentUser, setCurrentUser }) => {
    const [usersOrders, setUsersOrders] = useState([])


    useEffect(() => {
        // getUsersOrders()
        setUsersOrders(getUsersOrderHistory())
    }, []);

    useEffect(() => {
        // getUsersOrders()
        setUsersOrders(getUsersOrderHistory())
    }, [orders, currentUser]);

    console.log(orders);

    const getUsersOrderHistory = () => {
        return orders.filter(order => (order.user.id === currentUser.id && order.isComplete === true))
    }

    //This gets all users orders regardless if they are complete or not (includes cart order)
    // const getUsersOrders = () => {
    //     return orders.filter(order => order.user.id === currentUser.id)
    // }

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
            <h1>UsersInfo</h1>
            <h2>Current user is: {currentUser.username}</h2>
            <button onClick={testChangeUserToGuest}>Change user to guest</button>
            <button onClick={testChangeUserToBrody}>Change user to brody</button>
            <button onClick={testChangeUserToSam}>Change user to sam</button>
            <button onClick={testChangeUserToTyler}>Change user to tyler</button>
            <Cart usersOrders={usersOrders} setUsersOrders={setUsersOrders} ongoingOrder={ongoingOrder} setOngoingOrder={setOngoingOrder} />
            <Orders usersOrders={usersOrders} />
        </div>

    )
}

export default UsersInfo;