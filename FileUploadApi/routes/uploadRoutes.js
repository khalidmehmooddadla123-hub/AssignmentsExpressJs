const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const { uploadAvatar, uploadGallery } = require('../controllers/uploadController');
const { addClient, removeClient } = require('../events/sseClients');

const router = express.Router();

// SSE endpoint: GET /api/events/uploads
router.get('/events/uploads', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // helpful for some proxies
  res.flushHeaders?.();

  res.write(`data: ${JSON.stringify({ message: 'Connected to upload events' })}\n\n`);

  addClient(res);

  req.on('close', () => {
    removeClient(res);
  });
});

// single avatar upload
router.post('/upload/avatar', upload.single('avatar'), uploadAvatar);

// gallery upload (max 6)
router.post('/upload/gallery', upload.array('gallery', 6), uploadGallery);

module.exports = router;