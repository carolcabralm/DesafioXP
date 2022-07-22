const ativosModel = require('../models/ativosModel');
const investimentosModel = require('../models/investimentosModel');
const { StatusCodes } = require('http-status-codes');

const validacaoInvestimentosComprar = async (req, res, next) => {
  const { /* codCliente,  */codAtivo, qtdeAtivo } = req.body;
  const [quantidadeAtivo] = await ativosModel.getQtdeAtivo(codAtivo);
  // const codClienteToken = req.user.codCliente;
  const getArrayAtivos = await ativosModel.getAll();
  const findAtivo = getArrayAtivos.filter((ativo) => ativo.codAtivo === codAtivo);

  /* if(codClienteToken !== codCliente) {
    return res.status(401).json({ message: 'Não autorizado' });
  } */
  if (findAtivo.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Ativo não encontrado.' });
  } 

  if(qtdeAtivo > quantidadeAtivo.qtdeAtivo) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json('Quantidade de ativo disponível menor que a desejada.');
  } 
  next();
}

const validacaoInvestimentosVender = async (req, res, next) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const [quantidadeAtivo] = await investimentosModel.getQtdeAtivoCarteira(codCliente, codAtivo);
  // const codClienteToken = req.user.codCliente;
  /* if(codClienteToken !== codCliente) {
    return res.status(401).json({ message: 'Não autorizado' });
  }  */
  if (quantidadeAtivo === undefined) {
    return res.status(StatusCodes.NOT_FOUND).json('Ativo inexistente na carteira.');
  }
  if(qtdeAtivo > quantidadeAtivo.qtdeAtivo) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json('Quantidade de ativo disponível em carteira menor que a desejada para venda.');
  }
  next();
}

module.exports = {
  validacaoInvestimentosComprar,
  validacaoInvestimentosVender,
}