import { Router } from "express";
import { createTeacher, loginTeacher, getTeachers, getTeachersCount, getAllStudents, getStudentsByTeacher, submitGrade, getGradesByStudent} from "../controllers/teachers.controller.js";
import { validateInformation } from "../middlewares/teachers.middleware.js";
import { authenticateToken } from "../middlewares/auth.middleware.js"; 

const router = Router();

router.post("/register", validateInformation, createTeacher);
router.post("/login", loginTeacher);
router.get('/teachers', getTeachers);
router.get('/count', getTeachersCount);
router.get('/students', authenticateToken, (req, res, next) => {
    console.log('Authenticated request for students:', req.user);
    next();
  }, getStudentsByTeacher);
  router.post('/grades', authenticateToken, (req, res, next) => {
    console.log('Authenticated request for submitting grade:', req.user);
    next();
  }, submitGrade);
router.get('/grades/:studentId', authenticateToken, getGradesByStudent);
export default router;
