import express from "express";
import {
  createAnnouncements,
  getAnnouncements,
  deleteAnnouncement,
  updateAnnouncement,
} from "../controllers/announcements.controllers.js";

const router = express.Router();

router.post("/create", createAnnouncements);
router.get("/announcements", getAnnouncements);
router.delete("/delete/:id", deleteAnnouncement);
router.put("/update", updateAnnouncement);

export default router;
