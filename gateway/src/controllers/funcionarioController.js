const funcionarioService = require('../services/funcionarioService.js')

async function getAllFuncionarios(req, res) {
    try {
        const funcionarios = await funcionarioService.getAllFuncionarios()
        res.status(200).json(funcionarios)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar funcionários', error: error.message })
    }
}

module.exports = {
    getAllFuncionarios,
}