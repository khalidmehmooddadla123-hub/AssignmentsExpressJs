import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true },
  year: { type: Number },
  genre: { type: String, enum: ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Tech'] },
  pages: { type: Number }
}, { timestamps: true });

const BookModel = mongoose.model('Book', bookSchema);

export const findAll = async ({ page = 1, limit = 10 } = {}) => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    BookModel.find().skip(skip).limit(limit),
    BookModel.countDocuments()
  ]);
  return { total, page, limit, data };
};

export const findById = async (id) => BookModel.findById(id);

export const create = async (data) => BookModel.create(data);

export const update = async (id, data) =>
  BookModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });

export const destroy = async (id) => BookModel.findByIdAndDelete(id);

export default BookModel;