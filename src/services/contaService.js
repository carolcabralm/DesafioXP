const contaModel = require('../models/contaModel')

const deposito = async (codCliente, valor) => {
  const result = await contaModel.deposito(codCliente, valor);
  return { code: 201, response: { message: 'Depósito realizado com sucesso.' } }
}

const saque = async (codCliente, valor) => {
  const result = await contaModel.saque(codCliente, valor);
  return { code: 201, response: { message: 'Saque realizado com sucesso.' } }
}

const saldo = async (codCliente) => {
  const [result] = await contaModel.saldo(codCliente);
  return { code: 200, response: result }
}

module.exports = {
  deposito,
  saque,
  saldo,
}