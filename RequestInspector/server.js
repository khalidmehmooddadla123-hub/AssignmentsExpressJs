const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the Request Inspector!");
});

// Get request details

app.get("/inspect", (req, res) => {
  const requestInfo = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    query: req.query,
    timestamp: new Date().toISOString(),
  };
  res.json(requestInfo);
});

//Post request to echo back the JSON body
app.post("/echo", (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "No JSON body provided" });
  }
  res.json(req.body);
});

// Get user details by ID with error handling
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  if (isNaN(userId)) {
    return res.status(400).json({ error: "User ID must be a number" });
  }
  if (userId > 100) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`,
  });
});

// Get Redirect example

app.get("/redirect-me", (req, res) => {
  res.redirect(301, "/inspect");
});

// Get download sample file
app.get("/download-sample", (req, res) => {
  const filePath = path.join(__dirname, "sample.txt");
  res.download(filePath);
});
app.listen(port, () => {
  console.log(
    `Request Inspector server is running at http://localhost:${port}`,
  );
});
