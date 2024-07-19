import express from 'express';
import { createAssignment,getAssignments } from '../controllers/assignments.controllers.js';

const router = express.Router();

router.post('/create', createAssignment);
router.get('/assignments', getAssignments);

export default router;
