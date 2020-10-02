//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useState, useEffect } from 'react';

import { CartProducts } from './index';

import { updateOrder, deleteOrder, updateProduct } from '../../api/index';

import { FindTotalPrice } from '../../utils/FindTotalPrice';

const Cart = ({ products, setProducts, usersOrders, setUsersOrders, ongoingOrder, setOngoingOrder, compareProductIds }) => {
    //~~~~~~~~~~~~~~~~~~~
    //~~~~~~ STATE ~~~~~~
    //~~~~~~~~~~~~~~~~~~~
    const [totalPrice, setTotalPrice] = useState(0);

    //~~~~~~~~~~~~~~~~~~~
    //~~~~~ EFFECTS ~~~~~
    //~~~~~~~~~~~~~~~~~~~
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

    //~~~~~~~~~~~~~~~~~~~
    //~~~~ FUNCTIONS ~~~~
    //~~~~~~~~~~~~~~~~~~~
    async function onDeleteOrder() {
        const deletedOrder = await deleteOrder(ongoingOrder.id);
        if (deletedOrder) {
            setOngoingOrder({});
            //Need to change to localstorage.remove when user token shit is added.
            localStorage.setItem('cart', null);
            console.log("THIS IS WHAT WAS DELETED", deletedOrder);
            console.log("THIS IS ONGOING AFTER DELETED", ongoingOrder);
        } else {
            console.log('Cannot delete order.')
        }
    }

    async function onCheckout() {
        alert('THANKS FOR CHECKING OUT!');
        ongoingOrder.products.forEach(product => {
            const [{ inventory }] = products.filter((storeProduct) => product.id === storeProduct.id);
            product.inventory = inventory;
            if (inventory < product.quantity) {
                alert("Sorry. This mac is out of order! Please contact support for further information.")
                return;
            }
        });
        const completedOrder = await updateOrder(ongoingOrder.id, { isComplete: true, totalPrice });
        for (const product of ongoingOrder.products) {
            product.inventory -= product.quantity;
            console.log(product.inventory);
            await updateProduct(product.id, { inventory: product.inventory });
        }
        setOngoingOrder({});
        setUsersOrders([...usersOrders, completedOrder]);
        localStorage.clear();
        console.log("Here is your completed order:", completedOrder);
    }

    //Implement removing product from cart after addition.
    const onDeleteProductFromCart = (id) => () => {

    }
    //change/update inventory on product id in products when deleting product from the cart and ongoing order.

    //~~~~~~~~~~~~~~~~~~~
    //~~~~~~ JSX ~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~
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

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default Cart;