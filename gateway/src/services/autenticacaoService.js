const axios = require("axios");

const BASE_URL = process.env.AUTH_SERVICE_URL;

async function login(credentials) {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  return response.data;
}

module.exports = {
  login,
};
