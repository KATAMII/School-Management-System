import express from 'express';
import { createAssignment,getAssignments,getAssignmentsCount } from '../controllers/assignments.controllers.js';

const router = express.Router();

router.post('/create', createAssignment);
router.get('/assignments', getAssignments);
router.get('/count', getAssignmentsCount);

export default router;
