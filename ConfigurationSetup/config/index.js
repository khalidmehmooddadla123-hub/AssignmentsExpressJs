const dotenv = require("dotenv");
dotenv.config();

const requiredVars = ["PORT", "NODE_ENV", "JWT_SECRET", "API_KEY", "ALLOWED_ORIGIN"];
const missingVars = requiredVars.filter(
  (key) => !process.env[key] || process.env[key].trim() === ""
);

if (missingVars.length > 0) {
  console.error("  Missing required environment variables:");
  missingVars.forEach((key) => console.error(` - ${key}`));
  console.error("Please add them in your .env file. App cannot start.");
  process.exit(1);
}

const config = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  apiKey: process.env.API_KEY,
  allowedOrigin: process.env.ALLOWED_ORIGIN,
};

module.exports = config;