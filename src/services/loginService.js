const loginModel = require('../models/loginModel');
const { token } = require('../middlewares/token');

const login = async (codCliente, nomeCliente) => {
  const users = await loginModel.login()
  const findUser= users.find((user) => user.codCliente === codCliente && user.nomeCliente === nomeCliente);
  if (!findUser) return { code: 404, response: { message: 'Cliente não encontrado' } };

  const payload = { codCliente, nomeCliente };
  const genToken = token(payload);
  return { code: 200, response: { token: genToken } };
}

module.exports = {
  login,
};