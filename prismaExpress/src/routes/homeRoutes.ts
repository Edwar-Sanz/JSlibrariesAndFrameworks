import express from 'express';
import HomeController from '../controllers/homeController';


const router = express.Router();
const homeController = new HomeController();

router.get('/', homeController.getDoc);

export default router;
