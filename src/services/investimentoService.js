const investimentosModel = require('../models/investimentosModel');
const contaModel = require('../models/contaModel');
const { StatusCodes } = require('http-status-codes');

const addAtivoNovo = async (codCliente, codAtivo, qtdeAtivo) => {
  await investimentosModel.addAtivoNovo(codCliente, codAtivo, qtdeAtivo);
    const valor = await valorTotalAtivo(codAtivo, qtdeAtivo);
    await contaModel.saque(codCliente, valor);
    const [saldo] = await contaModel.saldo(codCliente);
    if (valor < saldo.saldo) {
      return { code: StatusCodes.BAD_REQUEST, response: { message: 'Saldo insuficiente.' } };
    } 
    return { code: StatusCodes.CREATED, response: { message: `Ativo inserido com sucesso. Seu saldo atual é de ${saldo.saldo}.` }
    };
};

const addAtivoExistente = async (codCliente, codAtivo, qtdeAtivo) => {
  await investimentosModel.addAtivoExistente(codCliente, codAtivo, qtdeAtivo);
    const valor = await valorTotalAtivo(codAtivo, qtdeAtivo);
    await contaModel.saque(codCliente, valor);
    const [saldo] = await contaModel.saldo(codCliente);
    if (valor > saldo.saldo) {
      return { code: StatusCodes.BAD_REQUEST, response: { message: 'Saldo insuficiente.' } };
    } 
    return { code: StatusCodes.CREATED, response: { message: `Ativo adicionado com sucesso. Seu saldo atual é de ${saldo.saldo}.` }
    };
};

const ativosComprar = async (codCliente, codAtivo, qtdeAtivo) => {
  const getArray = await investimentosModel.getAll();
  const findCliente = getArray.filter((cliente) => cliente.codCliente === codCliente);
  
  if (findCliente.some((ativo) => ativo.codAtivo === codAtivo)) {
    return addAtivoExistente(codCliente, codAtivo, qtdeAtivo);
  } return addAtivoNovo(codCliente, codAtivo, qtdeAtivo);
};

const ativosVender = async (codCliente, codAtivo, qtdeAtivo) => {
  await investimentosModel.removeAtivoExistente(codCliente, codAtivo, qtdeAtivo);
  const valor = await valorTotalAtivo(codAtivo, qtdeAtivo);
  await contaModel.deposito(codCliente, valor);
  const [saldo] = await contaModel.saldo(codCliente)
  return { code: StatusCodes.CREATED, response: { message: `Ativo removido com sucesso. Seu saldo atual é de ${saldo.saldo}.` } }
}

const valorTotalAtivo = async (codAtivo, qtdeAtivo) => {
  const [precoAtivo] = await investimentosModel.precoAtivo(codAtivo);
  const preco = Number(precoAtivo.precoAtivo)
  const valor = preco * qtdeAtivo;
  return valor
}

module.exports = {
  ativosComprar,
  ativosVender,
}