
const express = require("express");

const booksRoutes = require("./routes/books");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

/* Root Route */
app.get("/", (req, res) => {
  res.json({ message: "Books REST API running successfully" });
});

/* Books Routes */
app.use("/api/books", booksRoutes);

/* Global Error Handler */
app.use(errorHandler);

/* Server Start */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});