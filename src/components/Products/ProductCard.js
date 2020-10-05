import React, { useState } from 'react';
import moment from 'moment';

import { EditProductForm } from './index';

import './Products.css'

const ProductCard = ({
  categories,
  products,
  setProducts,
  product,
  onDelete,
  onAddToOrder,
  currentUser,
}) => {
  const [productEditFromStatus, setProductEditFromStatus] = useState(false);

  const showProductEditFrom = () => {
    setProductEditFromStatus(!productEditFromStatus);
  }

  return (
    <div className='productCard' key={product.id}>
      <img
        className='productImage'
        src={product.image}
        alt='A pic of macaroni.'
      />
      {product.inventory <= 0 ? <h2 className='outOfOrder'>OUT OF ORDER</h2> : ''}
      <h1>{product.name}</h1>
      <div className='productInfo'>
        <p>DATE CREATED: {moment(product.date).format('dddd, MMMM Do YYYY')}</p>
        <p>DESCRIPTION: {product.description}</p>
        <p>CATEGORY: {product.categories[0].name}</p>
        <h3>PRICE: ${(product.currentPrice / 100).toFixed(2)}</h3>
      </div>
      <div className='productButtons'>
        <button id='addToCartButton' onClick={onAddToOrder}>
          Add To Cart
      </button>
        {currentUser.admin === false ? (
          ''
        ) : (
            <button id='productDeleteButton' onClick={onDelete}>
              DELETE
            </button>
          )}

        {currentUser.admin === false ? (
          ''
        ) : <button onClick={showProductEditFrom}>
            {productEditFromStatus === false
              ? 'Show'
              : 'Hide'}
          Edit Form
          </button>}
      </div>
      {currentUser.admin === false ? (
        ''
      ) : productEditFromStatus === false
          ? ''
          : <EditProductForm
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
