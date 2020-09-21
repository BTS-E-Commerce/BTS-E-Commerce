import React from 'react';

import { deleteProduct } from '../api/products'

const ProductCard = ({ product }) => {
    async function handleProductDelete(event) {
        console.log(event.target.value);
        deleteProduct(event.target.value);
    }
    //Use moment.js library for easy date convert.
    return (
        <div key={product.id}>
            <h1>{product.name}</h1>
            <p>DATE CREATED: {product.date}</p>
            <p>DESCRIPTION: {product.description}</p>
            <h3>PRICE: ${product.currentPrice / 100}</h3>
            <button value={product.id} onClick={handleProductDelete}>DELETE</button>
        </div>
    );
}

export default ProductCard;