const axios = require("axios");

const BASE_URL = "http://localhost:8082";

async function getAllClientes() {
  const response = await axios.get(`${BASE_URL}/clientes`);
  return response.data;
}

async function getClienteById(id) {
  const response = await axios.get(`${BASE_URL}/clientes/${id}`);
  return response.data;
}

async function createCliente(dados) {
  const response = await axios.post(`http://localhost:8080/v1/clientes`, dados);
  return response.data;
}

async function updateClienteMilhas(id, dados) {
  const response = await axios.put(`${BASE_URL}/clientes/${id}/milhas`, dados);
  return response.data;
}

async function getClienteMilhas(id) {
  const response = await axios.get(`${BASE_URL}/clientes/${id}/milhas`);
  return response.data;
}

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateClienteMilhas,
  getClienteMilhas,
};