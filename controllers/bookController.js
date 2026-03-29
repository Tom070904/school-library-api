import Book from '../models/Book.js';

export const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBooks = async (req, res) => {
  const books = await Book.find().populate('authors'); // shows author names
  res.json(books);
};

export const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id)
    .populate('authors')
    .populate('borrowedBy')
    .populate('issuedBy');

  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

export const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

export const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ message: 'Book deleted successfully' });
};