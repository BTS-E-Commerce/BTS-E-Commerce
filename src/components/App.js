import React, { useState, useEffect } from 'react';

import { Content, Register, Login } from './index';
import { getAllProducts, getAllOrders } from '../api/index';
// import { getAllOrders } from '../../db';

const App = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderProductId, setOrderProductId] = useState('');

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
    console.log('Brody');
    getAllOrders()
      .then((result) => {
        setOrders(result.orders);
        console.log(orders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addProductToOrder = (id) =>
    async function () {
      console.log('product', id);
    };

  return (
    <div className='App'>
      <h1>Hello, World!</h1>
      <Content
        products={products}
        setProducts={setProducts}
        addProductToOrder={addProductToOrder}
      />
      {/* <Users products={products.id} /> */}
      <Register />
      <Login />
    </div>
  );
};

export default App;
