import express from 'express';
import { createAssignment,getAssignments,getAssignmentsCount ,deleteAssignment,updateAssignment} from '../controllers/assignments.controllers.js';

const router = express.Router();

router.post('/create', createAssignment);
router.get('/assignments', getAssignments);
router.get('/count', getAssignmentsCount);
router.delete('/delete/:id', deleteAssignment);
router.put('/update', updateAssignment);

export default router;
