const booksBody = document.getElementById('booksBody');
const bookForm = document.getElementById('bookForm');

// Load books on page load
document.addEventListener('DOMContentLoaded', fetchBooks);

// GET /api/books
async function fetchBooks() {
  try {
    const res = await fetch('/api/books');
    const books = await res.json();

    booksBody.innerHTML = '';

    books.forEach(book => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td>${book.genre}</td>
        <td>${book.pages}</td>
        <td>
          <button class="delete-btn" onclick="deleteBook(${book.id})">Delete</button>
        </td>
      `;
      booksBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

// POST /api/books
bookForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newBook = {
    title: document.getElementById('title').value.trim(),
    author: document.getElementById('author').value.trim(),
    year: Number(document.getElementById('year').value),
    genre: document.getElementById('genre').value.trim(),
    pages: Number(document.getElementById('pages').value)
  };

  try {
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook)
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || 'Failed to add book');
      return;
    }

    bookForm.reset();
    fetchBooks(); 
  } catch (error) {
    console.error('Error adding book:', error);
  }
});

// DELETE /api/books/:id
async function deleteBook(id) {
  try {
    const res = await fetch(`/api/books/${id}`, { method: 'DELETE' });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || 'Failed to delete book');
      return;
    }

    fetchBooks(); 
  } catch (error) {
    console.error('Error deleting book:', error);
  }
}