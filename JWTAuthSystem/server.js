

require('dotenv').config(); // load .env first

const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

// Health route (optional, for quick browser test)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Global error fallback
app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  return res.status(500).json({ message: 'Server error' });
});

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
  console.log(`Auth base URL:      http://localhost:${PORT}/api/auth`);
});