const investimentosService = require('../services/investimentoService');

const investimentosComprar = async (req, res, next) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const { code, response } = await investimentosService.ativosComprar(codCliente, codAtivo, qtdeAtivo);
  return res.status(code).json(response);
}

const investimentosVender = async (req, res, next) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const { code, response } = await investimentosService.ativosVender(codCliente, codAtivo, qtdeAtivo);
  return res.status(code).json(response);
}

module.exports = {
  investimentosComprar,
  investimentosVender,
}