const clienteService = require("../services/clienteService.js");
const reservaService = require("../services/reservaService.js");
const { getUserId } = require("../middlewares/tokenJWTService.js");

async function getAllClientes(req, res) {
  try {
    const clientes = await clienteService.getAllClientes();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      status: error.response?.status || 500,
      erro: error.response?.message || error.response?.data?.message || "Erro ao buscar clientes",
    });
  }
}

async function getClienteById(req, res) {
  try {
    const cliente = await clienteService.getClienteById(req.params.id);
    res.status(200).json(cliente);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      status: error.response?.status || 500,
      erro: error.response?.message || error.response?.data?.message || "Cliente não encontrado",
    });
  }
}

async function createCliente(req, res) {
  try {
    const novoCliente = await clienteService.createCliente(req.body);
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      status: error.response?.status || 500,
      erro: error.response?.message || error.response?.data?.message || "Erro ao criar cliente",
    });
  }
}

async function updateClienteMilhas(req, res) {
  try {
    const userID = getUserId(req);
    if (userID.userId !== parseInt(req.params.id) && userID.userProfile !== "FUNCIONARIO") {
      return res.status(403).json({
        status: 403,
        erro: "Acesso negado",
      });
    }
    const clienteMilhas = await clienteService.updateClienteMilhas(
      req.params.id,
      req.body
    );
    res.status(200).json(clienteMilhas);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      status: error.response?.status || 500,
      erro: error.response?.message || error.response?.data?.message || "Erro ao atualizar milhas do cliente",
    });
  }
}

async function getClienteMilhas(req, res) {
  try {
    const userID = getUserId(req);
    if (userID.userId !== parseInt(req.params.id) && userID.userProfile !== "FUNCIONARIO") {
      return res.status(403).json({
        status: 403,
        erro: "Acesso negado",
      });
    }
    const milhas = await clienteService.getClienteMilhas(req.params.id);
    res.status(200).json(milhas);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      status: error.response?.status || 500,
      erro: error.response?.message || error.response?.data?.message || "Erro ao buscar milhas do cliente",
    });
  }
}

async function getClienteReservas(req, res) {
  try {
    const userID = getUserId(req);
    if (userID.userId !== parseInt(req.params.id) && userID.userProfile !== "FUNCIONARIO") {
      return res.status(403).json({
        status: 403,
        erro: "Acesso negado",
      });
    }
    const reservas = await reservaService.getClienteReservas(req.params.id);
    if (!reservas || reservas.length === 0) {
      res.status(204).json({ message: "Nenhuma reserva encontrada para o cliente" });
      return;
    }
    res.status(200).json(reservas);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      status: error.response?.status || 500,
      erro: error.response?.message || error.response?.data?.message || "Erro ao buscar reservas do cliente",
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