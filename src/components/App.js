//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useState, useEffect } from 'react';
import { Header, LandingPage, ErrorPage } from './index';
import { CheckoutPage } from './Cart/index';
import {
  getAllCategories,
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
  NavLink
} from 'react-router-dom';
import { Content } from './Products/index';
import { Account } from './Account/index';
import { Register, Login } from './Authenitcation/index';
import { Cart } from './Cart/index';

import './App.css';
import Footer from './Footer';

const App = () => {
  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ STATE ~~~~~~
  //~~~~~~~~~~~~~~~~~~~
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [ongoingOrder, setOngoingOrder] = useState({});
  const [usersOrders, setUsersOrders] = useState([]);
  console.log("THIS IS THE CURRENT USER", currentUser);

  //~~~~~~~~~~~~~~~~~~~
  //~~~~~ EFFECTS ~~~~~
  //~~~~~~~~~~~~~~~~~~~
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('id'));
    const userUsername = JSON.parse(localStorage.getItem('username'));
    //FOR DEMO
    const userAdmin = JSON.parse(localStorage.getItem('admin'));
    console.log("CHEKCING FOR LOGGED IN USER")
    if (!userId || !userUsername) {
      setCurrentUser({ id: 1, username: 'guest', admin: false });
    } else {
      setCurrentUser({ id: userId, username: userUsername, admin: userAdmin });
    }
  }, []);

  useEffect(() => {
    getAllCategories()
      .then((response) => {
        setCategories(response.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    const localStorageCart = JSON.parse(localStorage.getItem('cart'));
    if (currentUser.username === 'guest') {
      if (
        localStorageCart !== null &&
        Object.keys(localStorageCart).length !== 0
      ) {
        localStorageCart.products = localStorageCart.products.sort(
          compareProductIds
        );
        setOngoingOrder(localStorageCart);
      }
    } else {
      if (
        localStorageCart !== null &&
        Object.keys(localStorageCart).length !== 0
      ) {
        const localOrder = JSON.parse(localStorage.getItem('cart'));
        setOngoingOrder(localOrder);
        return;
      }
      let currentOrder = {};
      orders.map((order) => {
        if (order.user.id === currentUser.id) {
          if (order.isComplete === false) {
            currentOrder = order;
            currentOrder.products = currentOrder.products.sort(
              compareProductIds
            );
            localStorage.setItem('cart', JSON.stringify(currentOrder));
          }
        }
      });
      setOngoingOrder(currentOrder);
    }
  }, [orders, currentUser]);

  useEffect(() => {
    setUsersOrders(getUsersOrderHistory());
  }, []);

  useEffect(() => {
    setUsersOrders(getUsersOrderHistory());
  }, [orders, currentUser]);

  //~~~~~~~~~~~~~~~~~~~
  //~~~~ FUNCTIONS ~~~~
  //~~~~~~~~~~~~~~~~~~~

  //Compare function isn't nessecary here since comparing integer ids.
  //If using alphabetical sort then don't need anon function either.
  const compareProductIds = (productA, productB) => {
    const idA = productA.id;
    const idB = productB.id;

    let comparison = 0;

    if (idA > idB) {
      comparison = 1;
    } else if (idA < idB) {
      comparison = -1;
    }
    return comparison;
  };

  const getUsersOrderHistory = () => {
    return orders.filter(
      (order) => order.user.id === currentUser.id && order.isComplete === true
    );
  };

  const addProductToCart = (id, price, inventory, quantity = 1) =>
    async function () {
      if (inventory < quantity) {
        alert(
          'This product is out of order! Contact support for further action.'
        );
        return;
      }
      if (
        JSON.parse(localStorage.getItem('cart')) === null ||
        Object.keys(JSON.parse(localStorage.getItem('cart'))).length === 0
      ) {
        try {
          const order = await createOrder(currentUser.id, id);
          setOrders([...orders, order]);
          localStorage.setItem('cart', JSON.stringify(order));
          setOngoingOrder(order);
          alert('You created a new order!\nYou can see this order or proceed to checkout by clicking on "Cart"!')
        } catch (error) {
          throw error;
        }
      } else {
        const existingProduct = ongoingOrder.products.filter(
          (product) => product.id === id
        );
        if (existingProduct.length !== 0) {
          alert(
            'This product is already in your cart. You can change the quantity there.'
          );
          return;
        }
        try {
          const order = await addProductToOrder(ongoingOrder.id, id, price);

          //Compare function isn't nessecary here since comparing integer ids.
          //If using alphabetical sort then don't need anon function either.
          // order.products = order.products.sort(compareProductIds);
          order.products = order.products.sort(
            (productA, productB) => productA.id < productB.id
          );

          localStorage.setItem('cart', JSON.stringify(order));
          setOngoingOrder(order);
          alert('You have just added a new product to your order!\nYou can see this order or proceed to checkout by clicking on "Cart"!')
        } catch (error) {
          throw error;
        }
      }
    };
  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ JSX ~~~~~~~~
  //~~~~~~~~~~~~~~~~~~~
  return (
    <Router>
      <div className='App'>
        <Header
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setOngoingOrder={setOngoingOrder}
        />
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/register'>
            <Register
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
            />
          </Route>
          <Route exact path='/login'>
            <Login setCurrentUser={setCurrentUser} currentUser={currentUser} />
          </Route>
          <Route exact path='/account'>
            <Account
              categories={categories}
              setCategories={setCategories}
              usersOrders={usersOrders}
              setUsersOrders={setUsersOrders}
              ongoingOrder={ongoingOrder}
              setOngoingOrder={setOngoingOrder}
              orders={orders}
              setOrders={setOrders}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </Route>

          <Route exact path='/cart'>
            <Cart
              products={products}
              setProducts={setProducts}
              usersOrders={usersOrders}
              setUsersOrders={setUsersOrders}
              ongoingOrder={ongoingOrder}
              setOngoingOrder={setOngoingOrder}
              compareProductIds={compareProductIds}
            />
          </Route>
          <Route path='/home'>
            <Redirect to='/' />
          </Route>
          <Route path='/store'>
            <Content
              products={products}
              setProducts={setProducts}
              addProductToCart={addProductToCart}
              categories={categories}
              currentUser={currentUser}
            />
          </Route>
          <Route path='/checkout'>
            <CheckoutPage ongoingOrder={ongoingOrder} />
          </Route>
          <Route path='/404'>
            <ErrorPage />
          </Route>
          <Redirect to='/404' />
        </Switch>
      </div>
    </Router>
  );
};

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default App;
