import React, { useState, useEffect } from 'react';

import { CartProducts } from './index';

import { updateOrder, deleteOrder } from '../../api/index';

import { FindTotalPrice } from '../../utils/FindTotalPrice';

const Cart = ({ products, setProducts, usersOrders, setUsersOrders, ongoingOrder, setOngoingOrder, compareProductIds }) => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(0);
        if (Object.keys(ongoingOrder).length !== 0) {
            setTotalPrice(FindTotalPrice(ongoingOrder.products));
        }

        localStorage.setItem('cart', JSON.stringify(ongoingOrder));
    }, [ongoingOrder]);

    useEffect(() => {
        async function updateTotalPrice() {
            await updateOrder(ongoingOrder.id, { totalPrice })
        }
        updateTotalPrice();
    }, [totalPrice]);

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

    //Implement removing product from cart after addition.
    //change/update inventory on product id in products when deleting product from the cart and ongoing order.
    return (
        <div>
            <h1>Cart</h1>
            {Object.keys(ongoingOrder).length !== 0
                ? ongoingOrder.products.map((product) => (
                    <>
                        <CartProducts
                            key={product.id}
                            products={products}
                            setProducts={setProducts}
                            product={product}
                            ongoingOrder={ongoingOrder}
                            setOngoingOrder={setOngoingOrder}
                            compareProductIds={compareProductIds}
                        />
                        <button onClick={onCheckout}>CHECKOUT</button>
                        <button onClick={onDeleteOrder}>DELETE ORDER</button>
                    </>
                )) : "There is nothing here."}
            <p>Total Price: ${(totalPrice / 100).toFixed(2)}</p>
        </div>

    )
}

export default Cart;