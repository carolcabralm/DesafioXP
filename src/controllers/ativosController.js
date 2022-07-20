const ativosService = require('../services/ativosService');

const getByCodAtivoOuCliente = async (req, res, next) => {
 /*  const codClienteToken = req.user.codCliente;
  const { codCliente } = req.body
  if(codClienteToken !== codCliente) {
    return res.status(401).json({ message: 'Não autorizado' });
  }  */
  const { codigo } = req.params;
  const isCodAtivo = await ativosService.isCodAtivoOuCliente(codigo);
  if (!isCodAtivo) {
    const { code, response } = await ativosService.getByCodCliente(codigo);
    return res.status(code).json(response);
  }
  if (isCodAtivo) {
    const { code, response } = await ativosService.getByCodAtivo(codigo);
    return res.status(code).json(response);
  }
};

module.exports = {
  getByCodAtivoOuCliente,
}