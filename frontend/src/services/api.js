import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API;

async function registerUser(newUserData) {
  const sendNewUserData = {
    nickname: newUserData.name,
    email: newUserData.email,
    password: newUserData.password,
  };
  const result = await axios.post(`${BASE_URL}/sign-up`, sendNewUserData);
  return result;
}

async function signUser(userData) {
  const result = await axios.post(`${BASE_URL}/sign-in`, userData);
  return result;
}

async function getReviews(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios.get(`${BASE_URL}/reviews`, config);
  return result;
}

export {
  registerUser,
  signUser,
  getReviews,
};
