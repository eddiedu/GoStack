import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // a virgura é para pular o primerio indice
  // o header era Bearer token e só queria o token
  const [, token] = authHeader.split(' ');

  try {
    // o promisify retorna uma outra funcão
    // por isso ()()
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.UserId = decoded.id;
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }

  return next();
};
