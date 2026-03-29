import express from 'express';
import { createStudent, getStudents, getStudent } from '../controllers/studentController.js';

const router = express.Router();

router.post('/', createStudent);
router.get('/', getStudents);
router.get('/:id', getStudent);

export default router;