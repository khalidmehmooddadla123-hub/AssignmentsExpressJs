const express = require('express');
const {
  register,
  login,
  getMe,
  logout,
  adminOnly,
  adminOrUser,
} = require('../controllers/authController');
const protect = require('../middleware/protect');
const authorize = require('../middleware/authorize');

const router = express.Router();
//
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Auth API working' });
});

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected route
router.get('/me', protect, getMe);

// Role-based test routes
router.get('/admin-only', protect, authorize('admin'), adminOnly);
router.get('/admin-or-user', protect, authorize('admin', 'user'), adminOrUser);

module.exports = router;