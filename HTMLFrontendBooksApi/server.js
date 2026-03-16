const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

//Constant Data
let books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', year: 2018, genre: 'Self-help', pages: 320 },
  { id: 2, title: 'The Alchemist', author: 'Paulo Coelho', year: 1988, genre: 'Fiction', pages: 208 },
  { id: 3, title: 'Clean Code', author: 'Robert C. Martin', year: 2008, genre: 'Programming', pages: 464 }
];
let nextId = 4;

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// GET all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// POST create a new book
app.post('/api/books', (req, res) => {
  const { title, author, year, genre, pages } = req.body;

  // Basic validation
  if (!title || !author || !year || !genre || !pages) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newBook = {
    id: nextId++,
    title: String(title).trim(),
    author: String(author).trim(),
    year: Number(year),
    genre: String(genre).trim(),
    pages: Number(pages)
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// DELETE a book by id
app.delete('/api/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const initialLength = books.length;
  books = books.filter(book => book.id !== id);

  if (books.length === initialLength) {
    return res.status(404).json({ error: 'Book not found.' });
  }

  res.json({ message: 'Book deleted successfully.' });
});


// Server-side rendered books page
app.get('/books', (req, res) => {
  res.render('books', { books });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});