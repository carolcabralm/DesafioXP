const { StatusCodes } = require('http-status-codes');
const ativosModel = require('../models/ativosModel');

const getByCodCliente = async (codCliente) => {
  const result = await ativosModel.getByCodCLiente(codCliente);
  return { code: StatusCodes.OK, response: result }
}

const getByCodAtivo = async (codAtivo) => {
  const [result] = await ativosModel.getByCodAtivo(codAtivo);
  if (result.length === 0) {
    return { code: StatusCodes.NOT_FOUND, response: { message: 'Ativo não encontrado.' } }
  } return { code: StatusCodes.OK, response: result }
}

const isCodAtivoOuCliente = async (codigo) => {
  const getAtivos = await ativosModel.getAll()
  const isCodAtivo = getAtivos.some((ativo) => ativo.codAtivo === codigo);
  if (isCodAtivo) {
    return getByCodAtivo(codigo);
  } return getByCodCliente(codigo);
}

module.exports = {
  getByCodCliente,
  getByCodAtivo,
  isCodAtivoOuCliente,
}