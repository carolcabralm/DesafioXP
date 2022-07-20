const loginModel = require('../models/loginModel');
const { token } = require('../middlewares/token');

const login = async (codCliente, nomeCliente) => {
  const users = await loginModel.login()
  const findUser= users.find((user) => user.codCliente === codCliente && user.nomeCliente === nomeCliente);
  if (!findUser) return { code: 404, response: { message: 'Cliente não encontrado' } };

  const payload = { codCliente, nomeCliente };
  // console.log('HEIN', token(payload))
  const genToken = token(payload);
  // console.log('GENTOKEN', genToken)
  return { code: 200, response: { token: genToken } };
}

module.exports = {
  login,
};