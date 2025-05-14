const reservaService = require("../services/reservaService.js");
const { getUserId } = require("../middlewares/tokenJWTService.js");

async function createReserva(req, res) {
  try {
    const userID = getUserId(req);
    if (req.body["codigo_cliente"] !== userID.userId) {
      return res.status(400).json({
        status: 400,
        erro: "Código do cliente não corresponde ao usuário autenticado"
      });
    }
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
    const userID = getUserId(req);
    const reserva = await reservaService.getReservaById(req.params.id);
    if (reserva["codigo_cliente"] !== userID.userId && userID.userProfile !== "FUNCIONARIO") {
      return res.status(404).json({
        status: 404,
        erro: "Reserva não encontrada"
      });
    }
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
