const ativosModel = require('../models/ativosModel');
const investimentosModel = require('../models/investimentosModel');

const validacaoInvestimentosComprar = async (req, res, next) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const [quantidadeAtivo] = await ativosModel.getQtdeAtivo(codAtivo);
  const codClienteToken = req.user.codCliente;
  if(codClienteToken !== codCliente) {
    return res.status(401).json({ message: 'Não autorizado' });
  } 

  if(qtdeAtivo > quantidadeAtivo.qtdeAtivo) {
    return res.status(406).json('Quantidade de ativo disponível menor que a desejada.');
  } 
  next();
}

const validacaoInvestimentosVender = async (req, res, next) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const [quantidadeAtivo] = await investimentosModel.getQtdeAtivoCarteira(codCliente, codAtivo);
  const codClienteToken = req.user.codCliente;
  console.log('TOKEN CLIENTE', codClienteToken, codCliente)
  if(codClienteToken !== codCliente) {
    return res.status(401).json({ message: 'Não autorizado' });
  } 
  if (quantidadeAtivo === undefined) {
    return res.status(406).json('Ativo inexistente na carteira.');
  }
  if(qtdeAtivo > quantidadeAtivo.qtdeAtivo) {
    return res.status(406).json('Quantidade de ativo disponível menor que a desejada para venda.');
  }
  next();
}

module.exports = {
  validacaoInvestimentosComprar,
  validacaoInvestimentosVender,
}