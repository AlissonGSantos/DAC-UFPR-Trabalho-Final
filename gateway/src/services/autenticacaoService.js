const axios = require("axios");

const BASE_URL = "http://localhost:8081/v1/auth";

async function login(credentials) {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  return response.data;
}

module.exports = {
  login,
};
