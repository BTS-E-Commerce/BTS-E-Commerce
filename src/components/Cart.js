import React from 'react';

import { CartCard } from './index'

const Cart = ({ usersOrders, setUsersOrders, ongoingOrder, setOngoingOrder }) => {
    return (
        <div>
            <h1>Cart</h1>
            <CartCard usersOrders={usersOrders} setUsersOrders={setUsersOrders} ongoingOrder={ongoingOrder} setOngoingOrder={setOngoingOrder} />
        </div>

    )
}

export default Cart;