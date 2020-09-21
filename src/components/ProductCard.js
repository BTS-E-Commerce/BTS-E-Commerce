import React, { useState, useEffect } from 'react';

import { deleteProduct } from '../api/index'

const ProductCard = ({ product }) => {
    async function handleProductDelete(event) {
        
    }
    return (
        <div key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <h3>{product.currentPrice}</h3>
            <button onClick={handleProductDelete}>DELETE</button>
        </div>
    );
}

export default ProductCard;