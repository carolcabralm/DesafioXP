const ativosModel = require('../models/ativosModel');
const investimentosModel = require('../models/investimentosModel');
const { StatusCodes } = require('http-status-codes');

const validacaoInvestimentosComprar = async (req, res, next) => {
  const { codAtivo, qtdeAtivo } = req.body;
  const [quantidadeAtivo] = await ativosModel.getQtdeAtivo(codAtivo);
  const getArrayAtivos = await ativosModel.getAll();
  const findAtivo = getArrayAtivos.filter((ativo) => ativo.codAtivo === codAtivo);

  if (findAtivo.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Ativo não encontrado.' });
  } 

  if(qtdeAtivo > quantidadeAtivo.qtdeAtivo) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: 'Quantidade de ativo disponível menor que a desejada.' });
  } 
  next();
};

const validacaoInvestimentosVender = async (req, res, next) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const [quantidadeAtivo] = await investimentosModel.getQtdeAtivoCarteira(codCliente, codAtivo);
  
  if (quantidadeAtivo === undefined) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Ativo inexistente na carteira.' });
  }
  if(qtdeAtivo > quantidadeAtivo.qtdeAtivo) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: 'Quantidade de ativo disponível em carteira menor que a desejada para venda.' });
  }
  next();
};

module.exports = {
  validacaoInvestimentosComprar,
  validacaoInvestimentosVender,
};
