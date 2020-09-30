import React from 'react';
import { updateOrderProduct, updateProduct } from '../../api/index';

const CartProducts = ({ products, setProducts, product, ongoingOrder, setOngoingOrder, compareProductIds }) => {
    const handleOnQuantityChange = async function (event) {
        const [updatedProduct] = ongoingOrder.products.filter((orderProduct) => product.id === orderProduct.id);
        updatedProduct.quantity = event.target.value;
        const updatedOrderProducts = ongoingOrder.products.filter((orderProduct) => product.id !== orderProduct.id);
        updatedOrderProducts.push(updatedProduct);
        updatedOrderProducts.sort(compareProductIds);
        //inventory

        const inventoryProduct = products.filter((originalProduct) => product.id === originalProduct.id);
        console.log(inventoryProduct);
        //Checkm if inventory is too low
        //await updateProduct(product.id, { inventory: })
        await updateOrderProduct(ongoingOrder.id, product.id, { quantity: updatedProduct.quantity })
        setOngoingOrder({ ...ongoingOrder, products: updatedOrderProducts });
    }

    return (
        <div>
            <h4>CartCardProduct</h4>
            <img src={product.image} alt="An image of mac." />
            <h5>Product: {product.name}</h5>
            <p>Product Price: ${((product.currentPrice / 100) * product.quantity).toFixed(2)}</p>
            <label htmlFor='quantity'>Quantity:</label>
            <input
                id='quantity'
                type='number'
                name='quantity'
                value={product.quantity}
                onChange={handleOnQuantityChange}
            />
            <button>DELETE PRODUCT</button>
        </div>

    )
}

export default CartProducts;