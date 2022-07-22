const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '12h',
  algorithm: 'HS256',
}

const token = (payload) => jwt.sign(payload, JWT_SECRET, jwtConfig);

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) {
    return res.status(401).json({ message: 'Usuário não logado.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: 'Sessão expirada. Realize login novamente para continuar.' });
  }
  next();
}

module.exports = { 
  token,
  auth,
 };