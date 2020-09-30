//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import axios from 'axios';

//~~~~~~~~~~~~~~~~~~~
//~~~~ VARIABLES ~~~~
//~~~~~~~~~~~~~~~~~~~

const BASE_URL = '/api';

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~
export async function getAllOrders() {
  try {
    const { data } = await axios.get(`${BASE_URL}/orders`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createOrder(userId, productId) {
  try {
    console.log(userId);
    const { data: { order } } = await axios.post(`${BASE_URL}/orders/`, {
      userId,
      products: [
        { id: productId, quantity: 1 }
      ]
    });
    return order;
  } catch (error) {
    throw error;
  }
}

export async function updateOrder(orderId, fields) {
  try {
    const { data: { order } } = await axios.patch(`${BASE_URL}/orders/${orderId}`, {
      fields
    });

    return order;
  } catch (error) {
    throw error;
  }
}

export async function addProductToOrder(orderId, productId, currentPrice) {
  try {
    const { data: { order } } = await axios.post(`${BASE_URL}/orders/${orderId}`, {
      orderId,
      products: [
        { id: productId, quantity: 1, currentPrice }
      ]
    });
    return order;
  } catch (error) {
    throw error;
  }
}

export async function updateOrderProduct(orderId, productId, fields) {
  try {
    const { data: updatedOrderProduct } = await axios.patch(`${BASE_URL}/orders/${orderId}/${productId}`, {
      fields
    });
    return updatedOrderProduct;
  } catch (error) {
    throw error;
  }
}

export async function deleteOrder(orderId) {
  try {
    const { data } = await axios.delete(`${BASE_URL}/orders/${orderId}`);

    return data;
  } catch (error) {
    throw error;
  }
}
