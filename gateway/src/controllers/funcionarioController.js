const funcionarioService = require("../services/funcionarioService.js");

async function getAllFuncionarios(req, res) {
  try {
    const funcionarios = await funcionarioService.getAllFuncionarios();
    res.status(200).json(funcionarios);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar funcionários", error: error.message });
  }
}

async function getFuncionarioById(req, res) {
  try {
    const funcionario = await funcionarioService.getFuncionarioById(
      req.params.id
    );
    res.status(200).json(funcionario);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar funcionário", error: error.message });
  }
}

async function createFuncionario(req, res) {
  try {
    const novoFuncionario = await funcionarioService.createFuncionario(
      req.body
    );
    res.status(201).json(novoFuncionario);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar funcionário", error: error.message });
  }
}

async function updateFuncionario(req, res) {
  try {
    const funcionarioAtualizado = await funcionarioService.updateFuncionario(
      req.params.id,
      req.body
    );
    res.status(200).json(funcionarioAtualizado);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar funcionário", error: error.message });
  }
}

async function deleteFuncionario(req, res) {
  try {
    await funcionarioService.deleteFuncionario(req.params.id);
    res.status(204).send(); // No Content
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar funcionário", error: error.message });
  }
}

module.exports = {
  getAllFuncionarios,
  getFuncionarioById,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario,
};
