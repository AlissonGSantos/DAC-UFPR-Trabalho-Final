// DESATIVAR DEPOIS


require("dotenv-safe").config();
const express = require("express");
let http = require("http");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
let logger = require("morgan");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let httpProxy = require("express-http-proxy");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const authServiceProxy = httpProxy('http://localhost:8081', {
  proxyReqPathResolver: (req) => `/v1/auth${req.url}`
});
const clienteServiceProxy = httpProxy('http://localhost:8082', {
  proxyReqPathResolver: (req) => `/v1/clientes${req.url}`
});
const funcionarioServiceProxy = httpProxy('http://localhost:8083', {
  proxyReqPathResolver: (req) => `/v1/funcionario${req.url}`
});
const reservaServiceProxy = httpProxy('http://localhost:8084', {
  proxyReqPathResolver: (req) => `/v1/reserva${req.url}`
});
const vooServiceProxy = httpProxy('http://localhost:8085', {
  proxyReqPathResolver: (req) => `/v1/voo${req.url}`
});

app.use('/v1/auth', authServiceProxy);
app.use('/v1/reserva', reservaServiceProxy);
app.use('/v1/clientes', clienteServiceProxy);
app.use('/v1/voo', vooServiceProxy);
app.use('/v1/funcionario', funcionarioServiceProxy);

const server = http.createServer(app);
server.listen(3000);