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
      const localStorageCart = JSON.parse(localStorage.getItem('cart'));
      if (localStorageCart != null) {
        setOngoingOrder(localStorageCart);
      }
    } else {
      let currentOrder = {};
      orders.map((order) => {
        if (order.user.id == currentUser.id) {
          if (order.isComplete === false) {
            currentOrder = order;
            localStorage.setItem('cart', JSON.stringify(currentOrder));
          }
        }
      });
      setOngoingOrder(currentOrder);
    }
  }, [orders, currentUser]);

  const addProductToCart = (id, price) =>
    async function () {
      //update/change inventory on product
      if (JSON.parse(localStorage.getItem('cart')) == null) {
        const order = await createOrder(currentUser.id, id);
        setOrders([...orders, order]);
        localStorage.setItem('cart', JSON.stringify(order));
        setOngoingOrder(order);
      } else {
        const order = await addProductToOrder(ongoingOrder.id, id, price);
        localStorage.setItem('cart', JSON.stringify(order));
        setOngoingOrder(order);
      }
    };

  return (
    <Router>
      <div className='App'>
        <Header />
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
