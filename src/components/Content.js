import React, { useState, useEffect } from 'react';

import ProductCard from './ProductCard';
import NewProductForm from './NewProductForm';

import { getAllProducts } from '../api/products';


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
        //Putting "products" into the change array below causes it to run forever every second. I don't know why.
        //Nevermind, I figured it out. It was becuase I was running a console log on it right after, which counted as a "change".
    }, [products]);

    return (
        <div>
            <NewProductForm />
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>

    );
}

export default Content;