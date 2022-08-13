import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API;
const IMGBB_URL = 'https://api.imgbb.com/1/upload';
const IMGBB_KEY = '34659037bd18afd2a6b33f03fbe71b5e';

async function registerUser(newUserData) {
  const sendNewUserData = {
    nickname: newUserData.name,
    email: newUserData.email,
    password: newUserData.password,
    userImageUrl: newUserData.userImageUrl,
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

async function uploadImage(imageFile) {
  const body = new FormData();
  body.set('key', IMGBB_KEY);
  body.append('image', imageFile);
  let uploadResult = null;
  try {
    uploadResult = await axios.post(IMGBB_URL, body);
    return uploadResult.data;
  } catch (error) {
    alert('Erro ao fazer upload de imagem!');
  }
}

async function getLocations(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios.get(`${BASE_URL}/locations`, config);
  return result;
}

async function registerLocation(newLocationData, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios.post(`${BASE_URL}/locations/new`, newLocationData, config);
  return result;
}

export {
  registerUser,
  signUser,
  getReviews,
  uploadImage,
  getLocations,
  registerLocation,
};
