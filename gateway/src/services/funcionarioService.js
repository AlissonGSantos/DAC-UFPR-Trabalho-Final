const axios = require("axios");
const BASE_URL = process.env.FUNCIONARIO_SERVICE_URL;
const SAGA_URL = process.env.SAGA_ORCHESTRATOR_URL;

async function getAllFuncionarios() {
  const response = await axios.get(`${BASE_URL}/funcionarios`);
  return response.data.map(funcionario => ({ ...funcionario, tipo: "FUNCIONARIO" }));
}

async function getFuncionarioById(id) {
  const response = await axios.get(`${BASE_URL}/funcionarios/${id}`);
  return { ...response.data, tipo: "FUNCIONARIO" };
}

async function createFuncionario(dados) {
  const response = await axios.post(`${SAGA_URL}/funcionarios`, dados);
  return { ...response.data, tipo: "FUNCIONARIO" };
}

async function updateFuncionario(id, dados) {
  const response = await axios.put(`${BASE_URL}/funcionarios/${id}`, dados);
  return { ...response.data, tipo: "FUNCIONARIO" };
}

async function deleteFuncionario(id) {
  const response = await axios.delete(`${BASE_URL}/funcionarios/${id}`);
  return { ...response.data, tipo: "FUNCIONARIO" };
}

module.exports = {
  getAllFuncionarios,
  getFuncionarioById,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario,
};