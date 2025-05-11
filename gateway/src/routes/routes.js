const express = require("express");
const router = express.Router();
const funcionarioController = require("../controllers/funcionarioController.js");
const clienteController = require("../controllers/clienteController.js");
const autenticacaoController = require("../controllers/autenticacaoController.js");
const verifyJWT = require("../middlewares/verifyJWT.js");
const vooController = require("../controllers/vooController.js");
const reservaController = require("../controllers/reservaController.js");

// Rotas de autenticação
router.post("/login", autenticacaoController.login);
router.post("/logout", verifyJWT(["CLIENTE", "FUNCIONARIO"]), autenticacaoController.logout);

// Rotas de clientes
router.post("/clientes", clienteController.createCliente);
router.get("/clientes", verifyJWT(["CLIENTE"]), clienteController.getAllClientes);
router.get("/clientes/:id", verifyJWT(["CLIENTE"]), clienteController.getClienteById);
router.put("/clientes/:id/milhas", verifyJWT(["CLIENTE"]), clienteController.updateClienteMilhas);
router.get("/clientes/:id/milhas", verifyJWT(["CLIENTE"]), clienteController.getClienteMilhas);
router.get("/clientes/:id/reservas", verifyJWT(["CLIENTE"]), clienteController.getClienteReservas);

// Rotas de Voos
router.get("/voos", verifyJWT(["CLIENTE", "FUNCIONARIO"]), vooController.getAllVoos);
router.get("/voos/:id", verifyJWT(["CLIENTE", "FUNCIONARIO"]), vooController.getVooById);
router.post("/voos", verifyJWT(["FUNCIONARIO"]), vooController.createVoo);
router.patch("/voos/:id/estado", verifyJWT(["FUNCIONARIO"]), vooController.updateVooEstado);
router.delete("/voos/:id", verifyJWT(["FUNCIONARIO"]), vooController.deleteVoo);
router.get("/aeroportos", verifyJWT(["CLIENTE", "FUNCIONARIO"]), vooController.getAllAeroportos);

// Rotas de reservas
router.post("/reservas", verifyJWT(["CLIENTE"]), reservaController.createReserva);
router.delete("/reservas/:id", verifyJWT(["CLIENTE"]), reservaController.deleteReserva);
router.get("/reservas/:id", verifyJWT(["CLIENTE"]), reservaController.getReservaById);
router.patch("/reservas/:id/estado", verifyJWT(["CLIENTE", "FUNCIONARIO"]), reservaController.updateReservaEstado);

// Rotas de funcionários
router.get("/funcionarios", verifyJWT(["FUNCIONARIO"]), funcionarioController.getAllFuncionarios);
router.get("/funcionarios/:id", verifyJWT(["FUNCIONARIO"]), funcionarioController.getFuncionarioById);
router.post("/funcionarios", verifyJWT(["FUNCIONARIO"]), funcionarioController.createFuncionario);
router.put("/funcionarios/:id", verifyJWT(["FUNCIONARIO"]), funcionarioController.updateFuncionario);
router.delete("/funcionarios/:id", verifyJWT(["FUNCIONARIO"]), funcionarioController.deleteFuncionario);

module.exports = router;
