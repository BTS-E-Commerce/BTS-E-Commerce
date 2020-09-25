import React from 'react';
import moment from 'moment';

import { OrderCardProducts } from './index'

const OrderCard = ({ order, number }) => {
    //Total price is not updating correctly. It is not adding the digits togther. It puts them side by side.
    let totalPrice = 0;
    return (
        <div>
            <h2>OrderCard</h2>
            <p>Order Number: {number}</p>
            <p>Date Created: {moment(order.date).format('dddd, MMMM Do YYYY')}</p>
            <p>Is Order Completed? {order.isComplete === true ? 'Yes.' : 'No.'}</p>
            <h3>Products</h3>
            {order.products.map((product) => (
                <OrderCardProducts
                    key={product.id}
                    product={product}
                />
            )
            )}
            <h3>Total Price: {order.products.map((product) => {
                return totalPrice = totalPrice + product.currentPrice * product.quantity
            })}
            </h3>
        </div>

    )
}

export default OrderCard;