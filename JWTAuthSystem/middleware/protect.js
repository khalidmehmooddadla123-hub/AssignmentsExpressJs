const jwt = require('jsonwebtoken');
const users = require('../data/users');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_change_me';

function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  // Missing token => 401
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = users.find((u) => u.id === decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    // Attach safe user object to req.user
    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    // Invalid or expired token => 403
    return res.status(403).json({ message: 'Forbidden, invalid or expired token' });
  }
}

module.exports = protect;