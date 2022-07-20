const connection = require('./connection');

/* const login = async (codCliente, nomeCliente) => {
  const query = 'SELECT codCliente, nomeCliente FROM desafio_xp.clientes WHERE codCliente = ? AND nomeCliente = ?;';
  const [result] = await connection.execute(query, [codCliente, nomeCliente]);
  return result;
} */

const login = async () => {
  const query = 'SELECT * FROM desafio_xp.clientes;';
  const [result] = await connection.execute(query);
  console.log('LOGINMODEL', result)
  return result;
}

module.exports = {
  login,
};