//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { CartProducts } from './index';

import {
  updateOrder,
  deleteOrder,
  deleteProductFromOrder,
  updateProduct,
} from '../../api/index';

import { FindTotalPrice } from '../../utils/FindTotalPrice';

import './Cart.css';

const Cart = ({
  products,
  setProducts,
  usersOrders,
  setUsersOrders,
  ongoingOrder,
  setOngoingOrder,
  compareProductIds,
}) => {
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
        if (ongoingOrder.hasOwnProperty('products')) {
          await updateOrder(ongoingOrder.id, { totalPrice });
        }
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
      localStorage.removeItem('cart');
      history.push('/');
    } else {
      console.log('Cannot delete order.');
    }
  }

  async function onCheckout() {
    ongoingOrder.products.forEach((product) => {
      const [{ inventory }] = products.filter(
        (storeProduct) => product.id === storeProduct.id
      );
      product.inventory = inventory;
      if (inventory < product.quantity) {
        alert(
          'Sorry. This mac is out of order! Please contact support for further information.'
        );
        return;
      }
    });
    try {
      const completedOrder = await updateOrder(ongoingOrder.id, {
        isComplete: true,
        totalPrice,
      });
      for (const product of ongoingOrder.products) {
        product.inventory -= product.quantity;
        await updateProduct(product.id, { inventory: product.inventory });
      }
      const checkoutTotalPrice = totalPrice;
      localStorage.removeItem('cart');
      setOngoingOrder({});
      setUsersOrders([...usersOrders, completedOrder]);
      history.push('/checkout', { totalPrice: checkoutTotalPrice });
    } catch (error) {
      throw error;
    }
  }

  const onDeleteProductFromCart = (id) =>
    async function () {
      try {
        await deleteProductFromOrder(ongoingOrder.id, id);
      } catch (error) {
        throw error;
      }
      const newOngoingOrderProducts = ongoingOrder.products.filter(
        (product) => id !== product.id
      );
      localStorage.setItem('cart', JSON.stringify(newOngoingOrderProducts));
      setOngoingOrder({ ...ongoingOrder, products: newOngoingOrderProducts });
    };
  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ JSX ~~~~~~~~
  //~~~~~~~~~~~~~~~~~~~
  return (
    <div id='cartContainer'>
      <h1 id='cart-header'>Cart Summary</h1>
      <div id='cartProductContainer'>
        {ongoingOrder.hasOwnProperty('products') ? (
          ongoingOrder.products.length !== 0 ? (
            ongoingOrder.products.map((product) => (
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
            ))
          ) : (
            <p>
              Look's like the pot's empty. No mac makes the macaroni homunculus
              sad...
            </p>
          )
        ) : (
          <p>Look's like the pot's empty. No mac makes Granny sad...</p>
        )}
      </div>
      <div id='cartInfo'>
        <p> Total Cart Price: ${(totalPrice / 100).toFixed(2)}</p>
        {ongoingOrder.hasOwnProperty('products') ? (
          ongoingOrder.products.length !== 0 ? (
            <div id='orderButtons'>
              <button id='cart-delete' onClick={onDeleteOrder}>
                DELETE ORDER
              </button>
              <button id='cart-checkout' onClick={onCheckout}>
                CHECKOUT
              </button>
            </div>
          ) : (
            ''
          )
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default Cart;
