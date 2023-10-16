import { Router } from "express";
const router = Router();
import greetingsController from "../controllers/greetingsController.js";
import userController from "../controllers/userController.js";

//-------------------------------------------------------------
router.get("/api/hello", greetingsController.hello);
router.get("/api/bye", greetingsController.bye);

//-------------------------------------------------------------
router.get("/api/users", userController.getUsers);

export default router;