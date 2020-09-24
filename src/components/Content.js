import React, { useState, useEffect } from 'react';

import { ProductCard, NewProductForm, CategoryList } from './index';
import { deleteProduct, createProduct } from '../api/index';

const Content = ({ products, setProducts, addProductToOrder }) => {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   getAllProducts()
  //     .then((result) => {
  //       setProducts(result.products);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const onProductDelete = (id) =>
    async function () {
      await deleteProduct(id);
      setProducts(products.filter((product) => id !== product.id));
    };

  const onProductCreate = async function (newProduct) {
    const { product } = await createProduct(newProduct, [
      { id: 1, name: 'baked' },
    ]);
    setProducts([...products, product]);
  };

  return (
    <div>
      <NewProductForm createProduct={onProductCreate} />
      {products.map((product) => (
        <ProductCard
          onDelete={onProductDelete(product.id)}
          key={product.id}
          product={product}
          onAddToOrder={addProductToOrder(product.id)}
        />
      ))}
      <CategoryList />
    </div>
  );
};

export default Content;
