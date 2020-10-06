import axios from 'axios';

const BASE_URL = '/api';

// create a utils function for this config?

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};

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

    return data;
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
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateUser({
  userId,
  adminUserId = null,
  currentPassword,
  fields,
}) {
  try {
    const { data } = await axios.patch(`${BASE_URL}/users/${userId}`, {
      adminUserId,
      currentPassword,
      fields,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const { data } = await axios.delete(`${BASE_URL}/users/${userId}`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function checkUserByUsername({ username }) {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/${username}`);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}
