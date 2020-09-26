import React from 'react';

const CartCardProducts = ({ product }) => {
    return (
        <div>
            <h4>CartCardProduct</h4>
            <img src={product.image} alt="An image of mac." />
            <h5>Product: {product.name}</h5>
            <p>Product Price: {product.currentPrice}</p>
            <p>Quantity: {product.quantity}</p>
            <button>DELETE PRODUCT</button>
        </div>

    )
}

export default CartCardProducts;