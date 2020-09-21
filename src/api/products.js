import axios from 'axios';


// export async function getSomething() {
//   try {
//     const { data } = await axios.get('/api');
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

const BASE_URL = '/api';

export async function getAllProducts() {
    try {
        const { data } = await axios.get(`${BASE_URL}/products`)
        return data;
    } catch (error) {
        throw error;
    }
}

export async function deleteProduct(productId) {
    try {
        const { data } = await axios.delete(`${BASE_URL}/products/${productId}`);
        return data;
    } catch (error) {
        throw error;
    }
}