require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

const Book = require('./models/Book');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://example.com', // strict CORS!
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(mongoSanitize());
app.use(hpp());

// Rate limiters
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many attempts, please try again later.'
});
app.use(generalLimiter);

// ROUTES
app.get('/api/books', async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
});

app.post('/api/books', authLimiter, async (req, res) => {
  const { title, author, published } = req.body;
  if (!title || !author || !published) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const book = await Book.create({ title, author, published });
    res.status(201).json(book);
  } catch (e) {
    res.status(400).json({ error: "Invalid input" });
  }
});

app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Not found" });
    res.json(book);
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    const result = await Book.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) return res.sendStatus(404);
    res.sendStatus(204);
  } catch {
    res.sendStatus(404);
  }
});

module.exports = app;