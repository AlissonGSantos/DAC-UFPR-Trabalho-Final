const express = require("express");
const router = express.Router();
const funcionarioController = require("../controllers/funcionarioController.js");
const verifyJWT = require("../middlewares/verifyJWT.js");

// Rota principal para funcionários
router.get("/funcionarios", verifyJWT(['FUNCIONARIO']), funcionarioController.getAllFuncionarios);
router.get("/funcionarios/:id", verifyJWT(['FUNCIONARIO']), funcionarioController.getFuncionarioById);
router.post("/funcionarios", verifyJWT(['FUNCIONARIO']), funcionarioController.createFuncionario);
router.put("/funcionarios/:id", verifyJWT(['FUNCIONARIO']), funcionarioController.updateFuncionario);
router.delete("/funcionarios/:id", verifyJWT(['FUNCIONARIO']), funcionarioController.deleteFuncionario);

module.exports = router;
