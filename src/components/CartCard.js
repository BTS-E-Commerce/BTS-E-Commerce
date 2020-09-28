import React, { useEffect } from 'react';

import { CartCardProducts } from './index'

import { updateOrder, deleteOrder } from '../api/index'

const CartCard = ({ usersOrders, setUsersOrders, ongoingOrder, setOngoingOrder }) => {

    console.log("USERS ORDERS:", usersOrders);

    async function onDeleteOrder() {
        console.log(ongoingOrder.id);
        const deletedOrder = await deleteOrder(ongoingOrder.id);
        if (deletedOrder) {
            setOngoingOrder({});
            localStorage.clear();
            console.log("THIS IS WHAT WAS DELETED", deletedOrder);
            console.log("THIS IS ONGOING AFTER DELETED", ongoingOrder);
        } else {
            console.log("Cannot delete order.")
        }

    }

    async function onCheckout() {
        alert('THANKS FOR CHECKING OUT!');
        const completedOrder = await updateOrder(ongoingOrder.id, { isComplete: true });
        setOngoingOrder({});
        setUsersOrders([...usersOrders, completedOrder]);
        localStorage.clear();
        console.log("Here is your completed order:", completedOrder);
    }
    return (
        <div>
            <h1>CartCard</h1>
            {Object.keys(ongoingOrder).length !== 0 ? ongoingOrder.products.map((product) => (
                <>
                    <CartCardProducts product={product} />
                    <p>total price here</p>
                    <button onClick={onCheckout}>CHECKOUT</button>
                    <button onClick={onDeleteOrder}>DELETE ORDER</button>
                </>
            )) : "There is nothing here."}

        </div>

    )
}

export default CartCard;