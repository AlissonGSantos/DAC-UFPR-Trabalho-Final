const axios = require("axios");

const BASE_URL = "http://localhost:8083";

async function getAllFuncionarios() {
  const response = await axios.get(`${BASE_URL}/funcionarios`);
  return response.data;
}

async function getFuncionarioById(id) {
  const response = await axios.get(`${BASE_URL}/funcionarios/${id}`);
  return response.data;
}

async function createFuncionario(dados) {
  const response = await axios.post(`${BASE_URL}/funcionarios`, dados);
  return response.data;
}

async function updateFuncionario(id, dados) {
  const response = await axios.put(`${BASE_URL}/funcionarios/${id}`, dados);
  return response.data;
}

async function deleteFuncionario(id) {
  const response = await axios.delete(`${BASE_URL}/funcionarios/${id}`);
  return response.data;
}

module.exports = {
  getAllFuncionarios,
  getFuncionarioById,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario,
};