import 'dotenv/config';
import connectDB from './config/database.js';
import BookModel from './models/book.js';

const books = [
  { title: 'Node.js Guide', author: 'Vincent', year: 2024, genre: 'Tech', pages: 250 },
  { title: 'Learning MongoDB', author: 'Alice Smith', year: 2023, genre: 'Tech', pages: 300 },
  { title: 'The Science of Fiction', author: 'John Doe', year: 2019, genre: 'Fiction', pages: 400 },
  { title: 'Understanding Non-Fiction', author: 'Mary Johnson', year: 2020, genre: 'Non-Fiction', pages: 320 },
  { title: 'Exploring Sci-Fi Worlds', author: 'David Lee', year: 2021, genre: 'Sci-Fi', pages: 280 }
];

const seedBooks = async () => {
  try {
    await connectDB();
    await BookModel.deleteMany();
    await BookModel.insertMany(books);
    console.log(`✅ ${books.length} books added!`);
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding books:', err);
    process.exit(1);
  }
};

seedBooks();