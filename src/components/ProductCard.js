import React from 'react';
import moment from 'moment';

const ProductCard = ({ product, onDelete }) => {
    //Use moment.js library for easy date convert.
    return (

        <div key={product.id}>
            <img src={product.image} alt='A pic of macaroni.' />
            <h1>{product.name}</h1>
            <p>DATE CREATED: {moment(product.date).format('dddd, MMMM Do YYYY')}</p>
            <p>DESCRIPTION: {product.description}</p>
            <h3>PRICE: ${product.currentPrice / 100}</h3>
            <button onClick={onDelete}>DELETE</button>
        </div>
    );
}
export default ProductCard;