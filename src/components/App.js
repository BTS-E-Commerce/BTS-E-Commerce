import React, { useState, useEffect } from 'react';

import { Content, Register, Login, UsersInfo } from './index';
import { getAllProducts, getAllOrders, createOrder, addProductToOrder } from '../api/index';

const App = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  //Default state should be {id: 1, username: 'guest'}
  const [currentUser, setCurrentUser] = useState({ id: 2, username: 'brody' });
  const [ongoingOrder, setOngoingOrder] = useState({});

  useEffect(() => {
    getAllProducts()
      .then((result) => {
        setProducts(result.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getAllOrders()
      .then((result) => {
        setOrders(result.orders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log('orders', orders);
  // console.log('ongoingOrder', ongoingOrder);


  //Gets the current order given a current user id and checks if it is complete
  const checkForUsersOngoingOrder = (userId, orders) => {
    let currentOrder = {};
    orders.map(order => {
      if (order.user.id == userId) {
        if (order.isComplete === false) {
          currentOrder = order;
          console.log(order);
          localStorage.setItem('cart', JSON.stringify(currentOrder));
        }
      }
    });
    console.log("DID WE FIND ORDEr?", currentOrder);
    setOngoingOrder(currentOrder);
    console.log("UPDATED ORDER: ", ongoingOrder);
  }

  const addProductToCart = (id, price) =>
    async function () {
      //check for guest
      if (currentUser.username === 'guest') {
        console.log("I'm a guest.")
        //Check local storage
        if (JSON.parse(localStorage.getItem('cart')) === null) {
          console.log('There is nothing in local.')
        }
      }

      console.log('product', id, price);
      checkForUsersOngoingOrder(currentUser.id, orders);

      //Check to see if the ongoingOrder has changed.
      console.log("THIS IS THE CURRENT ORDER BEFORE ADDING PRODUCT:", ongoingOrder);
      console.log(Object.keys(ongoingOrder).length);
      if (Object.keys(ongoingOrder).length === 0) {
        console.log("There is no current order.")
        const newOrder = await createOrder(currentUser.id, id)
        console.log("CREATED NEW ONGOING ORDER:", newOrder);
        localStorage.setItem('cart', JSON.stringify(newOrder));
      } else {
        console.log("TRYING TO UPDATE AN EXSISTING ORDER");
        const updatedOrder = await addProductToOrder(ongoingOrder.id, id, price);
        console.log("UPDATED ONGOING ORDER:", updatedOrder);
      }
    };

  return (
    <div className='App'>
      <h1>Hello, World!</h1>
      <Content
        products={products}
        setProducts={setProducts}
        addProductToCart={addProductToCart}
      />
      <Register />
      <Login />
      <UsersInfo orders={orders} currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  );
};

export default App;
