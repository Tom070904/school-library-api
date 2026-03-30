import express from 'express';
import {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook
} from '../controllers/bookController.js';

const router = express.Router();

router.post('/', createBook);
router.get('/', getBooks);
router.get('/:isbn', getBook);
router.put('/:isbn', updateBook);
router.delete('/:isbn', deleteBook);

router.post('/:isbn/borrow', borrowBook); 
router.post('/:isbn/return', returnBook); 

export default router;