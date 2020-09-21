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

export async function getAllUsers() {
    try {
        const { data } = await axios.get(`${BASE_URL}/users`);
        return data;
    } catch (error) {
        throw error;
    }
}