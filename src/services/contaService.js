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
  console.log('ERROSERVICE', result)
  return { code: 201, response: result }
}

module.exports = {
  deposito,
  saque,
  saldo,
}