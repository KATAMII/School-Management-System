import { Router } from "express";
import { createTeacher,loginTeacher,getTeachers } from "../controllers/teachers.controller.js";
import { validateInformation } from "../middlewares/teachers.middleware.js";

const router = Router();

router.post("/register", validateInformation, createTeacher);

router.post("/login", loginTeacher);
router.get('/teachers', getTeachers);
export default router;