import User from '../models/User';

export default async (req, res, next) => {
  const checkUserProvider = await User.findOne({
    where: {
      id: req.userId,
      provider: true,
    },
  });

  if (!checkUserProvider) {
    // 401 não autorizado
    return res
      .status(401)
      .json({ error: 'You must be a provider to do this action' });
  }

  return next();
};
