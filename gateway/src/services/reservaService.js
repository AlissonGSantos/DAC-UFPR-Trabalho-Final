const axios = require("axios");

const SAGA_URL = "http://localhost:8080/v1";
const BASE_URL = "http://localhost:8084/v1";

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
    const vooResponse = await axios.get(`http://localhost:8085/v1/voos/${reservaResponse.data.voo_codigo}`);
    return { ...reservaResponse.data, voo: vooResponse.data };
}

async function updateReservaEstado(id, dados) {
    const reservaResponse = await axios.patch(`${BASE_URL}/reservas/${id}/estado`, dados);
    const vooResponse = await axios.get(`http://localhost:8085/v1/voos/${reservaResponse.data.voo_codigo}`);
    return { ...reservaResponse.data, voo: vooResponse.data };
}

async function getClienteReservas(clienteId) {
    const reservaResponse = await axios.get(`${BASE_URL}/reservas/cliente/${clienteId}`);
    const reservas = await Promise.all(
        reservaResponse.data.map(async (reserva) => {
            const vooResponse = await axios.get(`http://localhost:8085/v1/voos/${reserva.voo_codigo}`);
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
