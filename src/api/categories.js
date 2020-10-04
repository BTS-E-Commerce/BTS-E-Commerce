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
export async function getAllCategories() {
  try {
    const { data } = await axios.get(`${BASE_URL}/categories`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createCategory(newCategory) {
  try {
    const { data } = await axios.post(`${BASE_URL}/categories`, {
      newCategory,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCategory(categoryId) {
  try {
    const { data } = await axios.delete(`${BASE_URL}/categories/${categoryId}`);
    return data;
  } catch (error) {
    throw error;
  }
}
