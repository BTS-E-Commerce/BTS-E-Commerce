import React, { useState } from 'react';
import moment from 'moment';

import { EditProductForm } from './index';

import './Products.css';

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
  };

  return (
    <div className='productCard' key={product.id}>
      <img
        className='productImage'
        src={product.image}
        alt='A pic of macaroni.'
      />
      {product.inventory <= 0 ? (
        <h2 className='outOfOrder'>OUT OF ORDER</h2>
      ) : (
          ''
        )}
      <h1>{product.name}</h1>
      <div className='productInfo'>
        <span>
          <h3>Date Created: </h3>
          <p>{moment(product.date).format('dddd, MMMM Do YYYY')}</p>
        </span>
        <span id='productDescription'>
          <h3>Description: </h3>
          <p>{product.description}</p>
        </span>
        <div className='productFooter'>
          <span>
            <h3>Category: </h3>
            <p>
              {product.categories[0].name[0].toUpperCase()}
              {product.categories[0].name.slice(1)}
            </p>
          </span>
          <span>
            <h2>Price: </h2>
            <p>${(product.currentPrice / 100).toFixed(2)}</p>
          </span>
        </div>
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
        ) : (
            <button onClick={showProductEditFrom}>
              {productEditFromStatus === false ? 'Show' : 'Hide'}
            Edit Form
            </button>
          )}
      </div>
      {currentUser.admin === false ? (
        ''
      ) : productEditFromStatus === false ? (
        ''
      ) : (
            <EditProductForm
              product={product}
              products={products}
              setProducts={setProducts}
              categories={categories}
            />
          )}
    </div>
  );
};
export default ProductCard;
