import React, { useState, useEffect } from 'react';

import ProductCard, { } from './ProductCard';

import { getAllUsers, getAllProducts } from '../api/index';

const Content = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts()
            .then(result => {
                setProducts(result.products);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    console.log(products);

    return (
        <div>
            {products.map(product => (
                <ProductCard product={product} />
            ))}
        </div>

    );
}

export default Content;