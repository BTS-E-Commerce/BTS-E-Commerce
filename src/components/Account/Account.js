import React from 'react';

import { AccountInfo } from './index'

const Account = ({ usersOrders, orders, setOrders, ongoingOrder, setOngoingOrder, currentUser, setCurrentUser, categories, setCategories }) => {
    //Does this module only exist to render Accoutn info? If so, Account info should turn into our Account componenet.

    return (
        <AccountInfo
            categories={categories}
            setCategories={setCategories}
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