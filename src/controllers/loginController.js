const loginService = require('../services/loginService');

const login = async (req, res, next) => {
  const { codCliente, nomeCliente } = req.body;
  const { code, response } = await loginService.login(codCliente, nomeCliente);
  res.status(code).json(response);
};

module.exports = {
  login,
}