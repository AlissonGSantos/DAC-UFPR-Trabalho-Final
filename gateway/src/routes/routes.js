const express = require("express");
const router = express.Router();
const funcionarioController = require("../controllers/funcionarioController.js");
const clienteController = require("../controllers/clienteController.js");
const autenticacaoController = require("../controllers/autenticacaoController.js");
const verifyJWT = require("../middlewares/verifyJWT.js");

// Rotas de autenticação
router.post("/login", autenticacaoController.login);
router.post("/logout", verifyJWT(["CLIENTE", "FUNCIONARIO"]), autenticacaoController.logout);

// Rotas de clientes
router.get("/clientes", verifyJWT(["CLIENTE"]), clienteController.getAllClientes);
router.get("/clientes/:id", verifyJWT(["CLIENTE"]), clienteController.getClienteById);
router.post("/clientes", verifyJWT(["CLIENTE"]), clienteController.createCliente);
router.get("/clientes/:id/reservas", verifyJWT(["CLIENTE"]));
router.put("/clientes/:id/milhas", verifyJWT(["CLIENTE"]));
router.get("/clientes/:id/milhas", verifyJWT(["CLIENTE"]));

// Rotas de Voos
router.get("/voos", verifyJWT(["CLIENTE"]));
router.get("/voos/:id", verifyJWT(["CLIENTE"]));
router.post("/voos", verifyJWT(["CLIENTE"]));
router.patch("/voos/:id/estado", verifyJWT(["CLIENTE"]));
router.delete("/voos/:id", verifyJWT(["CLIENTE"]));
router.get("/aeroportos", verifyJWT(["CLIENTE"]));

// Rotas de reservas
router.post("/reservas", verifyJWT(["CLIENTE"]));
router.delete("/reservas/:id", verifyJWT(["CLIENTE"]));
router.get("/reservas/:id", verifyJWT(["CLIENTE"]));
router.patch("/reservas/:id/estado", verifyJWT(["CLIENTE"]));

// Rotas de funcionários
router.get("/funcionarios", verifyJWT(["FUNCIONARIO"]), funcionarioController.getAllFuncionarios);
router.get("/funcionarios/:id", verifyJWT(["FUNCIONARIO"]), funcionarioController.getFuncionarioById);
router.post("/funcionarios", verifyJWT(["FUNCIONARIO"]), funcionarioController.createFuncionario);
router.put("/funcionarios/:id", verifyJWT(["FUNCIONARIO"]), funcionarioController.updateFuncionario);
router.delete("/funcionarios/:id", verifyJWT(["FUNCIONARIO"]), funcionarioController.deleteFuncionario);

module.exports = router;
