const express = require("express");
const config = require("./config");
const booksRouter = require("./routes/books");
const apiKeyAuth = require("./middleware/apiKeyAuth");

const app = express();

app.use(express.json());

// Health route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully",
    env: config.nodeEnv
  });
});

// Protected books routes
app.use("/api/books", apiKeyAuth, booksRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(config.port, () => {
  console.log(`✅ Server running on http://localhost:${config.port}`);
});