const ativosService = require('../services/ativosService');

const getByCodAtivoOuCliente = async (req, res) => {
  const { codigo } = req.params;
  const { code, response } = await ativosService.isCodAtivoOuCliente(codigo);
  return res.status(code).json(response);
}

module.exports = {
  getByCodAtivoOuCliente,
}