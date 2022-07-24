const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM desafio_xp.ativos;';
  const [result] = await connection.execute(query);
  return result;
};

const getByCodCLiente = async (codCliente) => {
  const query = 'SELECT c.codCliente, c.codAtivo, c.qtdeAtivo, a.precoAtivo AS valor FROM desafio_xp.carteira AS c INNER JOIN desafio_xp.ativos AS a ON c.codAtivo = a.codAtivo WHERE codCliente = ?;';
  const [result] = await connection.execute(query, [codCliente]);
  return result;
};

const getByCodAtivo = async (codAtivo) => {
  const query = 'SELECT * FROM desafio_xp.ativos WHERE codAtivo = ?;';
  const [result] = await connection.execute(query, [codAtivo]);
  return result;
};

const getQtdeAtivo = async (codAtivo) => {
  const query = 'SELECT qtdeAtivo FROM desafio_xp.ativos WHERE codAtivo = ?;';
  const [result] = await connection.execute(query, [codAtivo]);
  return result;
};

module.exports = {
  getAll,
  getByCodCLiente,
  getByCodAtivo,
  getQtdeAtivo,
};