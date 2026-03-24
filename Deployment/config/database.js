import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.DB_URL) throw new Error('DB_URL missing');

    await mongoose.connect(process.env.DB_URL);
    console.log('✅ DB connected');
  } catch (err) {
    console.error('❌ DB failed:', err.message);
    process.exit(1);
  }
};

export default connectDB;