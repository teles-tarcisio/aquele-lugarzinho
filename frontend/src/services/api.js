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
  try {
    const result = await axios.get(`${BASE_URL}/reviews`, config);
    return result;
  } catch (error) {
    alert(`Erro ao obter reviews: ${error.response.data}`);
  }
}

async function uploadImage(imageFile) {
  const body = new FormData();
  body.set('key', IMGBB_KEY);
  body.append('image', imageFile);
  try {
    const uploadResult = await axios.post(IMGBB_URL, body);
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
  try {
    const result = await axios.get(`${BASE_URL}/locations`, config);
    return result;
  } catch (error) {
    alert(`Erro ao obter locais: ${error.response.data}`);
  }
}

async function registerLocation(newLocationData, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const result = await axios.post(`${BASE_URL}/locations/new`, newLocationData, config);
    return result;
  } catch (error) {
    alert(`Erro ao cadastrar novo local: ${error.response.data}`);
  }
}

async function registerReview(newReviewData, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const result = await axios.post(`${BASE_URL}/reviews/new`, newReviewData, config);
    return result;
  } catch (error) {
    alert(`Erro ao cadastrar nova avalia????o: ${error.response.data}`);
  }
}

export {
  registerUser,
  signUser,
  getReviews,
  uploadImage,
  getLocations,
  registerLocation,
  registerReview,
};
