module.exports = (err, req, res, next) => {
  console.error('--- Global Error Handler ---');
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
  
};