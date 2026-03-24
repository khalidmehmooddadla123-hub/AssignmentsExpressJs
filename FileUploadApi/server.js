require('dotenv').config();
const express = require('express');
const path = require('path');
const multer = require('multer');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
app.use(express.json());

// static serving for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api', uploadRoutes);

// health check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'File Upload API is running' });
});

// Multer + file type errors => 400
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Max size is 2MB.' });
    }
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  }

  if (err.message && err.message.includes('Invalid file type')) {
    return res.status(400).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Internal server error' });
});

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});