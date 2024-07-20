import { Router } from "express";
import { createTeacher,loginTeacher,getTeachers,getTeachersCount } from "../controllers/teachers.controller.js";
import { validateInformation } from "../middlewares/teachers.middleware.js";

const router = Router();

router.post("/register", validateInformation, createTeacher);

router.post("/login", loginTeacher);
router.get('/teachers', getTeachers);
router.get('/count', getTeachersCount);
export default router;