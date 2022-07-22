const loginModel = require('../models/loginModel');
const { token } = require('../middlewares/token');
// import { ReasonPhrases, StatusCodes } from 'http-status-codes';
const { StatusCodes } = require('http-status-codes');

const login = async (codCliente, senha) => {
  const users = await loginModel.login()
  const findUser= users.find((user) => user.codCliente === codCliente && user.senha === senha);
  if (!findUser) return { code: StatusCodes.NOT_FOUND, response: { message: 'Usuário ou senha incorretos. Favor verificar seu dados.' } };

  const payload = { codCliente, senha };
  const genToken = token(payload);
  return { code: StatusCodes.OK, response: { message: 'Login realizado com sucesso.', token: genToken } };
}

module.exports = {
  login,
};