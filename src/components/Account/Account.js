import React from 'react';

import { AccountInfo } from './index'

const Account = ({ orders, setOrders, ongoingOrder, setOngoingOrder, currentUser, setCurrentUser }) => {

    return (
        <AccountInfo
            ongoingOrder={ongoingOrder}
            setOngoingOrder={setOngoingOrder}
            orders={orders}
            setOrders={setOrders}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser} />
    )
}

export default Account;