const loginModel = require('../models/loginModel');
const { token } = require('../middlewares/token');

const login = async (codCliente, senha) => {
  const users = await loginModel.login()
  const findUser= users.find((user) => user.codCliente === codCliente && user.senha === senha);
  if (!findUser) return { code: 404, response: { message: 'Cliente não encontrado' } };

  const payload = { codCliente, senha };
  const genToken = token(payload);
  return { code: 200, response: { message: 'Login realizado com sucesso', token: genToken } };
}

module.exports = {
  login,
};