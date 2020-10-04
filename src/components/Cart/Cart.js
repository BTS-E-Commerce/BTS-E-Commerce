//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import { CartProducts } from './index';

import { updateOrder, deleteOrder, deleteProductFromOrder, updateProduct } from '../../api/index';

import { FindTotalPrice } from '../../utils/FindTotalPrice';

const Cart = ({ products, setProducts, usersOrders, setUsersOrders, ongoingOrder, setOngoingOrder, compareProductIds }) => {
    //~~~~~~~~~~~~~~~~~~~
    //~~~~~~ STATE ~~~~~~
    //~~~~~~~~~~~~~~~~~~~
    const [totalPrice, setTotalPrice] = useState(0);

    let history = useHistory();
    //~~~~~~~~~~~~~~~~~~~
    //~~~~~ EFFECTS ~~~~~
    //~~~~~~~~~~~~~~~~~~~
    useEffect(() => {
        setTotalPrice(0);
        if (Object.keys(ongoingOrder).length !== 0) {
            setTotalPrice(FindTotalPrice(ongoingOrder.products));
            localStorage.setItem('cart', JSON.stringify(ongoingOrder));
        }
    }, [ongoingOrder]);

    useEffect(() => {
        async function updateTotalPrice() {
            try {
                await updateOrder(ongoingOrder.id, { totalPrice })
            } catch (error) {
                throw error;
            }

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
            localStorage.removeItem('cart');
            console.log("THIS IS WHAT WAS DELETED", deletedOrder);
            console.log("THIS IS ONGOING AFTER DELETED", ongoingOrder);

            history.push('/');
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
        try {
            const completedOrder = await updateOrder(ongoingOrder.id, { isComplete: true, totalPrice });
            for (const product of ongoingOrder.products) {
                product.inventory -= product.quantity;
                await updateProduct(product.id, { inventory: product.inventory });
            }
            localStorage.removeItem('cart');
            setOngoingOrder({});
            setUsersOrders([...usersOrders, completedOrder]);
            console.log('Here is your completed order:', completedOrder);
            history.push('/');
        } catch (error) {
            throw error;
        }
    }

    //Implement removing product from cart after addition.
    const onDeleteProductFromCart = (id) =>
        async function () {
            try {
                await deleteProductFromOrder(ongoingOrder.id, id);
            } catch (error) {
                throw error;
            }
            const newOngoingOrderProducts = ongoingOrder.products.filter((product) => id !== product.id);
            localStorage.setItem('cart', JSON.stringify(newOngoingOrderProducts));
            setOngoingOrder({ ...ongoingOrder, products: newOngoingOrderProducts });
        };
    //~~~~~~~~~~~~~~~~~~~
    //~~~~~~ JSX ~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~
    return (
        <div>
            <h1>Cart</h1>
            {(ongoingOrder.hasOwnProperty('products'))
                ? (ongoingOrder.products).length !== 0
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
                                onDeleteProductFromCart={onDeleteProductFromCart(product.id)}
                            />

                            <button onClick={onDeleteOrder}>DELETE ORDER</button>
                        </>
                    ))
                    : "There is nothing here."
                : "There is nothing here."}
            {(ongoingOrder.hasOwnProperty('products'))
                ? (ongoingOrder.products).length !== 0 ? <button onClick={onCheckout}>CHECKOUT</button> : '' : ''}
            < p > Total Price: ${(totalPrice / 100).toFixed(2)}</p>
        </div >
    )
}

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default Cart;