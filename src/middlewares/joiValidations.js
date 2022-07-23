const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

const validLogin = Joi.object({
  codCliente: Joi.number().required(),
  senha: Joi.string().required(),
});

const validationsLogin = (req, res, next) => {
  const { error } = validLogin.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
  }
  next();
};

const validInv = Joi.object({
  codCliente: Joi.number().required(),
  codAtivo: Joi.string().required(),
  qtdeAtivo: Joi.number().required(),
});

const validationsInvestimentos = (req, res, next) => {
  const { error } = validInv.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
  }
  next();
};

const validcont = Joi.object({
  codCliente: Joi.number().required(),
  valor: Joi.number().required(),
});

const validationsConta = (req, res, next) => {
  const { error } = validcont.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validationsLogin,
  validationsInvestimentos,
  validationsConta,
};