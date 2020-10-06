//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React from 'react';

import { updateOrderProduct, updateProduct } from '../../api/index';

const CartProducts = ({
  products,
  setProducts,
  product,
  ongoingOrder,
  setOngoingOrder,
  compareProductIds,
  onDeleteProductFromCart,
}) => {
  //~~~~~~~~~~~~~~~~~~~
  //~~~~ FUNCTIONS ~~~~
  //~~~~~~~~~~~~~~~~~~~
  const handleOnQuantityChange = async function (event) {
    const [updatedProduct] = ongoingOrder.products.filter(
      (orderProduct) => product.id === orderProduct.id
    );
    updatedProduct.quantity = parseInt(event.target.value);
    const updatedOrderProducts = ongoingOrder.products.filter(
      (orderProduct) => product.id !== orderProduct.id
    );
    updatedOrderProducts.push(updatedProduct);
    updatedOrderProducts.sort(compareProductIds);

    const [inventoryProduct] = products.filter(
      (originalProduct) => product.id === originalProduct.id
    );
    if (inventoryProduct.inventory < updatedProduct.quantity) {
      alert('At this quantity, this product is out of order.');
      product.quantity -= 1;
      return;
    }
    try {
      await updateOrderProduct(ongoingOrder.id, product.id, {
        quantity: updatedProduct.quantity,
      });
    } catch (error) {
      throw error;
    }
    setOngoingOrder({ ...ongoingOrder, products: updatedOrderProducts });
  };

  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ JSX ~~~~~~~~
  //~~~~~~~~~~~~~~~~~~~
  return (
    <div className='cartProductCard'>
      <div id='cart-img'>
        <img
          className='productImage'
          src={product.image}
          alt='An image of mac.'
        />
      </div>
      <div id='cart-details'>
        <h5>{product.name}</h5>
        <p>
          Price: ${((product.currentPrice / 100) * product.quantity).toFixed(2)}
        </p>
        <div className='quantityFields'>
          <label htmlFor='quantity'>Quantity:</label>
          <input
            id='quantity'
            type='number'
            name='quantity'
            value={product.quantity}
            onChange={handleOnQuantityChange}
          />
        </div>
        <button id='cart-remove' onClick={onDeleteProductFromCart}>
          REMOVE PRODUCT FROM CART
        </button>
      </div>
    </div>
  );
};

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default CartProducts;
