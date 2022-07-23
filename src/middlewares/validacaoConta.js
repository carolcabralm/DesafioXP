const { StatusCodes } = require('http-status-codes');
const contaModel = require('../models/contaModel');

const validacaoDeposito = async (req, res, next) => {
  const { valor } = req.body;
  if (valor <= 0) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: 'Quantidade depositada deve ser maior que zero.' });
  }
  next();
};

const validacaoSaque = async (req, res, next) => {
  const { codCliente, valor } = req.body;
  const [saldo] = await contaModel.saldo(codCliente);
  if (valor > saldo.saldo) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: 'Saldo insuficiente.' });
  }
  next();
}

module.exports = {
  validacaoDeposito,
  validacaoSaque,
}
