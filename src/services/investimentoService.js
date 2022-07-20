const investimentosModel = require('../models/investimentosModel');
const contaModel = require('../models/contaModel');

const ativosComprar = async (codCliente, codAtivo, qtdeAtivo) => {
  const getArray = await investimentosModel.getAll();
  const findCliente = getArray.filter((cliente) => cliente.codCliente === codCliente)   
  
  if (findCliente.length === 0) {
    return { code: 404, response: { message: 'Cliente não encontrado' } };
  } 
  if (findCliente.some((ativo) => ativo.codAtivo === codAtivo)  ) {
    await investimentosModel.addAtivoExistente(codCliente, codAtivo, qtdeAtivo);
    const valor = await valorTotalAtivo(codAtivo, qtdeAtivo);
    await contaModel.saque(codCliente, valor);
    const [saldo] = await contaModel.saldo(codCliente);
    // console.log('valor saldo', valor, saldo)
    if (valor > saldo.saldo) {
      return { code: 200, response: { message: 'Saldo insuficiente' } };
    } 
    return { code: 201, response: { message: `Ativo adicionado com sucesso. Seu saldo atual é de ${saldo.saldo}` }
    };
  }
    await investimentosModel.addAtivoNovo(codCliente, codAtivo, qtdeAtivo);
    const valor = await valorTotalAtivo(codAtivo, qtdeAtivo);
    await contaModel.saque(codCliente, valor);
    const [saldo] = await contaModel.saldo(codCliente);
    if (valor < saldo.saldo) {
      return { code: 200, response: { message: 'Saldo insuficiente' } };
    } 
    return { code: 201, response: { message: `Ativo inserido com sucesso. Seu saldo atual é de ${saldo.saldo}` }
    };
}

const ativosVender = async (codCliente, codAtivo, qtdeAtivo) => {
  const getArray = await investimentosModel.getAll();
  const findCliente = getArray.filter((cliente) => cliente.codCliente === codCliente)   
  
  if (findCliente.length === 0) {
    return { code: 404, response: { message: 'Cliente não encontrado' } };
  } await investimentosModel.removeAtivoExistente(codCliente, codAtivo, qtdeAtivo);
  const valor = await valorTotalAtivo(codAtivo, qtdeAtivo);
  await contaModel.deposito(codCliente, valor);
  const [saldo] = await contaModel.saldo(codCliente)
  return { code: 201, response: { message: `Ativo removido com sucesso. Seu saldo atual é de ${saldo.saldo}` } }
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