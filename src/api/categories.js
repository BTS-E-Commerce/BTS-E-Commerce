import axios from 'axios';

const BASE_URL = '/api';

export async function getAllCategories() {
  try {
    const { data } = await axios.get(`${BASE_URL}/categories`);
    return data;
  } catch (error) {
    throw error;
  }
}
