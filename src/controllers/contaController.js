const contaService = require('../services/contaService');

const deposito = async (req, res, next) => {
  const { codCliente, valor } = req.body;
  const { code, response } = await contaService.deposito(codCliente, valor);
  return res.status(code).json(response);
}

const saque = async (req, res, next) => {
  const { codCliente, valor } = req.body;
  const { code, response } = await contaService.saque(codCliente, valor);
  return res.status(code).json(response);
}

module.exports = {
  deposito,
  saque,
}