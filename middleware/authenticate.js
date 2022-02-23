const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const authenticate = async (req, _, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return res.status(403).json({
      message: 'Unauthorized',
    });
  }
  try {
    const { id } = jwt.verify(token, secret);
    const user = await User.findById(id);
    if (!user) {
      return res.status(403).json({
        message: 'Unauthorized',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

module.exports = authenticate;
