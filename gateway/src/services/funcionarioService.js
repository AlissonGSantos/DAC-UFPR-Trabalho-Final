const axios = require("axios");

// const BASE_URL = 'http://localhost:8083'; // Para futura integração real com o microserviço

async function getAllFuncionarios() {
  try {
    // const response = await axios.get(`${BASE_URL}/funcionarios`);
    // return response.data;

    return [
      {
        id: 1,
        nome: "João Silva",
        cargo: "Desenvolvedor",
        salario: 5000.0,
      },
      {
        id: 2,
        nome: "Maria Oliveira",
        cargo: "Gerente de Projetos",
        salario: 8000.0,
      },
      {
        id: 3,
        nome: "Carlos Santos",
        cargo: "Analista de Sistemas",
        salario: 6000.0,
      },
    ];
  } catch (error) {
    throw new Error("Erro ao buscar funcionários");
  }
}

async function getFuncionarioById(id) {
  try {
    // const response = await axios.get(`${BASE_URL}/funcionarios/${id}`);
    // return response.data;

    const funcionariosMock = [
      {
        id: 1,
        nome: "João Silva",
        cargo: "Desenvolvedor",
        salario: 5000.0,
      },
      {
        id: 2,
        nome: "Maria Oliveira",
        cargo: "Gerente de Projetos",
        salario: 8000.0,
      },
      {
        id: 3,
        nome: "Carlos Santos",
        cargo: "Analista de Sistemas",
        salario: 6000.0,
      },
      {
        id: 4,
        nome: "Ana Costa",
        cargo: "UX Designer",
        salario: 5500.0,
      },
      {
        id: 5,
        nome: "Ricardo Lima",
        cargo: "Tech Lead",
        salario: 9500.0,
      },
      {
        id: 6,
        nome: "Fernanda Ribeiro",
        cargo: "Product Owner",
        salario: 8700.0,
      },
      {
        id: 7,
        nome: "Lucas Martins",
        cargo: "Scrum Master",
        salario: 7000.0,
      },
    ];

    const funcionario = funcionariosMock.find((f) => f.id === parseInt(id));

    if (!funcionario) {
      throw new Error("Funcionário não encontrado");
    }

    return funcionario;
  } catch (error) {
    throw new Error("Erro ao buscar funcionário por ID");
  }
}

async function createFuncionario(dados) {
  try {
    // const response = await axios.post(`${BASE_URL}/funcionarios`, dados);
    // return response.data;

    return {
      id: Math.floor(Math.random() * 10000),
      ...dados,
    };
  } catch (error) {
    throw new Error("Erro ao criar funcionário");
  }
}

async function updateFuncionario(id, dados) {
  try {
    // const response = await axios.put(`${BASE_URL}/funcionarios/${id}`, dados);
    // return response.data;

    return {
      id: parseInt(id),
      ...dados,
    };
  } catch (error) {
    throw new Error("Erro ao atualizar funcionário");
  }
}

async function deleteFuncionario(id) {
  try {
    // await axios.delete(`${BASE_URL}/funcionarios/${id}`);
    return;
  } catch (error) {
    throw new Error("Erro ao deletar funcionário");
  }
}

module.exports = {
  getAllFuncionarios,
  getFuncionarioById,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario,
};
