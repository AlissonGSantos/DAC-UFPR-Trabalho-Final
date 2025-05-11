const clienteService = require("../services/clienteService.js");
const reservaService = require("../services/reservaService.js");

async function getAllClientes(req, res) {
  try {
    const clientes = await clienteService.getAllClientes();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: true,
      status: error.response?.status || 500,
      message: error.response?.message || error.response?.data?.message || "Erro ao buscar clientes",
    });
  }
}

async function getClienteById(req, res) {
  try {
    const cliente = await clienteService.getClienteById(req.params.id);
    res.status(200).json(cliente);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: true,
      status: error.response?.status || 500,
      message: error.response?.message || error.response?.data?.message || "Cliente não encontrado",
    });
  }
}

async function createCliente(req, res) {
  try {
    const novoCliente = await clienteService.createCliente(req.body);
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: true,
      status: error.response?.status || 500,
      message: error.response?.message || error.response?.data?.message || "Erro ao criar cliente",
    });
  }
}

async function updateClienteMilhas(req, res) {
  try {
    const clienteMilhas = await clienteService.updateClienteMilhas(
      req.params.id,
      req.body
    );
    res.status(200).json(clienteMilhas);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: true,
      status: error.response?.status || 500,
      message: error.response?.message || error.response?.data?.message || "Erro ao atualizar milhas do cliente",
    });
  }
}

async function getClienteMilhas(req, res) {
  try {
    const milhas = await clienteService.getClienteMilhas(req.params.id);
    res.status(200).json(milhas);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: true,
      status: error.response?.status || 500,
      message: error.response?.message || error.response?.data?.message || "Erro ao buscar milhas do cliente",
    });
  }
}

async function getClienteReservas(req, res) {
  try {
    const reservas = await reservaService.getClienteReservas(req.params.id);
    if (!reservas || reservas.length === 0) {
      res.status(204).json({ message: "Nenhuma reserva encontrada para o cliente" });
      return;
    }
    res.status(200).json(reservas);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: true,
      status: error.response?.status || 500,
      message: error.response?.message || error.response?.data?.message || "Erro ao buscar reservas do cliente",
    });
  }
}

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateClienteMilhas,
  getClienteMilhas,
  getClienteReservas,
};