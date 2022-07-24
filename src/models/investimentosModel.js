const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM desafio_xp.carteira;';
  const [result] = await connection.execute(query);
  return result;
};

const addAtivoExistente = async (codCliente, codAtivo, qtdeAtivo) => {
  const query = 'UPDATE desafio_xp.carteira SET qtdeAtivo = qtdeAtivo + ? WHERE codAtivo = ? AND codCLiente = ?;';
  const [result] = await connection.execute(query, [qtdeAtivo, codAtivo, codCliente]);
  return result;
};

const addAtivoNovo = async (codCliente, codAtivo, qtdeAtivo) => {
  const query = 'INSERT INTO desafio_xp.carteira (codAtivo, qtdeAtivo, codCliente) VALUES (?, ?, ?);'
  const [result] = await connection.execute(query, [codAtivo, qtdeAtivo, codCliente]);
  return result;
};

const removeAtivoExistente = async (codCliente, codAtivo, qtdeAtivo) => {
  const query = 'UPDATE desafio_xp.carteira SET qtdeAtivo = qtdeAtivo - ? WHERE codAtivo = ? AND codCLiente = ?;';
  const [result] = await connection.execute(query, [qtdeAtivo, codAtivo, codCliente]);
  return result;
};

const precoAtivo = async (codAtivo) => {
  const query = 'SELECT precoAtivo FROM desafio_xp.ativos WHERE codAtivo = ?;';
  const [precoUnitAtivo] = await connection.execute(query,[codAtivo]);
  return precoUnitAtivo;
};

const getQtdeAtivoCarteira = async (codCliente, codAtivo) => {
  const query = 'SELECT qtdeAtivo FROM desafio_xp.carteira WHERE codCliente = ? AND codAtivo = ?;';
  const [result] = await connection.execute(query,[codCliente, codAtivo]);
  return result;
};

module.exports = {
  getAll,
  addAtivoExistente,
  addAtivoNovo,
  removeAtivoExistente,
  precoAtivo,
  getQtdeAtivoCarteira,
};