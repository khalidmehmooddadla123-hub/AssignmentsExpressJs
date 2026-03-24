import 'dotenv/config';
import express from 'express';
import connectDB from './config/database.js';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
app.use(express.json());

// Mount routes at /api/books
app.use('/api/books', bookRoutes);

// Health check
app.get('/', (req, res) => res.send('Books API running'));

const PORT = process.env.PORT || 5000;

// Connect DB first, then start server
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});