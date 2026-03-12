require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

 
app.get('/', (req, res) => {
  res.send('Welcome HomePage!');
});

app.get('/about', (req, res) => {
  res.send('About Us');
});

app.get('/contact', (req, res) => {
  res.send('Contact Us');
});

app.get('/help', (req, res) => {
  res.send('Help Information');
});
app.listen(PORT, () => {
  const time = new Date().toLocaleTimeString();
  console.log(`Server is running on http://localhost:${PORT} at ${time}`);
});