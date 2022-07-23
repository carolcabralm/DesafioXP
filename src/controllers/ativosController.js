const ativosService = require('../services/ativosService');

const getByCodAtivoOuCliente = async (req, res) => {
  const { codigo } = req.params;
  const codClienteToken = req.user.codCliente;
  const { code, response } = await ativosService.isCodAtivoOuCliente(codigo, codClienteToken);
  return res.status(code).json(response);
}

module.exports = {
  getByCodAtivoOuCliente,
}