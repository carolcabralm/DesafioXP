const ativosModel = require('../models/ativosModel');

const getByCodCliente = async (codCliente) => {
  const result = await ativosModel.getByCodCLiente(codCliente);
  /* if (result.length === 0) {
    return { code: 404, response: { message: 'Cliente não encontrado' } }
  } */ return { code: 201, response: result }
}

const getByCodAtivo = async (codAtivo) => {
  const [result] = await ativosModel.getByCodAtivo(codAtivo);
  if (result.length === 0) {
    return { code: 404, response: { message: 'Ativo não encontrado' } }
  } return { code: 201, response: result }
}

const isCodAtivoOuCliente = async (codigo) => {
  const getAtivos = await ativosModel.getAll()
  const isCodAtivo = getAtivos.some((ativo) => ativo.codAtivo === codigo);
  return isCodAtivo;
}

module.exports = {
  getByCodCliente,
  getByCodAtivo,
  isCodAtivoOuCliente,
}