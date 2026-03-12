require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json()); 

app.use("/api/products", require("./routes/products"));

app.get("/", (req, res) => {
  res.send("Welcome to Products API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});