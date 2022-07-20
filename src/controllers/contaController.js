const contaService = require('../services/contaService');

const deposito = async (req, res, next) => {
  const { codCliente, valor } = req.body;
  const { code, response } = await contaService.deposito(codCliente, valor);
  const codClienteToken = req.user.codCliente;
  // console.log('CTOKEN CCLIENTE', codClienteToken, codCliente)
  if(codClienteToken !== codCliente) {
    return res.status(401).json({ message: 'Não autorizado' });
  } 
  return res.status(code).json(response);
}

const saque = async (req, res, next) => {
  const { codCliente, valor } = req.body;
  const { code, response } = await contaService.saque(codCliente, valor);
  const codClienteToken = req.user.codCliente;
  if(codClienteToken !== codCliente) {
    return res.status(401).json({ message: 'Não autorizado' });
  } 
  return res.status(code).json(response);
}

const saldo = async (req, res, next) => {
  const { codCliente } = req.params;
  const { code, response } = await contaService.saldo(codCliente);
  return res.status(code).json({codCliente, ...response});
}

module.exports = {
  deposito,
  saque,
  saldo,
}