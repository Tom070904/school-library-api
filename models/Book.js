import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  authors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'        // links to the Author model we just created
  }],
  status: {
    type: String,
    enum: ['IN', 'OUT'],
    default: 'IN'
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    default: null
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attendant',
    default: null
  },
  returnDate: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;