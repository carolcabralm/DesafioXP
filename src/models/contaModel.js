const connection = require('./connection');

const deposito = async (codCliente, valor) => {
  const query = 'UPDATE desafio_xp.clientes SET saldo = saldo + ? WHERE codCliente = ?;';
  const [result] = await connection.execute(query, [valor, codCliente]);
  return result;
}

const saque = async (codCliente, valor) => {
  const query = 'UPDATE desafio_xp.clientes SET saldo = saldo - ? WHERE codCliente = ?;';
  const [result] = await connection.execute(query, [valor, codCliente]);
  return result;
}

module.exports = {
  deposito,
  saque,
}