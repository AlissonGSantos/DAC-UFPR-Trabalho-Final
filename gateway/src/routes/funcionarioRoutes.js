const express = require("express");
const router = express.Router();
const funcionarioController = require("../controllers/funcionarioController.js");
const verifyJWT = require("../middlewares/verifyJWT.js");

// Rota principal para funcionários
router.get(
  "/funcionarios" /*, verifyJWT(['FUNCIONARIO'])*/,
  funcionarioController.getAllFuncionarios
);
router.get("/funcionarios/:id", funcionarioController.getFuncionarioById);
router.post("/funcionarios", funcionarioController.createFuncionario);
router.put("/funcionarios/:id", funcionarioController.updateFuncionario);
router.delete("/funcionarios/:id", funcionarioController.deleteFuncionario);

module.exports = router;
