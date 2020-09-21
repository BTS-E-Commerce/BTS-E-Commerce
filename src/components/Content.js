import React, { useState, useEffect } from 'react';

import ProductCard from './ProductCard';
import NewProductForm from './NewProductForm';

import { getAllProducts, deleteProduct } from '../api/products';


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
    }, [products]);

    const onProductDelete = (id) => () => {
        deleteProduct(id);
        setProducts(products.filter(product => id !== product.id));
    }

    // const onProductCreate = () => {
    // }

    return (
        <div>
            <NewProductForm setProducts={setProducts} products={products} />
            {products.map(product => (
                <ProductCard onDelete={onProductDelete(product.id)} key={product.id} product={product} />
            ))}
        </div>

    );
}

export default Content;