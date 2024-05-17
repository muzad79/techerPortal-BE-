import express from 'express';
import { validateRegistration, validate } from '../middlewares/validationMiddleware.mjs';
import * as authController from '../controllers/authController.mjs';

const router = express.Router();

router.post('/register',  authController.register);
router.post('/login', authController.newLogin);

export default router;
