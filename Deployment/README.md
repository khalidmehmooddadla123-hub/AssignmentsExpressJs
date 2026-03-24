# Books API

A secure Express.js API for managing books.

## Security Features

- **Helmet:** Sets HTTP headers
- **Strict CORS:** Only trusted origins allowed
- **Rate Limiting:** General and strict limits
- **MongoDB Sanitize & HPP:** Prevent NoSQL injection & HTTP param pollution

## Endpoints

### Get All Books

- **URL:** `/api/books`
- **Method:** GET
- **Headers:** None required
- **Response Example:**
```json
[
  { "_id": "123", "title": "Book", "author": "Author", "published": "2023-01-01T00:00:00.000Z" }
]
```

---

### Create a Book

- **URL:** `/api/books`
- **Method:** POST
- **Headers:** `Content-Type: application/json`
- **Request Example:**
```json
{ "title": "Test", "author": "Someone", "published": "2022-01-01" }
```
- **Success Response:** `201`
```json
{ "_id": "456", "title": "Test", "author": "Someone", "published": "2022-01-01T00:00:00.000Z" }
```
- **Error Response:** `400`
```json
{ "error": "Missing required fields" }
```

---

### Get Book by ID

- **URL:** `/api/books/:id`
- **Method:** GET
- **Response:** `200` book object or `404` if not found

---

### Delete a Book

- **URL:** `/api/books/:id`
- **Method:** DELETE
- **Response:** `204` on success, `404` if not found

---

## Running Tests

```bash
npm test
```

---

## Deploying with PM2

```bash
pm2 start ecosystem.config.js
```

## Nginx Proxy

See the included `nginx.conf` for how to proxy traffic.

## Security Audit

```bash
npm audit && npm audit fix
# Should report 0 high vulnerabilities
```
