const config = require("../config");

function apiKeyAuth(req, res, next) {
  const incomingKey = req.header("x-api-key");

  if (!incomingKey) {
    return res.status(401).json({ message: "API key is required" });
  }

  if (incomingKey !== config.apiKey) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  next();
}

module.exports = apiKeyAuth;