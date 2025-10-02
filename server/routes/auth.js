import express from 'express';
import { login } from '../controllers/authController.js';
import e from 'express';

const router = express.Router();

router.post('/login', login);

export default router;