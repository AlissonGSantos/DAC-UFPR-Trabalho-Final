const funcionarioService = require("../services/funcionarioService.js");

async function getAllFuncionarios(req, res) {
  try {
    const funcionarios = await funcionarioService.getAllFuncionarios();
    res.status(200).json(funcionarios);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: true,
      status: error.response?.status || 500,
      message: error.response?.message || "Erro ao buscar funcionários"
    });
  }
}

async function getFuncionarioById(req, res) {
  try {
    const funcionario = await funcionarioService.getFuncionarioById(req.params.id);
    res.status(200).json(funcionario);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: true,
      status: error.response?.status || 500,
      message: error.response?.message || "Funcionário não encontrado"
    });
  }
}

async function createFuncionario(req, res) {
  try {
    const novoFuncionario = await funcionarioService.createFuncionario(req.body);
    res.status(201).json(novoFuncionario);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: true,
      status: error.response?.status || 500,
      message: error.response?.message || "Erro ao criar funcionário"
    });
  }
}

async function updateFuncionario(req, res) {
  try {
    const funcionarioAtualizado = await funcionarioService.updateFuncionario(req.params.id, req.body);
    res.status(200).json(funcionarioAtualizado);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: true,
      status: error.response?.status || 500,
      message: error.response?.message || "Erro ao atualizar funcionário"
    });
  }
}

async function deleteFuncionario(req, res) {
  try {
    const funcionarioInativo = await funcionarioService.deleteFuncionario(req.params.id);
    res.status(200).json(funcionarioInativo);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: true,
      status: error.response?.status || 500,
      message: error.response?.message || "Erro ao excluir funcionário"
    });
  }
}

module.exports = {
  getAllFuncionarios,
  getFuncionarioById,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario,
};
