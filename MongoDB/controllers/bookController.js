import * as Book from '../models/book.js';

export async function getAllBooks(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { data, total } = await Book.findAll({ page, limit });
    res.json({ total, page, limit, data });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err: err.message });
  }
}

export async function getBookById(req, res) {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
}

export async function createBook(req, res) {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateBook(req, res) {
  const book = await Book.update(req.params.id, req.body);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
}

export async function deleteBook(req, res) {
  const book = await Book.destroy(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ message: 'Book deleted successfully' });
}