import * as Book from '../models/book.js';

export const getAllBooks = async (req, res) => {
  const { page, limit } = req.query;
  const result = await Book.findAll({ page, limit });
  res.json(result);
};

export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Not found' });
  res.json(book);
};

export const createBook = async (req, res) => {
  if (!req.body.title || !req.body.author) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

export const updateBook = async (req, res) => {
  const book = await Book.update(req.params.id, req.body);
  if (!book) return res.status(404).json({ message: 'Not found' });
  res.json(book);
};

export const deleteBook = async (req, res) => {
  const book = await Book.destroy(req.params.id);
  if (!book) return res.status(404).json({ message: 'Not found' });
  res.status(204).send();
};