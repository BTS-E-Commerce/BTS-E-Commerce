import React from 'react';

import { AccountInfo } from './index'

const Account = ({ usersOrders, orders, setOrders, ongoingOrder, setOngoingOrder, currentUser, setCurrentUser }) => {

    return (
        <AccountInfo
            usersOrders={usersOrders}
            ongoingOrder={ongoingOrder}
            setOngoingOrder={setOngoingOrder}
            orders={orders}
            setOrders={setOrders}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser} />
    )
}

export default Account;