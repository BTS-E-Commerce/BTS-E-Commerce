//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useState, useEffect } from 'react';
import { Content, Header } from './index';
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
import { Account } from './Account/index';
import { Register, Login } from './Authenitcation/index';
import { Cart } from './Cart/index';

const App = () => {
  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ STATE ~~~~~~
  //~~~~~~~~~~~~~~~~~~~
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({ id: 1, username: 'guest' });
  const [ongoingOrder, setOngoingOrder] = useState({});
  const [usersOrders, setUsersOrders] = useState([]);

  //~~~~~~~~~~~~~~~~~~~
  //~~~~~ EFFECTS ~~~~~
  //~~~~~~~~~~~~~~~~~~~
  useEffect(() => {
    // getUsersOrders()
    setUsersOrders(getUsersOrderHistory());
  }, []);

  useEffect(() => {
    // getUsersOrders()
    setUsersOrders(getUsersOrderHistory());
  }, [orders, currentUser]);

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

  //~~~~~~~~~~~~~~~~~~~
  //~~~~ FUNCTIONS ~~~~
  //~~~~~~~~~~~~~~~~~~~

  const getUsersOrderHistory = () => {
    return orders.filter(
      (order) => order.user.id === currentUser.id && order.isComplete === true
    );
  };

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

  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ JSX ~~~~~~~~
  //~~~~~~~~~~~~~~~~~~~
  return (
    <Router>
      <div className='App'>
        <Header currentUser={currentUser} />
        <Switch>
          <Route path='/account'>
            <h2>Welcome, {currentUser.username}</h2>
            {/* USER ORDER HISTORY, REVIEWS, ETC */}
            <Account
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
          <Route path='/cart'>
            <Cart
              usersOrders={usersOrders}
              setUsersOrders={setUsersOrders}
              ongoingOrder={ongoingOrder}
              setOngoingOrder={setOngoingOrder}
            />
          </Route>

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

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default App;
