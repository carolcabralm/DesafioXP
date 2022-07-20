const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '12h',
  algorithm: 'HS256',
}

const token = (payload) => jwt.sign(payload, JWT_SECRET, jwtConfig);
// console.log('TOKEN', typeof(token));

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
}

module.exports = { 
  token,
  auth,
 };