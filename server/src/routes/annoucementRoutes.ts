import express from "express";
import { protect } from "../controllers/userController";

import {
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncementById,
  deleteAnnouncementById,
} from "../controllers/announcementsController";
export const router = express.Router();

router.route("/getAnnouncement").get(protect, getAnnouncements);
router
  .route("/getAnnouncement/:AnnouncementId")
  .get(protect, getAnnouncementById);
router.route("/createAnnouncement").post(protect, createAnnouncement);
router
  .route("/updateAnnouncement/:AnnouncementId")
  .put(protect, updateAnnouncementById);
router
  .route("/deleteAnnouncement/:AnnouncementId")
  .delete(protect, deleteAnnouncementById);
