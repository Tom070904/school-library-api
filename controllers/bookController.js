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
  const book = await Book.findOne({ isbn : req.params.isbn })
    .populate('authors')
    .populate('borrowedBy')
    .populate('issuedBy');

  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

export const updateBook = async (req, res) => {
  const book = await Book.findOneAndUpdate({ isbn: req.params.isbn }, req.body, { new: true });
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

export const deleteBook = async (req, res) => {
  const book = await Book.findOneAndDelete({ isbn: req.params.isbn });
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ message: 'Book deleted successfully' });
};

// ==================== BORROW & RETURN LOGIC ====================

export const borrowBook = async (req, res) => {
  try {
    const { studentId, attendantId, returnDate } = req.body;
    const book = await Book.findOne({ isbn: req.params.isbn });

    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Rule: Book must be "IN"
    if (book.status === 'OUT') {
      return res.status(400).json({ message: 'Book is already borrowed' });
    }

    // Update the book
    book.status = 'OUT';
    book.borrowedBy = studentId;
    book.issuedBy = attendantId;
    book.returnDate = returnDate;

    await book.save();

    // Return the updated book with full details
    const updatedBook = await Book.findOne({ isbn: book.isbn })
      .populate('authors')
      .populate('borrowedBy')
      .populate('issuedBy');

    res.json({ message: 'Book borrowed successfully', book: updatedBook });
  } catch (error) {
    res.status(400).json({ message: 'Error borrowing book', error: error.message });
  }
};

export const returnBook = async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn });

    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Rule: Book must be "OUT"
    if (book.status === 'IN') {
      return res.status(400).json({ message: 'Book is already returned' });
    }

    // Clear everything
    book.status = 'IN';
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;

    await book.save();

    const updatedBook = await Book.findOne({ isbn: book.isbn })
      .populate('authors')
      .populate('borrowedBy')
      .populate('issuedBy');

    res.json({ message: 'Book returned successfully', book: updatedBook });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
