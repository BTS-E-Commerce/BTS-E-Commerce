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

export async function loginUser({ username, password }) {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/login`, {
      username,
      password,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export async function createUser({ username, password }) {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/register`, {
      username,
      password,
    });
    console.log(data);
  } catch (error) {
    throw error;
  }
}
