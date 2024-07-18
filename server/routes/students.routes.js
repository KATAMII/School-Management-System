import { Router } from "express";
import { createStudent,loginStudent } from "../controllers/students.controllers.js";
import { validateInformation } from "../middlewares/users.middleware.js";

const router = Router();

router.post("/register", validateInformation, createStudent);

router.post("/login", loginStudent);
export default router;