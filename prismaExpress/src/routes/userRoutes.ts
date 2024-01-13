import express from 'express';
import UserController from '../controllers/userController';
import { requiresAuthentication } from '../app/auth';

const router = express.Router();
const userController = new UserController();

router.get('/users', requiresAuthentication, userController.getAllUsers);
router.get('/user/:id', requiresAuthentication, userController.getUserById);
router.post('/create-user', requiresAuthentication, userController.createUser);
router.put('/update-user/:id', requiresAuthentication, userController.updateUser);
router.delete('/delete-user/:id', requiresAuthentication, userController.deleteUser);

export default router;
