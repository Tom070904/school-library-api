import express from 'express';
import { createAuthor, getAuthors, getAuthor, updateAuthor, deleteAuthor } from '../controllers/authorController.js';

const router = express.Router();

router.post('/', createAuthor);           // POST /api/authors
router.get('/', getAuthors);              // GET  /api/authors
router.get('/:id', getAuthor);            // GET  /api/authors/:id
router.put('/:id', updateAuthor);         // PUT  /api/authors/:id
router.delete('/:id', deleteAuthor);      // DELETE /api/authors/:id

export default router;