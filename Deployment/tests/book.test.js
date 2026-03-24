const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Book = require('../models/Book');

// Connect to test database before tests
beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/test_booksdb');
});

// Seed and clean up
beforeEach(async () => { await Book.deleteMany(); });
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Books API', () => {
  it('GET /api/books returns 200 with an array', async () => {
    await Book.create({ title: "T1", author: "A1", published: new Date() });
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/books with valid body returns 201', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({ title: "T2", author: "A2", published: new Date() });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });

  it('POST /api/books missing fields returns 400', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({ title: "T3" });
    expect(res.statusCode).toBe(400);
  });

  it('GET /api/books/:id with non-existent ID returns 404', async () => {
    const badId = '615f1b5fcf1b1464a1f3f123';
    const res = await request(app).get(`/api/books/${badId}`);
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /api/books/:id returns 204', async () => {
    const book = await Book.create({ title: "T4", author: "A4", published: new Date() });
    const res = await request(app).delete(`/api/books/${book._id}`);
    expect(res.statusCode).toBe(204);
  });
});