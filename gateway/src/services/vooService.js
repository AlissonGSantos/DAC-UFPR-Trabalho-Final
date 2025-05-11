const axios = require("axios");

const BASE_URL = "http://localhost:8085/v1";
const SAGA_URL = "http://localhost:8080/v1";

async function getAllVoos(queryParams) {
  const response = await axios.get(`${BASE_URL}/voos`, { params: queryParams });
  return response.data;
}

async function getVooById(id) {
  const response = await axios.get(`${BASE_URL}/voos/${id}`);
  return response.data;
}

async function createVoo(dados) {
  const response = await axios.post(`${BASE_URL}/voos`, dados);
  return response.data;
}

async function updateVooEstado(id, dados) {
  const response = await axios.patch(`${SAGA_URL}/voos/${id}/estado`, dados);
  return response.data;
}

async function deleteVoo(id) {
  const response = await axios.delete(`${SAGA_URL}/voos/${id}`);
  return response.data;
}

async function getAllAeroportos() {
  const response = await axios.get(`${BASE_URL}/aeroportos`);
  return response.data;
}

module.exports = {
  getAllVoos,
  getVooById,
  createVoo,
  updateVooEstado,
  deleteVoo,
  getAllAeroportos,
};
