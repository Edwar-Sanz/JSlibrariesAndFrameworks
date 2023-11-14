import express from 'express';
import PostController from '../controllers/postController';

const router = express.Router();
const postController = new PostController();

router.post('/posts', postController.createPost);


export default router;
