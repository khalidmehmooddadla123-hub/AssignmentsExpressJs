const { validationResult } = require("express-validator");
const bookModel = require("../models/book");

// validation result handler (import in middleware/routes)
function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
}

function getAll(req, res, next) {
  try {
    const books = bookModel.findAll();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
}

function getOne(req, res, next) {
  try {
    const id = Number(req.params.id);
    const book = bookModel.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
}

function create(req, res, next) {
  try {
    const created = bookModel.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    const updated = bookModel.update(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    const deleted = bookModel.destroy(id);

    if (!deleted) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  handleValidation,
  getAll,
  getOne,
  create,
  update,
  remove,
};