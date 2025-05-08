const clienteService = require("../services/clienteService.js");

async function getAllClientes(req, res) {
  try {
    const clientes = await clienteService.getAllClientes();
    res.status(200).json(clientes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar clientes", error: error.message });
  }
}

async function getClienteById(req, res) {
  try {
    const cliente = await clienteService.getclienteById(req.params.id);
    res.status(200).json(cliente);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar cliente", error: error.message });
  }
}

async function createCliente(req, res) {
  try {
    const novoCliente = await clienteService.createCliente(req.body);
    res.status(201).json(novoCliente);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar cliente", error: error.message });
  }
}

async function updateCliente(req, res) {
  try {
    const clienteAtualizado = await clienteService.updateCliente(
      req.params.id,
      req.body
    );
    res.status(200).json(clienteAtualizado);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar cliente", error: error.message });
  }
}

async function deleteCliente(req, res) {
  try {
    await clienteService.deleteCliente(req.params.id);
    res.status(204).send(); // No Content
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar cliente", error: error.message });
  }
}

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};
