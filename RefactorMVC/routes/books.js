const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");
const validateBook = require("../middleware/validateBook");

// GET all books
router.get("/", bookController.getAll);

// GET one book
router.get("/:id", bookController.getOne);

// POST create book
router.post("/", validateBook, bookController.create);

// PUT update book
router.put("/:id", validateBook, bookController.update);

// DELETE remove book
router.delete("/:id", bookController.remove);

module.exports = router;