const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController.js");
const verifyJWT = require("../middlewares/verifyJWT.js");

// Rota principal para clientes
router.get(
  "/cliente",
  verifyJWT(["CLIENTE"]),
  clienteController.getAllClientes
);
router.get(
  "/cliente/:id",
  verifyJWT(["CLIENTE"]),
  clienteController.getClienteById
);
router.post(
  "/cliente",
  verifyJWT(["CLIENTE"]),
  clienteController.createCliente
);
router.put(
  "/cliente/:id",
  verifyJWT(["CLIENTE"]),
  clienteController.updateFCliente
);
router.delete(
  "/cliente/:id",
  verifyJWT(["CLIENTE"]),
  clienteController.deleteCliente
);

module.exports = router;
