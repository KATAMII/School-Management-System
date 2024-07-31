import { Router } from "express";
import {
  createStudent,
  loginStudent,
  getStudents,
  getStudentsCount,
  getStudentDetails,
  deletestudent,
} from "../controllers/students.controllers.js";
import { validateInformation } from "../middlewares/users.middleware.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validateInformation, createStudent);

router.post("/login", loginStudent);
router.get("/students", getStudents);
router.get("/count", getStudentsCount);
router.get("/details", authenticateToken, getStudentDetails);
router.delete("/delete/:id", deletestudent);
export default router;
