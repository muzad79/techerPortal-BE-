import express from 'express';
import { validateRegistration, validate } from '../middlewares/validationMiddleware.mjs';
import * as teacherController from '../controllers/teacherController.mjs';

const router = express.Router();

router.get('/get_students', teacherController.getStudents);
router.get('/get_student/:id',teacherController.getStudent)
router.post('/add_student', teacherController.addStudent);
router.post('/edit_student/:id',teacherController.editStudent);
router.delete('/delete_student/:id',teacherController.deleteStudent)

export default router;
