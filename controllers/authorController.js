import Author from '../models/Author.js';

export const createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAuthors = async (req, res) => {
  const authors = await Author.find().sort({ createdAt: -1 });
  res.json(authors);
};

export const getAuthor = async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (!author) return res.status(404).json({ message: 'Author not found' });
  res.json(author);
};

export const updateAuthor = async (req, res) => {
  const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!author) return res.status(404).json({ message: 'Author not found' });
  res.json(author);
};

export const deleteAuthor = async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);
  if (!author) return res.status(404).json({ message: 'Author not found' });
  res.json({ message: 'Author deleted successfully' });
};