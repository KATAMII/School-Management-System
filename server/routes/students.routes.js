import { Router } from "express";
import { createStudent,loginStudent,getStudents ,getStudentsCount} from "../controllers/students.controllers.js";
import { validateInformation } from "../middlewares/users.middleware.js";

const router = Router();

router.post("/register", validateInformation, createStudent);

router.post("/login", loginStudent);
router.get('/students', getStudents);
router.get('/count', getStudentsCount);
export default router;