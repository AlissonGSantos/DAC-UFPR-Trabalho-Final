const axios = require("axios");

const BASE_URL = process.env.RESERVA_SERVICE_URL;
const SAGA_URL = process.env.SAGA_ORCHESTRATOR_URL;
const VOO_SERVICE_URL = process.env.VOO_SERVICE_URL;

async function createReserva(dados) {
    const response = await axios.post(`${SAGA_URL}/reservas`, dados);
    return response.data;
}

async function deleteReserva(id) {
    const response = await axios.delete(`${SAGA_URL}/reservas/${id}`);
    return response.data;
}

async function getReservaById(id) {
    const reservaResponse = await axios.get(`${BASE_URL}/reservas/${id}`);
    const vooResponse = await axios.get(`${VOO_SERVICE_URL}/voos/${reservaResponse.data.voo_codigo}`);
    return { ...reservaResponse.data, voo: vooResponse.data };
}

async function updateReservaEstado(id, dados) {
    const reservaResponse = await axios.patch(`${BASE_URL}/reservas/${id}/estado`, dados);
    const vooResponse = await axios.get(`${VOO_SERVICE_URL}/voos/${reservaResponse.data.voo_codigo}`);
    return { ...reservaResponse.data, voo: vooResponse.data };
}

async function getClienteReservas(clienteId) {
    const reservaResponse = await axios.get(`${BASE_URL}/reservas/cliente/${clienteId}`);
    const reservas = await Promise.all(
        reservaResponse.data.map(async (reserva) => {
            const vooResponse = await axios.get(`${VOO_SERVICE_URL}/voos/${reserva.voo_codigo}`);
            return { ...reserva, voo: vooResponse.data };
        })
    );
    return reservas;
}

module.exports = {
    createReserva,
    deleteReserva,
    getReservaById,
    updateReservaEstado,
    getClienteReservas,
};
