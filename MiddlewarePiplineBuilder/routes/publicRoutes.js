const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({
    success: true,
    message: 'Public route is working'
  });
});


router.get('/error-test', (req, res, next) => {
  next(new Error('Test error'));
});

module.exports = router;