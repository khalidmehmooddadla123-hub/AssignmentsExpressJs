let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear", year: 2018, genre: "Self-help", pages: 320 },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho", year: 1988, genre: "Fiction", pages: 208 }
];

let nextId = 3;

function findAll() {
  return books;
}

function findById(id) {
  return books.find((b) => b.id === id) || null;
}

function create(data) {
  const newBook = {
    id: nextId++,
    title: data.title,
    author: data.author,
    year: Number(data.year),
    genre: data.genre,
    pages: Number(data.pages),
  };
  books.push(newBook);
  return newBook;
}

function update(id, data) {
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return null;

  books[index] = {
    ...books[index],
    title: data.title,
    author: data.author,
    year: Number(data.year),
    genre: data.genre,
    pages: Number(data.pages),
  };

  return books[index];
}

function destroy(id) {
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return false;

  books.splice(index, 1);
  return true;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  destroy,
};