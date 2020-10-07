import React from 'react';

const OrderCardProducts = ({ product }) => {
  return (
    <div class='orderedProduct'>
      <img src={product.image} alt='An image of mac.' />
      <h5>{product.name}</h5>
      <div className='productFooter'>
        <span>
          <h4>Quantity: </h4>
          <p>{product.quantity}</p>
        </span>
        <span>
          <h4>Product Price: </h4>
          <p>${product.currentPrice / 100}</p>
        </span>
      </div>
    </div>
  );
};

export default OrderCardProducts;
