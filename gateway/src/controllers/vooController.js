const vooService = require("../services/vooService.js");

async function getAllVoos(req, res) {
  try {
    const queryParams = req.query;
    const voos = await vooService.getAllVoos(queryParams);
    res.status(200).json({...queryParams, voos});
  } catch (error) {
    res.status(error.response?.status || 500).json({
      status: error.response?.status || 500,
      erro: error.response?.message || error.response?.data?.message || "Erro ao buscar voos"
    });
  }
}

async function getVooById(req, res) {
  try {
    const voo = await vooService.getVooById(req.params.id);
    res.status(200).json(voo);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      status: error.response?.status || 500,
      erro: error.response?.message || error.response?.data?.message || "Voo não encontrado"
    });
  }
}

async function createVoo(req, res) {
  try {
    const novoVoo = await vooService.createVoo(req.body);
    res.status(201).json(novoVoo);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      status: error.response?.status || 500,
      erro: error.response?.message || error.response?.data?.message || "Erro ao criar voo"
    });
  }
}

async function updateVooEstado(req, res) {
  try {
    const vooAtualizado = await vooService.updateVooEstado(req.params.id, req.body);
    res.status(200).json(vooAtualizado);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      status: error.response?.status || 500,
      erro: error.response?.message || error.response?.data?.message || "Erro ao atualizar estado do voo"
    });
  }
}

async function deleteVoo(req, res) {
  try {
    const vooDeletado = await vooService.deleteVoo(req.params.id);
    res.status(200).json(vooDeletado);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      status: error.response?.status || 500,
      erro: error.response?.message || error.response?.data?.message || "Erro ao excluir voo"
    });
  }
}

async function getAllAeroportos(req, res) {
  try {
    const aeroportos = await vooService.getAllAeroportos();
    res.status(200).json(aeroportos);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      status: error.response?.status || 500,
      erro: error.response?.message || error.response?.data?.message || "Erro ao buscar aeroportos"
    });
  }
}

module.exports = {
  getAllVoos,
  getVooById,
  createVoo,
  updateVooEstado,
  deleteVoo,
  getAllAeroportos,
};
