const contaModel = require('../models/contaModel');

const validacaoDeposito = async (req, res, next) => {
  const { valor } = req.body;
  if (valor <= 0) {
    return res.status(406).json('Quantidade depositada deve ser maior que zero.');
  }
  next();
};

const validacaoSaque = async (req, res, next) => {
  const { codCliente, valor } = req.body;
  const [saldo] = await contaModel.saldo(codCliente);
  console.log('SALDO', codCliente)
  if (valor > saldo.saldo) {
    return res.status(406).json('Saldo insuficiente');
  }
  next();
}

module.exports = {
  validacaoDeposito,
  validacaoSaque,
}