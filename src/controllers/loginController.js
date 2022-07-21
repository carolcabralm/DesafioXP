const loginService = require('../services/loginService');

const login = async (req, res, next) => {
  const { codCliente, senha } = req.body;
  const { code, response } = await loginService.login(codCliente, senha);
  res.status(code).json(response);
};

module.exports = {
  login,
}