const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../data/users');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_change_me';
const SALT_ROUNDS = 12;

// Helper to hide password before returning user
function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

// POST /api/auth/register
async function register(req, res) {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'username, email, and password are required',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = users.find((u) => u.email === normalizedEmail);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = {
      id: users.length + 1,
      username: username.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: role && ['admin', 'user'].includes(role) ? role : 'user',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    return res.status(201).json({
      message: 'User registered successfully',
      user: sanitizeUser(newUser),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed' });
  }
}

// POST /api/auth/login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = users.find((u) => u.email === normalizedEmail);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1m' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed' });
  }
}

// GET /api/auth/me (protected)
function getMe(req, res) {
  return res.status(200).json({
    message: 'Current user profile',
    user: req.user,
  });
}

// POST /api/auth/logout
function logout(req, res) {

  return res.status(200).json({
    message: 'Logged out successfully',
  });
}

// GET /api/auth/admin-only 
function adminOnly(req, res) {
  return res.status(200).json({
    message: `Welcome Admin ${req.user.username}`,
  });
}

// GET /api/auth/admin-or-user 
function adminOrUser(req, res) {
  return res.status(200).json({
    message: `Welcome ${req.user.role} ${req.user.username}`,
  });
}

module.exports = {
  register,
  login,
  getMe,
  logout,
  adminOnly,
  adminOrUser,
};