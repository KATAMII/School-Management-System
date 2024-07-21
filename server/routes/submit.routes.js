import { Router } from "express";
import multer from 'multer';
import { submitAssignment } from "../controllers/submit.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/submit', upload.single('file'), submitAssignment);
// router.get('/details', authenticateToken, getStudentDetails);
export default router;
