const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController.js');
const verifyJWT = require('../middlewares/verifyJWT.js');

// Descomentar o verifyJWT quando o serviço de autenticação estiver implementado
router.get('/funcionarios'/*, verifyJWT(['FUNCIONARIO'])*/, funcionarioController.getAllFuncionarios);

module.exports = router;