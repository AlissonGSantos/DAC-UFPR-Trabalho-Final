const axios = require("axios");

// const BASE_URL = 'http://localhost:8083'; // Para futura integração real com o microserviço

async function getAllClientes() {
  try {
    // const response = await axios.get(`${BASE_URL}/funcionarios`);
    // return response.data;

    return [
      {
        id: 11,
        nome: "João Silva",
      },
      {
        id: 12,
        nome: "Maria Oliveira",
      },
      {
        id: 13,
        nome: "Carlos Santos",
      },
    ];
  } catch (error) {
    throw new Error("Erro ao buscar cliente");
  }
}

async function getClienteById(id) {
  try {
    // const response = await axios.get(`${BASE_URL}/funcionarios/${id}`);
    // return response.data;

    const clientesMock = [
      {
        id: 11,
        nome: "João Silva",
      },
      {
        id: 12,
        nome: "Maria Oliveira",
      },
      {
        id: 13,
        nome: "Carlos Santos",
      },
      {
        id: 14,
        nome: "Ana Costa",
      },
      {
        id: 15,
        nome: "Ricardo Lima",
      },
      {
        id: 16,
        nome: "Fernanda Ribeiro",
      },
      {
        id: 17,
        nome: "Lucas Martins",
      },
    ];

    const cliente = clientesMock.find((f) => f.id === parseInt(id));

    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }

    return cliente;
  } catch (error) {
    throw new Error("Erro ao buscar cliente por ID");
  }
}

async function createCliente(dados) {
  try {
    // const response = await axios.post(`${BASE_URL}/funcionarios`, dados);
    // return response.data;

    return {
      id: Math.floor(Math.random() * 10000),
      ...dados,
    };
  } catch (error) {
    throw new Error("Erro ao criar cliente");
  }
}

async function updateCliente(id, dados) {
  try {
    // const response = await axios.put(`${BASE_URL}/funcionarios/${id}`, dados);
    // return response.data;

    return {
      id: parseInt(id),
      ...dados,
    };
  } catch (error) {
    throw new Error("Erro ao atualizar cliente");
  }
}

async function deleteCliente(id) {
  try {
    // await axios.delete(`${BASE_URL}/funcionarios/${id}`);
    return;
  } catch (error) {
    throw new Error("Erro ao deletar cliente");
  }
}

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};
