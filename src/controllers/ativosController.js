const ativosService = require('../services/ativosService');

const getByCodAtivoOuCliente = async (req, res, next) => {
  const { codigo } = req.params;
  const isCodAtivo = await ativosService.isCodAtivoOuCliente(codigo);
  if (!isCodAtivo) {
    const codClienteToken = req.user.codCliente;
    if(codClienteToken !== +codigo) return res.status(401).json({ message: 'Não autorizado' });
    
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