import express from 'express';
import { createAnnouncements,getAnnouncements } from '../controllers/announcements.controllers.js';

const router = express.Router();

router.post('/create', createAnnouncements);
router.get('/announcements', getAnnouncements);

export default router;
