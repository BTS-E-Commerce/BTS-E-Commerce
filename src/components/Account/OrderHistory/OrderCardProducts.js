import React from 'react';

const OrderCardProducts = ({ product }) => {
    return (
        <div>
            <h4>OrderCardProduct</h4>
            <img src={product.image} alt="An image of mac." />
            <h5>Product: {product.name}</h5>
            <p>Product Price: ${product.currentPrice / 100}</p>
            <p>Quantity: {product.quantity}</p>
        </div>

    )
}

export default OrderCardProducts;