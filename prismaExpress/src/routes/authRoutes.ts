import express from 'express';
import AuthController from '../controllers/authController';

const router = express.Router();
const authController = new AuthController();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

export default router;
