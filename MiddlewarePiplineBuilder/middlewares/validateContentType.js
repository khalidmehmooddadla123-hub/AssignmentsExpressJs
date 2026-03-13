module.exports = (req, res, next) => {
  const methodsToValidate = ['POST', 'PUT'];

  if (methodsToValidate.includes(req.method)) {
    const contentType = req.headers['content-type'] || '';

    if (!contentType.toLowerCase().includes('application/json')) {
      return res.status(415).json({
        success: false,
        error: {
          message: 'Unsupported Media Type. Use Content-Type: application/json'
        }
      });
    }
  }

  next();
};