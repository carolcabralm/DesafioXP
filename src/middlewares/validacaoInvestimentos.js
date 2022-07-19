const ativosModel = require('../models/ativosModel');
const investimentosModel = require('../models/investimentosModel');

const validacaoInvestimentosComprar = async (req, res, next) => {
  const { codAtivo, qtdeAtivo } = req.body;
  const [quantidadeAtivo] = await ativosModel.getQtdeAtivo(codAtivo);

  if(qtdeAtivo > quantidadeAtivo.qtdeAtivo) {
    return res.status(406).json('Quantidade de ativo disponível menor que a desejada.');
  } 
  next();
}

const validacaoInvestimentosVender = async (req, res, next) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const [quantidadeAtivo] = await investimentosModel.getQtdeAtivoCarteira(codCliente, codAtivo);

  if(qtdeAtivo > quantidadeAtivo.qtdeAtivo) {
    return res.status(406).json('Quantidade de ativo disponível menor que a desejada para venda.');
  }
  next();
}

module.exports = {
  validacaoInvestimentosComprar,
  validacaoInvestimentosVender,
}