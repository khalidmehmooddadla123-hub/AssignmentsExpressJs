// const express = require("express");
// const { body, validationResult } = require("express-validator");

// const app = express();
// app.use(express.json());

// /* -----------------------------
//    Async Handler Utility
// ----------------------------- */
// const asyncHandler = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };

// /* -----------------------------
//    In-Memory Books Data
// ----------------------------- */
// let books = [
//   {
//     id: 1,
//     title: "Node.js Basics",
//     author: "John Doe",
//     year: 2020,
//     genre: "Programming",
//     pages: 250
//   },
//   {
//     id: 2,
//     title: "Express Guide",
//     author: "Jane Smith",
//     year: 2019,
//     genre: "Programming",
//     pages: 300
//   },
//   {
//     id: 3,
//     title: "JavaScript Mastery",
//     author: "John Doe",
//     year: 2021,
//     genre: "Technology",
//     pages: 350
//   },
//   {
//     id: 4,
//     title: "Learning Python",
//     author: "Mark Taylor",
//     year: 2018,
//     genre: "Programming",
//     pages: 400
//   },
//   {
//     id: 5,
//     title: "Data Structures Explained",
//     author: "Sarah Wilson",
//     year: 2022,
//     genre: "Computer Science",
//     pages: 320
//   },
//   {
//     id: 6,
//     title: "Modern Web Development",
//     author: "David Brown",
//     year: 2021,
//     genre: "Technology",
//     pages: 280
//   },
//   {
//     id: 7,
//     title: "React for Beginners",
//     author: "Emily Davis",
//     year: 2020,
//     genre: "Programming",
//     pages: 310
//   },
//   {
//     id: 8,
//     title: "MongoDB Complete Guide",
//     author: "Michael Johnson",
//     year: 2019,
//     genre: "Database",
//     pages: 270
//   },
//   {
//     id: 9,
//     title: "Clean Code Principles",
//     author: "Robert Martin",
//     year: 2008,
//     genre: "Software Engineering",
//     pages: 464
//   },
//   {
//     id: 10,
//     title: "Algorithms Unlocked",
//     author: "Thomas Cormen",
//     year: 2013,
//     genre: "Computer Science",
//     pages: 240
//   }
// ];

// /* -----------------------------
//    Validation Rules
// ----------------------------- */
// const validateBook = [
//   body("title").notEmpty().withMessage("Title is required"),
//   body("author").notEmpty().withMessage("Author is required"),
//   body("year").isInt().withMessage("Year must be an integer"),
//   body("genre").notEmpty().withMessage("Genre is required"),
//   body("pages").isInt({ min: 1 }).withMessage("Pages must be positive")
// ];

// /* -----------------------------
//    Root Route
// ----------------------------- */
// app.get("/", (req, res) => {
//   res.json({ message: "Books REST API running successfully" });
// });

// /* ===================================================
//    1️⃣ GET /api/books  (Filtering + Sorting + Pagination)
// =================================================== */
// app.get(
//   "/api/books",
//   asyncHandler(async (req, res) => {
//     let result = [...books];

//     const { author, genre, year, sort, page = 1, limit = 5 } = req.query;

//     // Filtering
//     if (author) {
//       result = result.filter((b) =>
//         b.author.toLowerCase().includes(author.toLowerCase())
//       );
//     }

//     if (genre) {
//       result = result.filter((b) =>
//         b.genre.toLowerCase().includes(genre.toLowerCase())
//       );
//     }

//     if (year) {
//       result = result.filter((b) => b.year === parseInt(year));
//     }

//     // Sorting
//     if (sort === "year") {
//       result.sort((a, b) => a.year - b.year);
//     }

//     if (sort === "title") {
//       result.sort((a, b) => a.title.localeCompare(b.title));
//     }

//     // Pagination
//     const total = result.length;
//     const pageNum = parseInt(page);
//     const limitNum = parseInt(limit);

//     const skip = (pageNum - 1) * limitNum;
//     const paginated = result.slice(skip, skip + limitNum);

//     const totalPages = Math.ceil(total / limitNum);

//     res.json({
//       total,
//       page: pageNum,
//       totalPages,
//       data: paginated
//     });
//   })
// );

// /* ======================================
//    2️⃣ GET /api/books/:id
// ====================================== */
// app.get(
//   "/api/books/:id",
//   asyncHandler(async (req, res) => {
//     const book = books.find((b) => b.id === parseInt(req.params.id));

//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     res.json(book);
//   })
// );

// /* ======================================
//    3️⃣ POST /api/books
// ====================================== */
// app.post(
//   "/api/books",
//   validateBook,
//   asyncHandler(async (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { title, author, year, genre, pages } = req.body;

//     const newBook = {
//       id: books.length + 1,
//       title,
//       author,
//       year,
//       genre,
//       pages
//     };

//     books.push(newBook);

//     res.status(201).json(newBook);
//   })
// );

// /* ======================================
//    4️⃣ PUT /api/books/:id
// ====================================== */
// app.put(
//   "/api/books/:id",
//   validateBook,
//   asyncHandler(async (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const index = books.findIndex(
//       (b) => b.id === parseInt(req.params.id)
//     );

//     if (index === -1) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     const { title, author, year, genre, pages } = req.body;

//     books[index] = {
//       id: books[index].id,
//       title,
//       author,
//       year,
//       genre,
//       pages
//     };

//     res.json(books[index]);
//   })
// );

// /* ======================================
//    5️⃣ PATCH /api/books/:id
// ====================================== */
// app.patch(
//   "/api/books/:id",
//   asyncHandler(async (req, res) => {
//     const book = books.find((b) => b.id === parseInt(req.params.id));

//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     Object.assign(book, req.body);

//     res.json(book);
//   })
// );

// /* ======================================
//    6️⃣ DELETE /api/books/:id
// ====================================== */
// app.delete(
//   "/api/books/:id",
//   asyncHandler(async (req, res) => {
//     const index = books.findIndex(
//       (b) => b.id === parseInt(req.params.id)
//     );

//     if (index === -1) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     const deleted = books.splice(index, 1);

//     res.json({
//       message: "Book deleted successfully",
//       book: deleted[0]
//     });
//   })
// );

// /* -----------------------------
//    Global Error Handler
// ----------------------------- */
// app.use((err, req, res, next) => {
//   console.error(err);

//   res.status(500).json({
//     message: "Server Error",
//     error: err.message
//   });
// });

// /* -----------------------------
//    Server Start
// ----------------------------- */
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });


const express = require("express");

const booksRoutes = require("./routes/books");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

/* Root Route */
app.get("/", (req, res) => {
  res.json({ message: "Books REST API running successfully" });
});

/* Books Routes */
app.use("/api/books", booksRoutes);

/* Global Error Handler */
app.use(errorHandler);

/* Server Start */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});