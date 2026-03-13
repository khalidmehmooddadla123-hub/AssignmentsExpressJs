const express = require('express');
const router = express.Router();

router.get('/data', (req, res) => {
  res.json({
    success: true,
    message: 'Protected data accessed successfully'
  });
});

router.post('/update', (req, res) => {
  res.json({
    success: true,
    message: 'Protected POST route with valid API key and JSON Content-Type',
    body: req.body
  });
});



module.exports = router;