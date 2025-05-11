const autenticacaoService = require("../services/autenticacaoService.js");

async function login(req, res) {
  try {
    const data = await autenticacaoService.login(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: true,
      status: error.response?.status || 500,
      message: error.response?.message || error.response?.data?.message || "Erro ao realizar login"
    });
  }
}

async function logout(req, res) {
  try {
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({
      error: true,
      status: 500,
      message: "Erro ao realizar logout"
    });
  }
}

module.exports = {
  login,
  logout,
};
