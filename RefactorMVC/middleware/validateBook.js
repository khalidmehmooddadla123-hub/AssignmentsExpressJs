const { body } = require("express-validator");
const { handleValidation } = require("../controllers/bookController");

const validateBook = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required"),

  body("year")
    .isInt({ min: 1 })
    .withMessage("Year must be a valid positive integer"),

  body("genre")
    .trim()
    .notEmpty()
    .withMessage("Genre is required"),

  body("pages")
    .isInt({ min: 1 })
    .withMessage("Pages must be a valid positive integer"),

  handleValidation,
];

module.exports = validateBook;