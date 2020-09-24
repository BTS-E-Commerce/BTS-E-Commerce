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