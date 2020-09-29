import React from 'react';

const CartCardProducts = ({ product }) => {
    //implement quantity going up.
    //change ongoing order product quantity by id

    return (
        <div>
            <h4>CartCardProduct</h4>
            <img src={product.image} alt="An image of mac." />
            <h5>Product: {product.name}</h5>
            <p>Product Price: ${product.currentPrice / 100}</p>
            <p>Quantity: {product.quantity}</p>
            <label htmlFor='quantity'>Quantity:</label>
            <input
                id='quantity'
                type='number'
                name='quantity'
            // value={quantity}
            // onChange={handleQuantityChange}
            />
            <button>DELETE PRODUCT</button>
        </div>

    )
}

export default CartCardProducts;