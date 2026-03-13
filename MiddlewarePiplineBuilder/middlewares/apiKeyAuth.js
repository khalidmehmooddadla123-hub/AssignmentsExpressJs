module.exports = (req, res, next) => {
  const clientApiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_KEY;

  if (!clientApiKey || clientApiKey !== validApiKey) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Unauthorized: Invalid or missing API key'
      }
    });
  }

  next();
};