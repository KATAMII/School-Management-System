import express from 'express';
import {  createClass,getClasses,deleteClass,getClassesCount } from "../controllers/classes.controllers.js";

const router = express.Router();

router.get('/classes', getClasses);
router.post('/create', createClass);
router.delete('/delete/:id', deleteClass);
router.get('/count', getClassesCount);

export default router;
