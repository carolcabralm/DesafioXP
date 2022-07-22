const contaService = require('../services/contaService');

const deposito = async (req, res) => {
  const { codCliente, valor } = req.body;
  const { code, response } = await contaService.deposito(codCliente, valor);
  return res.status(code).json(response);
}

const saque = async (req, res) => {
  const { codCliente, valor } = req.body;
  const { code, response } = await contaService.saque(codCliente, valor);
  return res.status(code).json(response);
}

const saldo = async (req, res) => {
  const { codCliente } = req.params;
  const { code, response } = await contaService.saldo(codCliente);
  return res.status(code).json({codCliente, ...response});
}

module.exports = {
  deposito,
  saque,
  saldo,
}