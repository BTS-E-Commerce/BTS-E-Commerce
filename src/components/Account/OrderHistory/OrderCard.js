import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { OrderCardProducts } from './index';

import { FindTotalPrice } from '../../../utils/FindTotalPrice';
const OrderCard = ({ order, number }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(FindTotalPrice(order.products));
  }, [order]);

  return (
    <div className='orderCard'>
      <div className='orderCardHeader'>
        <span className='orderNumber'>
          <h4>Order Number: </h4>
          <p>{number}</p>
        </span>
        <span>
          <h4>Date Created: </h4>
          <p>{moment(order.date).format('dddd, MMMM Do YYYY')}</p>
        </span>
      </div>
      <div className='orderedProductList'>
        {order.products.map((product) => (
          <OrderCardProducts key={product.id} product={product} />
        ))}
      </div>
      <span className='totalPriceSpan'>
        <h3>Total Price: </h3>
        <p>${(totalPrice / 100).toFixed(2)}</p>
      </span>
    </div>
  );
};

export default OrderCard;
