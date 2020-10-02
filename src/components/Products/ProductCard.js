import React from 'react';
import moment from 'moment';

import { EditProductForm } from './index'

const ProductCard = ({ categories, products, setProducts, product, onDelete, onAddToOrder, currentUser }) => {
  return (
    <div key={product.id}>
      <img src={product.image} alt='A pic of macaroni.' />
      {product.inventory <= 0
        ? <h1>OUT OF ORDER</h1>
        : ''}
      <h1>{product.name}</h1>
      <p>DATE CREATED: {moment(product.date).format('dddd, MMMM Do YYYY')}</p>
      <p>DESCRIPTION: {product.description}</p>
      <p>CATEGORY: {product.categories[0].name}</p>
      <h3>PRICE: ${product.currentPrice / 100}</h3>
      <button onClick={onAddToOrder}>Add To Cart</button>
      {currentUser.admin === false
        ? ''
        : <button onClick={onDelete}>DELETE</button>
      }

      {currentUser.admin === false ? '' :
        <EditProductForm
          product={product}
          products={products}
          setProducts={setProducts}
          categories={categories}
        />
      }

    </div>
  );
};
export default ProductCard;
