import React from 'react';

import { OrderCard } from './index';

const OrderHistory = ({ usersOrders }) => {
  let number = 0;
  return (
    <div className='orderHistoryContainer'>
      <h1>Order History</h1>
      {usersOrders.map((order) => (
        <OrderCard
          number={(number = number + 1)}
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
};

export default OrderHistory;
