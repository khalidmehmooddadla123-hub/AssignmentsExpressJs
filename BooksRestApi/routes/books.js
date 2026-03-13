const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const books = require("../data/books");
const asyncHandler = require("../middleware/asyncHandler");

/* Validation Rules */
const validateBook = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("year").isInt().withMessage("Year must be an integer"),
  body("genre").notEmpty().withMessage("Genre is required"),
  body("pages").isInt({ min: 1 }).withMessage("Pages must be positive")
];


/* GET /api/books */
router.get("/", asyncHandler(async (req, res) => {

  let result = [...books];

  const { author, genre, year, sort, page = 1, limit = 5 } = req.query;

  if (author) {
    result = result.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (genre) {
    result = result.filter((b) =>
      b.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  if (year) {
    result = result.filter((b) => b.year === parseInt(year));
  }

  if (sort === "year") {
    result.sort((a, b) => a.year - b.year);
  }

  if (sort === "title") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  }

  const total = result.length;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  const skip = (pageNum - 1) * limitNum;
  const paginated = result.slice(skip, skip + limitNum);

  const totalPages = Math.ceil(total / limitNum);

  res.json({
    total,
    page: pageNum,
    totalPages,
    data: paginated
  });

}));


/* GET BY ID */
router.get("/:id", asyncHandler(async (req, res) => {

  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);

}));


/* POST */
router.post("/", validateBook, asyncHandler(async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, author, year, genre, pages } = req.body;

  const newBook = {
    id: books.length + 1,
    title,
    author,
    year,
    genre,
    pages
  };

  books.push(newBook);

  res.status(201).json(newBook);

}));


/* PUT */
router.put("/:id", validateBook, asyncHandler(async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const index = books.findIndex(
    (b) => b.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const { title, author, year, genre, pages } = req.body;

  books[index] = {
    id: books[index].id,
    title,
    author,
    year,
    genre,
    pages
  };

  res.json(books[index]);

}));


/* PATCH */
router.patch("/:id", asyncHandler(async (req, res) => {

  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  Object.assign(book, req.body);

  res.json(book);

}));


/* DELETE */
router.delete("/:id", asyncHandler(async (req, res) => {

  const index = books.findIndex(
    (b) => b.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deleted = books.splice(index, 1);

  res.json({
    message: "Book deleted successfully",
    book: deleted[0]
  });

}));


module.exports = router;