const reservaService = require("../services/reservaService.js");

async function createReserva(req, res) {
  try {
    const novaReserva = await reservaService.createReserva(req.body);
    res.status(201).json(novaReserva);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      status: error.response?.status || 500,
      erro: error.response?.message || error.response?.data?.message || "Erro ao criar reserva"
    });
  }
}

async function deleteReserva(req, res) {
  try {
    const reservaDeletada = await reservaService.deleteReserva(req.params.id);
    res.status(200).json(reservaDeletada);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      status: error.response?.status || 500,
      erro: error.response?.message || error.response?.data?.message || "Erro ao excluir reserva"
    });
  }
}

async function getReservaById(req, res) {
  try {
    const reserva = await reservaService.getReservaById(req.params.id);
    res.status(200).json(reserva);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      status: error.response?.status || 500,
      erro: error.response?.message || error.response?.data?.message || "Reserva não encontrada"
    });
  }
}

async function updateReservaEstado(req, res) {
  try {
    const reservaAtualizada = await reservaService.updateReservaEstado(req.params.id, req.body);
    res.status(200).json(reservaAtualizada);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      status: error.response?.status || 500,
      erro: error.response?.message || error.response?.data?.message || "Erro ao atualizar estado da reserva"
    });
  }
}

module.exports = {
  createReserva,
  deleteReserva,
  getReservaById,
  updateReservaEstado,
};
