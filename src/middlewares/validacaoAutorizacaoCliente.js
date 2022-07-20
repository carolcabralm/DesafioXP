const autorizacaoCliente = async (req, res, next) => {
  console.log('CERTAO', req)
  const { codCliente } = req.body;
  const codClienteToken = req.user.codCliente;
  if(codClienteToken !== codCliente) {
    return res.status(401).json({ message: 'Não autorizado???' });
  } 
  next();
};

const autorizacaoClienteParams = async (req, res, next) => {
  const { codCliente } = req.params;
  const codClienteToken = req.user.codCliente;
  if(codClienteToken !== +codCliente) {
    return res.status(401).json({ message: 'Não autorizado???' });
  } 
  next();
};

module.exports = {
  autorizacaoCliente,
  autorizacaoClienteParams
}