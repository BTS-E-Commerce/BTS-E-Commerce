import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { OrderCardProducts } from './index'

import { FindTotalPrice } from '../../../utils/FindTotalPrice'
const OrderCard = ({ order, number }) => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(FindTotalPrice(order.products));
    }, [order]);

    return (
        <div>
            <h2>OrderCard</h2>
            <p>Order Number: {number}</p>
            <p>Date Created: {moment(order.date).format('dddd, MMMM Do YYYY')}</p>
            <h3>Products</h3>
            {order.products.map((product) => (
                <OrderCardProducts
                    key={product.id}
                    product={product}
                />
            )
            )}
            <h3>Total Price: ${totalPrice / 100}
            </h3>
        </div>

    )
}

export default OrderCard;