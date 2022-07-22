const { StatusCodes } = require('http-status-codes');
const contaModel = require('../models/contaModel')

const deposito = async (codCliente, valor) => {
  const result = await contaModel.deposito(codCliente, valor);
  return { code: StatusCodes.CREATED, response: { message: 'Depósito realizado com sucesso.' } }
}

const saque = async (codCliente, valor) => {
  const result = await contaModel.saque(codCliente, valor);
  return { code: StatusCodes.CREATED, response: { message: 'Saque realizado com sucesso.' } }
}

const saldo = async (codCliente) => {
  const [result] = await contaModel.saldo(codCliente);
  return { code: StatusCodes.OK, response: result }
}

module.exports = {
  deposito,
  saque,
  saldo,
}