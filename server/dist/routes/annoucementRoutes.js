"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const announcementsController_1 = require("../controllers/announcementsController");
exports.router = express_1.default.Router();
exports.router.route("/getAnnouncement").get(userController_1.protect, announcementsController_1.getAnnouncements);
exports.router
    .route("/getAnnouncement/:AnnouncementId")
    .get(userController_1.protect, announcementsController_1.getAnnouncementById);
exports.router.route("/createAnnouncement").post(userController_1.protect, announcementsController_1.createAnnouncement);
exports.router
    .route("/updateAnnouncement/:AnnouncementId")
    .put(userController_1.protect, announcementsController_1.updateAnnouncementById);
exports.router
    .route("/deleteAnnouncement/:AnnouncementId")
    .delete(userController_1.protect, announcementsController_1.deleteAnnouncementById);
