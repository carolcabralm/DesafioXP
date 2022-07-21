const connection = require('./connection');

const login = async () => {
  const query = 'SELECT * FROM desafio_xp.clientes;';
  const [result] = await connection.execute(query);
  return result;
}

module.exports = {
  login,
};