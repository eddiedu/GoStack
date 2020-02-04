import User from '../models/User';

/**
 * Deve ser executado depois do auth
 */
export default async (req, res, next) => {
  // get user
  const user = await User.findByPk(req.userId);
  req.user = user;

  if (user.deliveryman) {
    return res.status(401).json({ error: 'User not authorized' });
  }

  return next();
};
