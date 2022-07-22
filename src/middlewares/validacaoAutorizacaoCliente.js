const contaModel = require('../models/contaModel');
const { StatusCodes } = require('http-status-codes');

const autorizacaoCliente = async (req, res, next) => {
  const { codCliente } = req.body;
  const codClienteToken = req.user.codCliente;
  if(codClienteToken !== codCliente) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Acesso negado.' });
  } 
  next();
};

const autorizacaoClienteParams = async (req, res, next) => {
  const { codCliente } = req.params;
  const codClienteToken = req.user.codCliente;
  if(codClienteToken !== +codCliente) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Acesso negado.' });
  } 
  next();
};

module.exports = {
  autorizacaoCliente,
  autorizacaoClienteParams,
}