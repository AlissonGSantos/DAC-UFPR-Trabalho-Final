const axios = require('axios')

async function getAllFuncionarios() {
    try {
        //const response = await axios.get('http://localhost:8083/funcionarios')
        //return response.data
        return [
            {
                id: 1,
                nome: 'João Silva',
                cargo: 'Desenvolvedor',
                salario: 5000.00
            },
            {
                id: 2,
                nome: 'Maria Oliveira',
                cargo: 'Gerente de Projetos',
                salario: 8000.00
            },
            {
                id: 3,
                nome: 'Carlos Santos',
                cargo: 'Analista de Sistemas',
                salario: 6000.00
            }
        ]
    } catch (error) {
        throw new Error('Erro ao buscar funcionários')
    }
}

module.exports = {
    getAllFuncionarios,
}