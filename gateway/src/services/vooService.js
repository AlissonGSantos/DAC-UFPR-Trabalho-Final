const axios = require("axios");
const BASE_URL = process.env.VOO_SERVICE_URL;
const SAGA_URL = process.env.SAGA_ORCHESTRATOR_URL;
const RESERVA_SERVICE_URL = process.env.RESERVA_SERVICE_URL;

async function getAllVoos(queryParams) {
  const response = await axios.get(`${BASE_URL}/voos`, { params: queryParams });
  return response.data;
}

async function getVooById(id) {
  const vooResponse = await axios.get(`${BASE_URL}/voos/${id}`);
  const poltronasResponse = await axios.get(`${RESERVA_SERVICE_URL}/reservas/poltronas/${id}`);
  return { ...vooResponse.data, poltronas_ocupadas: poltronasResponse.data.poltronasReservadas };
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
