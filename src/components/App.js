import React, { useState, useEffect } from 'react';
import { Content, UsersInfo, Header, Register, Login } from './index';
import {
  getAllProducts,
  getAllOrders,
  createOrder,
  addProductToOrder,
} from '../api/index';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

const App = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  //Default state should be {id: 1, username: 'guest'}
  //Test User state should be { id: 2, username: 'brody' }
  const [currentUser, setCurrentUser] = useState({ id: 1, username: 'guest' });
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

  useEffect(() => {
    if (currentUser.username === 'guest') {
      console.log('I am a guest.');
      const localStorageCart = JSON.parse(localStorage.getItem('cart'));
      console.log(localStorageCart);
      if (localStorageCart != null) {
        console.log('Set oongoing order to local storgae');
        setOngoingOrder(localStorageCart);
      }
    } else {
      console.log('I am ' + currentUser.username);
      let currentOrder = {};
      orders.map((order) => {
        if (order.user.id == currentUser.id) {
          if (order.isComplete === false) {
            currentOrder = order;
            console.log('WE FOUND THE ORDEr:', order);
            localStorage.setItem('cart', JSON.stringify(currentOrder));
          }
        }
      });
      setOngoingOrder(currentOrder);
    }
  }, [orders, currentUser]);

  const addProductToCart = (id, price) =>
    async function () {
      //MAybe check to see if product is alreayd in order...
      //Maybe add to quantity?
      console.log(
        'THIS IS THE CURRENT ORDER BEFORE ADDING PRODUCT:',
        ongoingOrder
      );
      // console.log(Object.keys(ongoingOrder).length === 0);
      console.log(JSON.parse(localStorage.getItem('cart')) == null);
      if (JSON.parse(localStorage.getItem('cart')) == null) {
        console.log('There is no current order.');
        const order = await createOrder(currentUser.id, id);
        setOrders([...orders, order]);
        console.log('CREATED NEW ONGOING ORDER:', order);
        localStorage.setItem('cart', JSON.stringify(order));
        setOngoingOrder(order);
      } else {
        console.log('TRYING TO UPDATE AN EXSISTING ORDER');
        // if (currentUser.username !== 'guest') {
        //   await addProductToOrder(ongoingOrder.id, id, price);
        // }
        const order = await addProductToOrder(ongoingOrder.id, id, price);
        localStorage.setItem('cart', JSON.stringify(order));
        setOngoingOrder(order);
      }
    };

  return (
    <Router>
      <div className='App'>
        <Header currentUser={currentUser} />
        <Switch>
          <Route path='/account'>
            <h2>Welcome, {currentUser.username}</h2>
            {/* USER ORDER HISTORY, REVIEWS, ETC */}
            <UsersInfo
              ongoingOrder={ongoingOrder}
              setOngoingOrder={setOngoingOrder}
              orders={orders}
              setOrders={setOrders}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/cart'>{/* RENDER CART HERE */}</Route>

          <Content
            products={products}
            setProducts={setProducts}
            addProductToCart={addProductToCart}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
