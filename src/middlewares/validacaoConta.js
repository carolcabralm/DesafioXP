const { StatusCodes } = require('http-status-codes');
const contaModel = require('../models/contaModel');

const validacaoDeposito = async (req, res, next) => {
  const { codCliente, valor } = req.body;
  /* const codClienteToken = req.user.codCliente;
  if(codClienteToken !== codCliente) {
    return res.status(401).json({ message: 'Não autorizado' });
  }  */
  if (valor <= 0) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json('Quantidade depositada deve ser maior que zero.');
  }
  next();
};

const validacaoSaque = async (req, res, next) => {
  const { codCliente, valor } = req.body;
  const [saldo] = await contaModel.saldo(codCliente);
  /* const codClienteToken = req.user.codCliente;
  if(codClienteToken !== codCliente) {
    return res.status(401).json({ message: 'Não autorizado' });
  }  */
  if (valor > saldo.saldo) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json('Saldo insuficiente.');
  }
  next();
}

module.exports = {
  validacaoDeposito,
  validacaoSaque,
}