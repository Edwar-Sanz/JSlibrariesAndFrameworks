import { Router } from "express";
const router = Router();
import greetingsController from "../controllers/greetingsController.js";
import userController from "../controllers/userController.js";

//-------------------------------------------------------------
router.get("/api/hello", greetingsController.hello);
router.get("/api/bye", greetingsController.bye);

//--------------------user-------------------------------------
router.get("/api/user/users", userController.getUsers);
router.post("/api/user/add", userController.addUser);

export default router;