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
  updateProduct
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
    //check if logged in token exsists
    //If yes, change current user to token one
  }, []);

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
      if (localStorageCart != null && Object.keys(localStorageCart).length != 0) {
        localStorageCart.products = localStorageCart.products.sort(compareProductIds);
        setOngoingOrder(localStorageCart);
      }
    } else {
      let currentOrder = {};
      orders.map((order) => {
        if (order.user.id == currentUser.id) {
          if (order.isComplete === false) {
            currentOrder = order;
            currentOrder.products = currentOrder.products.sort(compareProductIds);
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
  }

  const getUsersOrderHistory = () => {
    return orders.filter(
      (order) => order.user.id === currentUser.id && order.isComplete === true
    );
  };

  const addProductToCart = (id, price, inventory, quantity = 1) =>
    async function () {
      if (inventory < quantity) {
        alert("This product is out of order! Contact support for further action.");
        return;
      }
      if (JSON.parse(localStorage.getItem('cart')) == null || Object.keys(JSON.parse(localStorage.getItem('cart'))).length == 0) {
        const order = await createOrder(currentUser.id, id);
        setOrders([...orders, order]);
        localStorage.setItem('cart', JSON.stringify(order));
        setOngoingOrder(order);
      } else {
        //Dont need to do becuase should alreayd be in local sotagre.
        //Check if alreayd in order.
        const order = await addProductToOrder(ongoingOrder.id, id, price);

        order.products = order.products.sort(compareProductIds);

        localStorage.setItem('cart', JSON.stringify(order));
        setOngoingOrder(order);
      }
      await updateProductInventory(id, quantity, inventory);
    };

  const updateProductInventory = async function (id, quantity, inventory) {
    //Check if inventory is less than quantity;
    console.log(inventory);
    console.log(quantity);
    inventory -= quantity;
    console.log(inventory);
    await updateProduct(id, { inventory })
  }

  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ JSX ~~~~~~~~
  //~~~~~~~~~~~~~~~~~~~
  return (
    <Router>
      <div className='App'>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Switch>
          <Route path='/account'>
            <h2>Welcome to your account, {currentUser.username}</h2>
            <Account
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
          <Route path='/register'>
            <Register
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
            />
          </Route>
          <Route path='/login'>
            <Login setCurrentUser={setCurrentUser} currentUser={currentUser} />
          </Route>
          <Route path='/cart'>
            <Cart
              products={products}
              setProducts={setProducts}
              usersOrders={usersOrders}
              setUsersOrders={setUsersOrders}
              ongoingOrder={ongoingOrder}
              setOngoingOrder={setOngoingOrder}
              compareProductIds={compareProductIds}
              updateProductInventory={updateProductInventory}

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
